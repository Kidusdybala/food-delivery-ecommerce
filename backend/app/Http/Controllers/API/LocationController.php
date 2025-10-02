<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Location;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LocationController extends Controller
{
    public function updateLocation(Request $request)
    {
        $request->validate([
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        $user = Auth::user();

        Location::create([
            'user_id' => $user->id,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'timestamp' => now(),
        ]);

        return response()->json(['message' => 'Location updated successfully']);
    }

    public function getDeliveryLocation($orderId)
    {
        $order = Order::findOrFail($orderId);

        // Check if the authenticated user is the owner of the order
        if ($order->user_email !== Auth::user()->email) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        if (!$order->delivery_person_id) {
            return response()->json(['error' => 'No delivery person assigned'], 404);
        }

        $location = Location::where('user_id', $order->delivery_person_id)
            ->orderBy('timestamp', 'desc')
            ->first();

        if (!$location) {
            return response()->json(['error' => 'Location not found'], 404);
        }

        return response()->json([
            'latitude' => $location->latitude,
            'longitude' => $location->longitude,
            'timestamp' => $location->timestamp,
        ]);
    }
}
