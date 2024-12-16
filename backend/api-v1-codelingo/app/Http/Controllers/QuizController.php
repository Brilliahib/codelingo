<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\UserQuiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function getAllQuizzes()
    {
        $quizzes = Quiz::with('learningPath')->get(); 
        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'All quizzes retrieved successfully',
                'data' => $quizzes,
            ],
            200,
        );
    }
    // Fetch all quizzes for a learning path
    public function index($learningPathId)
    {
        $quizzes = Quiz::where('learning_path_id', $learningPathId)->get();
        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'Quizzes retrieved successfully',
                'data' => $quizzes,
            ],
            200,
        );
    }

    // Create a new quiz
    public function store(Request $request)
    {
        $validated = $request->validate([
            'learning_path_id' => 'required|exists:learning_paths,id',
            'title' => 'required|string|max:255',
            'description' => 'required',
        ]);

        $quiz = Quiz::create($validated);
        return response()->json(
            [
                'statusCode' => 201,
                'message' => 'Quiz created successfully',
                'data' => $quiz,
            ],
            201,
        );
    }

    // Show a single quiz
    public function show($id)
    {
        $quiz = Quiz::find($id);
        if (!$quiz) {
            return response()->json(
                [
                    'statusCode' => 404,
                    'message' => 'Quiz not found',
                    'data' => null,
                ],
                404,
            );
        }

        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'Quiz retrieved successfully',
                'data' => $quiz,
            ],
            200,
        );
    }

    // Update a quiz
    public function update(Request $request, $id)
    {
        $quiz = Quiz::find($id);
        if (!$quiz) {
            return response()->json(
                [
                    'statusCode' => 404,
                    'message' => 'Quiz not found',
                    'data' => null,
                ],
                404,
            );
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required',
        ]);

        $quiz->update($validated);
        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'Quiz updated successfully',
                'data' => $quiz,
            ],
            200,
        );
    }

    // Delete a quiz
    public function destroy($id)
    {
        $quiz = Quiz::find($id);
        if (!$quiz) {
            return response()->json(
                [
                    'statusCode' => 404,
                    'message' => 'Quiz not found',
                    'data' => null,
                ],
                404,
            );
        }

        $quiz->delete();
        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'Quiz deleted successfully',
                'data' => null,
            ],
            200,
        );
    }

    public function getQuizExplanation($userLearningPathId)
    {
        $completedQuizzes = UserQuiz::with('quiz')
            ->where('user_learning_path_id', $userLearningPathId)
            ->where('is_completed', true)
            ->get();

        if ($completedQuizzes->isEmpty()) {
            return response()->json(
                [
                    'statusCode' => 404,
                    'message' => 'No completed quizzes found',
                    'data' => null,
                ],
                404,
            );
        }

        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'Completed quizzes retrieved successfully',
                'data' => $completedQuizzes,
            ],
            200,
        );
    }
}
