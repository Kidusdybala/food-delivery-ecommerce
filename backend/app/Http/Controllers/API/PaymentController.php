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

        $data = [
            'amount' => $request->amount,
            'currency' => 'ETB',
            'email' => $request->email,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'tx_ref' => 'txn_' . time() . '_' . rand(1000, 9999),
            'callback_url' => env('APP_URL') . '/api/payment/callback',
            'return_url' => env('FRONTEND_URL', 'http://localhost:8080') . '/payment/success',
            'customization' => [
                'title' => 'FoodieExpress Order',
                'description' => 'Payment for food order',
            ],
        ];

        try {
            // Simulate successful payment for testing
            $order = \App\Models\Order::create([
                'user_email' => $request->email,
                'amount' => $request->amount,
                'currency' => 'ETB',
                'status' => 'paid', // Mark as paid immediately for testing
                'tx_ref' => $data['tx_ref'],
                'items' => json_encode($request->items),
                'payment_url' => env('FRONTEND_URL', 'http://localhost:8080') . '/payment/success?tx_ref=' . $data['tx_ref'],
            ]);

            return response()->json([
                'status' => 'success',
                'data' => [
                    'checkout_url' => env('FRONTEND_URL', 'http://localhost:8080') . '/payment/success?tx_ref=' . $order->tx_ref,
                    'order_id' => $order->id,
                ]
            ]);

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
        $tx_ref = $request->tx_ref;
        $status = $request->status;

        $order = \App\Models\Order::where('tx_ref', $tx_ref)->first();
        if ($order) {
            $order->update(['status' => $status === 'success' ? 'paid' : 'failed']);
        }

        return response()->json(['status' => 'ok']);
    }
}