<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Enums\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:client,admin,delivery',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => Role::from($request->role),
        ]);

        // For MongoDB compatibility, create a simple token
        $token = $user->id . '|' . bin2hex(random_bytes(32));

        return response()->json(['user' => $user, 'token' => $token], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();
        // For MongoDB compatibility, create a simple token
        $token = $user->id . '|' . bin2hex(random_bytes(32));

        return response()->json(['user' => $user, 'token' => $token]);
    }

    public function logout(Request $request)
    {
        // For simple token approach, just return success
        // In a real implementation, you'd invalidate the token
        return response()->json(['message' => 'Logged out']);
    }
}
