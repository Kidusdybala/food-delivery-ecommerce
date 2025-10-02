<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Restaurant::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'cuisine' => 'required|string|max:255',
            'rating' => 'required|numeric|min:0|max:5',
            'delivery_time' => 'required|integer|min:0',
            'delivery_fee' => 'required|numeric|min:0',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $restaurant = Restaurant::create($request->all());
        return response()->json($restaurant, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $restaurant = Restaurant::findOrFail($id);
        return response()->json($restaurant);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'cuisine' => 'sometimes|required|string|max:255',
            'rating' => 'sometimes|required|numeric|min:0|max:5',
            'delivery_time' => 'sometimes|required|integer|min:0',
            'delivery_fee' => 'sometimes|required|numeric|min:0',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $restaurant = Restaurant::findOrFail($id);
        $restaurant->update($request->all());
        return response()->json($restaurant);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $restaurant = Restaurant::findOrFail($id);
        $restaurant->delete();
        return response()->json(['message' => 'Restaurant deleted successfully']);
    }
}
