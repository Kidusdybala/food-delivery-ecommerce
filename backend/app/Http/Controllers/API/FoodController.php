<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Food;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Food::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'restaurant' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $food = Food::create($request->all());
        return response()->json($food, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $food = Food::findOrFail($id);
        return response()->json($food);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'restaurant' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric|min:0',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $food = Food::findOrFail($id);
        $food->update($request->all());
        return response()->json($food);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $food = Food::findOrFail($id);
        $food->delete();
        return response()->json(['message' => 'Food deleted successfully']);
    }
}
