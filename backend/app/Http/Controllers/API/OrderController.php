<?php

namespace App\Http\Controllers\API;

use App\Enums\OrderStatus;
use App\Enums\Role;
use App\Events\OrderStatusUpdated;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Order::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Assign order to delivery person (Admin only)
     */
    public function assignOrder(Request $request, string $id)
    {
        $request->validate([
            'delivery_person_id' => 'required|exists:users,id'
        ]);

        $order = Order::findOrFail($id);

        // Check if delivery person has role delivery
        $deliveryPerson = User::findOrFail($request->delivery_person_id);
        if ($deliveryPerson->role !== Role::DELIVERY) {
            return response()->json(['error' => 'User is not a delivery person'], 400);
        }

        $order->update([
            'delivery_person_id' => $request->delivery_person_id,
            'status' => OrderStatus::ASSIGNED
        ]);

        // Broadcast the status update
        broadcast(new OrderStatusUpdated($order))->toOthers();

        return response()->json(['message' => 'Order assigned successfully', 'order' => $order]);
    }

    /**
     * Get assigned orders for delivery person
     */
    public function getAssignedOrders()
    {
        $user = Auth::user();
        if ($user->role !== Role::DELIVERY) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $orders = Order::where('delivery_person_id', $user->id)
            ->whereIn('status', [OrderStatus::ASSIGNED, OrderStatus::PICKED_UP])
            ->with('deliveryPerson')
            ->get();

        return response()->json($orders);
    }

    /**
     * Update order status by delivery person
     */
    public function updateOrderStatus(Request $request, string $id)
    {
        $request->validate([
            'status' => 'required|in:picked_up,delivered'
        ]);

        $user = Auth::user();
        if ($user->role !== Role::DELIVERY) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $order = Order::where('id', $id)
            ->where('delivery_person_id', $user->id)
            ->firstOrFail();

        $newStatus = $request->status === 'picked_up' ? OrderStatus::PICKED_UP : OrderStatus::DELIVERED;

        $order->update(['status' => $newStatus]);

        // Broadcast the status update
        broadcast(new OrderStatusUpdated($order))->toOthers();

        return response()->json(['message' => 'Order status updated successfully', 'order' => $order]);
    }

    /**
     * Get pending orders for admin
     */
    public function getPendingOrders()
    {
        $orders = Order::where('status', OrderStatus::PENDING)->get();
        return response()->json($orders);
    }

    /**
     * Get delivery persons
     */
    public function getDeliveryPersons()
    {
        $deliveryPersons = User::where('role', Role::DELIVERY)->get(['id', 'name', 'email']);
        return response()->json($deliveryPersons);
    }
}
