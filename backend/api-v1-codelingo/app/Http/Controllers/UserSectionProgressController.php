<?php

namespace App\Http\Controllers;

use App\Models\UserSectionProgress;
use Illuminate\Http\Request;

class UserSectionProgressController extends Controller
{
    // Fetch progress for a specific user
    public function index($userId)
    {
        $progress = UserSectionProgress::where('user_id', $userId)->get();
        return response()->json([
            'statusCode' => 200,
            'message' => 'User progress retrieved successfully',
            'data' => $progress
        ], 200);
    }

    // Mark section as completed
    public function complete(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'section_id' => 'required|exists:sections,id',
        ]);

        $progress = UserSectionProgress::updateOrCreate(
            ['user_id' => $validated['user_id'], 'section_id' => $validated['section_id']],
            ['is_completed' => true]
        );

        return response()->json([
            'statusCode' => 200,
            'message' => 'Section marked as completed',
            'data' => $progress
        ], 200);
    }
}
