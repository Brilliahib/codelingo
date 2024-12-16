<?php

namespace App\Http\Controllers;

use App\Models\LearningPath;
use Illuminate\Http\Request;

class LearningPathController extends Controller
{
    // Fetch all learning paths
    public function index()
    {
        $data = LearningPath::all();
        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'Learning paths retrieved successfully',
                'data' => $data,
            ],
            200,
        );
    }

    // Create a new learning path
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $learningPath = LearningPath::create($validated);
        return response()->json(
            [
                'statusCode' => 201,
                'message' => 'Learning path created successfully',
                'data' => $learningPath,
            ],
            201,
        );
    }

    // Show a single learning path
    // Show a single learning path with materials and quizzes
    public function show($id)
    {
        // Fetch the learning path along with its materials and quizzes
        $learningPath = LearningPath::with(['materials', 'quizzes'])->find($id);

        if (!$learningPath) {
            return response()->json(
                [
                    'statusCode' => 404,
                    'message' => 'Learning path not found',
                    'data' => null,
                ],
                404,
            );
        }

        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'Learning path retrieved successfully',
                'data' => $learningPath,
            ],
            200,
        );
    }

    // Update a learning path
    public function update(Request $request, $id)
    {
        $learningPath = LearningPath::find($id);
        if (!$learningPath) {
            return response()->json(
                [
                    'statusCode' => 404,
                    'message' => 'Learning path not found',
                    'data' => null,
                ],
                404,
            );
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $learningPath->update($validated);
        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'Learning path updated successfully',
                'data' => $learningPath,
            ],
            200,
        );
    }

    // Delete a learning path
    public function destroy($id)
    {
        $learningPath = LearningPath::find($id);
        if (!$learningPath) {
            return response()->json(
                [
                    'statusCode' => 404,
                    'message' => 'Learning path not found',
                    'data' => null,
                ],
                404,
            );
        }

        $learningPath->delete();
        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'Learning path deleted successfully',
                'data' => null,
            ],
            200,
        );
    }
}
