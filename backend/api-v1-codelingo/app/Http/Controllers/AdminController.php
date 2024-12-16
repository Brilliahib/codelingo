<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    // Get all users
    public function getAllUsers()
    {
        $users = User::all();
        return response()->json([
            'statusCode' => 200,
            'message' => 'All users retrieved successfully',
            'data' => $users,
        ], 200);
    }

    // Delete a user
    public function deleteUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'User not found',
                'data' => null,
            ], 404);
        }

        $user->delete();

        return response()->json([
            'statusCode' => 200,
            'message' => 'User deleted successfully',
            'data' => null,
        ], 200);
    }

    // Get user details
    public function getUserDetail($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'User not found',
                'data' => null,
            ], 404);
        }

        return response()->json([
            'statusCode' => 200,
            'message' => 'User details retrieved successfully',
            'data' => $user,
        ], 200);
    }

    // Update a user
    public function updateUser(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'User not found',
                'data' => null,
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'username' => 'nullable|string|max:255|unique:users,username,' . $id,
            'email' => 'nullable|email|max:255|unique:users,email,' . $id,
            'image' => 'nullable|string',
            'role' => 'nullable|string|in:user,admin',
            'password' => 'nullable|string|min:8',
            'exp' => 'nullable|integer|min:0',
            'level' => 'nullable|integer|min:1',
            'league' => 'nullable|string|in:bronze,silver,gold,platinum',
        ]);

        // Update fields
        $user->fill($validated);

        // Hash the password if it exists in the request
        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json([
            'statusCode' => 200,
            'message' => 'User updated successfully',
            'data' => $user,
        ], 200);
    }
}
