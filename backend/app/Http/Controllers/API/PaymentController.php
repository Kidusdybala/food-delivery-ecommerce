<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PaymentController extends Controller
{
    public function initializePayment(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'email' => 'required|email',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'items' => 'required|array',
        ]);

        // Chapa test credentials
        $chapaSecretKey = env('CHAPA_SECRET_KEY', 'CHASECK_TEST-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        $chapaPublicKey = env('CHAPA_PUBLIC_KEY', 'CHAPUBK_TEST-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

        $tx_ref = 'txn_' . time() . '_' . rand(1000, 9999);

        $data = [
            'amount' => $request->amount,
            'currency' => 'ETB',
            'email' => $request->email,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'tx_ref' => $tx_ref,
            'callback_url' => env('APP_URL') . '/api/payment/callback',
            'return_url' => env('FRONTEND_URL', 'http://localhost:8080') . '/payment/success?tx_ref=' . $tx_ref,
            'customization' => [
                'title' => 'FoodOrder', // Shortened to be under 16 characters
                'description' => 'Payment for food order',
            ],
        ];

        try {
            \Log::info('Creating payment and order with tx_ref: ' . $tx_ref);
            
            // Check if we should use mock payment
            $useMockPayment = env('USE_MOCK_PAYMENT', false);

            if ($useMockPayment === 'true') {
                // Create payment record with mock data
                $payment = \App\Models\Payment::create([
                    'tx_ref' => $tx_ref,
                    'amount' => $request->amount,
                    'currency' => 'ETB',
                    'status' => 'paid', // Mark as paid immediately for testing
                    'user_email' => $request->email,
                    'payment_url' => env('FRONTEND_URL', 'http://localhost:8080') . '/payment/success?tx_ref=' . $tx_ref,
                ]);

                // Simulate successful payment for testing
                $order = \App\Models\Order::create([
                    'order_number' => 'ORD_' . time() . '_' . rand(1000, 9999),
                    'user_email' => $request->email,
                    'total' => $request->amount,
                    'status' => 'paid', // Mark as paid immediately for testing
                    'tx_ref' => $tx_ref,
                    'items' => json_encode($request->items),
                    'payment_url' => env('FRONTEND_URL', 'http://localhost:8080') . '/payment/success?tx_ref=' . $tx_ref,
                ]);

                \Log::info('Mock payment created with id: ' . $payment->id . ', tx_ref: ' . ($payment->tx_ref ?? 'null'));
                \Log::info('Mock order created with id: ' . $order->id . ', tx_ref: ' . ($order->tx_ref ?? 'null'));

                return response()->json([
                    'status' => 'success',
                    'data' => [
                        'checkout_url' => env('FRONTEND_URL', 'http://localhost:8080') . '/payment/success?status=success&tx_ref=' . $order->tx_ref,
                        'order_id' => $order->id,
                    ]
                ]);
            } else {
                // Use actual Chapa API for payment
                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . $chapaSecretKey,
                    'Content-Type' => 'application/json',
                ])->post(env('CHAPA_BASE_URL', 'https://api.chapa.co/v1') . '/transaction/initialize', $data);
                
                \Log::info('Chapa API response: ' . $response->body());
                
                if ($response->successful()) {
                    $responseData = $response->json();
                    
                    // Create payment record
                    $payment = \App\Models\Payment::create([
                        'tx_ref' => $tx_ref,
                        'amount' => $request->amount,
                        'currency' => 'ETB',
                        'status' => 'pending',
                        'user_email' => $request->email,
                        'payment_url' => $responseData['data']['checkout_url'] ?? null,
                    ]);

                    // Create order with pending status
                    $order = \App\Models\Order::create([
                        'order_number' => 'ORD_' . time() . '_' . rand(1000, 9999),
                        'user_email' => $request->email,
                        'total' => $request->amount,
                        'status' => 'pending',
                        'tx_ref' => $tx_ref,
                        'items' => json_encode($request->items),
                        'payment_url' => $responseData['data']['checkout_url'] ?? null,
                    ]);

                    \Log::info('Payment created with id: ' . $payment->id . ', tx_ref: ' . ($payment->tx_ref ?? 'null'));
                    \Log::info('Order created with id: ' . $order->id . ', tx_ref: ' . ($order->tx_ref ?? 'null'));
                    \Log::info('Checkout URL: ' . ($responseData['data']['checkout_url'] ?? 'null'));

                    return response()->json([
                        'status' => 'success',
                        'data' => [
                            'checkout_url' => $responseData['data']['checkout_url'],
                            'order_id' => $order->id,
                        ]
                    ]);
                } else {
                    \Log::error('Chapa API error: ' . $response->body());
                    $errorMessage = 'Unknown error';
                    
                    // Handle different error response formats
                    $responseData = $response->json();
                    if (isset($responseData['message'])) {
                        if (is_string($responseData['message'])) {
                            $errorMessage = $responseData['message'];
                        } elseif (is_array($responseData['message'])) {
                            // Extract first error message from the array
                            foreach ($responseData['message'] as $field => $errors) {
                                if (is_array($errors) && count($errors) > 0) {
                                    $errorMessage = $errors[0];
                                    break;
                                }
                            }
                        }
                    }
                    
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Payment service error: ' . $errorMessage
                    ], 500);
                }
            }

        } catch (\Exception $e) {
            \Log::error('Payment exception: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Payment service error: ' . $e->getMessage()
            ], 500);
        }
    }

    public function callback(Request $request)
    {
        // Handle Chapa callback
        \Log::info('Payment callback received: ' . json_encode($request->all()));

        $tx_ref = $request->tx_ref;
        $status = $request->status;

        if (!$tx_ref) {
            \Log::error('Payment callback missing tx_ref');
            return response()->json(['status' => 'error', 'message' => 'Missing transaction reference'], 400);
        }

        $order = \App\Models\Order::where('tx_ref', $tx_ref)->first();
        $payment = \App\Models\Payment::where('tx_ref', $tx_ref)->first();

        \Log::info('Order found: ' . ($order ? 'yes' : 'no') . ', Payment found: ' . ($payment ? 'yes' : 'no'));

        if ($order) {
            $newStatus = $status === 'success' ? 'paid' : 'failed';
            \Log::info('Updating order status to: ' . $newStatus . ' for tx_ref: ' . $tx_ref . ', previous status: ' . $order->status);
            $order->update(['status' => $newStatus]);

            if ($payment) {
                \Log::info('Updating payment status to: ' . $newStatus . ' for tx_ref: ' . $tx_ref . ', previous status: ' . $payment->status);
                $payment->update(['status' => $newStatus]);
            }

            \Log::info('Callback processing completed successfully for tx_ref: ' . $tx_ref);
            return response()->json(['status' => 'ok']);
        } else {
            \Log::error('Order not found for tx_ref: ' . $tx_ref);
            return response()->json(['status' => 'error', 'message' => 'Order not found'], 404);
        }
    }
    
    public function verifyPayment(Request $request)
    {
        $tx_ref = $request->query('tx_ref');

        \Log::info('Payment verification request for tx_ref: ' . ($tx_ref ?? 'null'));

        if (!$tx_ref) {
            \Log::error('Payment verification missing tx_ref');
            return response()->json([
                'status' => 'error',
                'message' => 'Missing transaction reference'
            ], 400)->header('Access-Control-Allow-Origin', '*');
        }

        // Check if we have a record of this payment
        $order = \App\Models\Order::where('tx_ref', $tx_ref)->first();
        $payment = \App\Models\Payment::where('tx_ref', $tx_ref)->first();

        \Log::info('Verification - Order found: ' . ($order ? 'yes (status: ' . $order->status . ')' : 'no') . ', Payment found: ' . ($payment ? 'yes (status: ' . $payment->status . ')' : 'no'));

        if (!$order && !$payment) {
            \Log::error('No order or payment found for tx_ref: ' . $tx_ref);
            return response()->json([
                'status' => 'error',
                'message' => 'No payment record found'
            ], 404)->header('Access-Control-Allow-Origin', '*');
        }

        // If we have a payment record, check its status
        if ($payment) {
            // Check if it's a mock payment
            if ($payment->payment_url && str_starts_with($payment->payment_url, env('FRONTEND_URL', 'http://localhost:8080'))) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Mock payment verified',
                    'data' => [
                        'tx_ref' => $tx_ref,
                        'order_status' => $order ? $order->status : null,
                        'payment_status' => $payment->status
                    ]
                ])->header('Access-Control-Allow-Origin', '*');
            }

            // If payment is still pending, verify with Chapa
            if ($payment->status === 'pending') {
                \Log::info('Payment status is pending, verifying with Chapa API');
                try {
                    $chapaSecretKey = env('CHAPA_SECRET_KEY');
                    $response = Http::withHeaders([
                        'Authorization' => 'Bearer ' . $chapaSecretKey,
                        'Content-Type' => 'application/json',
                    ])->get(env('CHAPA_BASE_URL', 'https://api.chapa.co/v1') . '/transaction/verify/' . $tx_ref);

                    \Log::info('Chapa verification response: ' . $response->body());

                    if ($response->successful()) {
                        $responseData = $response->json();
                        $verificationStatus = $responseData['status'] ?? 'failed';
                        \Log::info('Chapa verification status: ' . $verificationStatus);

                        // Update payment and order status based on verification
                        $newStatus = $verificationStatus === 'success' ? 'paid' : 'failed';

                        if ($payment) {
                            \Log::info('Updating payment status to: ' . $newStatus);
                            $payment->update(['status' => $newStatus]);
                        }

                        if ($order) {
                            \Log::info('Updating order status to: ' . $newStatus);
                            $order->update(['status' => $newStatus]);
                        }

                        \Log::info('Verification completed, returning status: ' . $verificationStatus);
                        return response()->json([
                            'status' => $verificationStatus,
                            'message' => $responseData['message'] ?? 'Payment verification completed',
                            'data' => [
                                'tx_ref' => $tx_ref,
                                'order_status' => $order ? $order->status : null,
                                'payment_status' => $payment ? $payment->status : null
                            ]
                        ])->header('Access-Control-Allow-Origin', '*');
                    } else {
                        \Log::error('Chapa verification request failed with status: ' . $response->status());
                        // If verification fails, return the current status
                        return response()->json([
                            'status' => $payment->status === 'paid' ? 'success' : 'failed',
                            'message' => 'Payment verification failed with Chapa, using local status',
                            'data' => [
                                'tx_ref' => $tx_ref,
                                'order_status' => $order ? $order->status : null,
                                'payment_status' => $payment ? $payment->status : null
                            ]
                        ])->header('Access-Control-Allow-Origin', '*');
                    }
                } catch (\Exception $e) {
                    \Log::error('Payment verification exception: ' . $e->getMessage());
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Payment verification error: ' . $e->getMessage()
                    ], 500)->header('Access-Control-Allow-Origin', '*');
                }
            } else {
                \Log::info('Payment status is not pending, returning current status');
                // Return the current payment status
                return response()->json([
                    'status' => $payment->status === 'paid' ? 'success' : 'failed',
                    'message' => 'Payment status retrieved',
                    'data' => [
                        'tx_ref' => $tx_ref,
                        'order_status' => $order ? $order->status : null,
                        'payment_status' => $payment->status
                    ]
                ])->header('Access-Control-Allow-Origin', '*');
            }
        } else if ($order) {
            \Log::info('No payment record, using order status');
            // If we only have an order record, return its status
            return response()->json([
                'status' => $order->status === 'paid' ? 'success' : 'failed',
                'message' => 'Order status retrieved',
                'data' => [
                    'tx_ref' => $tx_ref,
                    'order_status' => $order->status,
                    'payment_status' => null
                ]
            ])->header('Access-Control-Allow-Origin', '*');
        }
    }
}