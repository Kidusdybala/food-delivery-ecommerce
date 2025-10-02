<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\FoodController;
use App\Http\Controllers\API\RestaurantController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\PaymentController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\LocationController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('foods', FoodController::class);
Route::apiResource('restaurants', RestaurantController::class);
Route::apiResource('orders', OrderController::class);

// Admin routes
Route::middleware('role:admin')->group(function () {
    Route::apiResource('admin/restaurants', RestaurantController::class);
    Route::apiResource('admin/foods', FoodController::class);
    Route::get('admin/orders/pending', [OrderController::class, 'getPendingOrders']);
    Route::post('admin/orders/{id}/assign', [OrderController::class, 'assignOrder']);
    Route::get('admin/delivery-persons', [OrderController::class, 'getDeliveryPersons']);
});

// Delivery routes
Route::middleware('role:delivery')->group(function () {
    Route::get('delivery/orders', [OrderController::class, 'getAssignedOrders']);
    Route::patch('delivery/orders/{id}/status', [OrderController::class, 'updateOrderStatus']);
    Route::post('locations', [LocationController::class, 'updateLocation']);
});

// Client routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('orders/{orderId}/delivery-location', [LocationController::class, 'getDeliveryLocation']);
});

Route::post('/payment/initialize', [PaymentController::class, 'initializePayment']);
Route::post('/payment/callback', [PaymentController::class, 'callback']);
Route::get('/payment/verify', [PaymentController::class, 'verifyPayment']);