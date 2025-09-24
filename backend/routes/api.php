<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\FoodController;
use App\Http\Controllers\API\RestaurantController;
use App\Http\Controllers\API\OrderController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('foods', FoodController::class);
Route::apiResource('restaurants', RestaurantController::class);
Route::apiResource('orders', OrderController::class);