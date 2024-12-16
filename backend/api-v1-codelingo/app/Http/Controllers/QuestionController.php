<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\User;
use App\Models\UserLearningPath;
use App\Models\UserQuiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuestionController extends Controller
{
    public function index($quizId)
    {
        $questions = Question::with('answers')->where('quiz_id', $quizId)->get();

        return response()->json([
            'statusCode' => 200,
            'message' => 'Questions retrieved successfully',
            'data' => $questions,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'quiz_id' => 'required|exists:quizzes,id',
            'question_text' => 'required|string',
            'question_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'explanation_text' => 'required|string',
            'explanation_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'answers' => 'required|array|min:2', 
            'answers.*.answer_text' => 'required|string',
            'answers.*.is_correct' => 'required|boolean',
        ]);

        if ($request->hasFile('question_image')) {
            $imageName = time() . '_' . $request->file('question_image')->getClientOriginalName();
            $imagePath = $request->file('question_image')->storeAs('question_images', $imageName, 'public');
            $validated['question_image'] = 'storage/' . $imagePath;
        }

        if ($request->hasFile('explanation_image')) {
            $imageName = time() . '_' . $request->file('explanation_image')->getClientOriginalName();
            $imagePath = $request->file('explanation_image')->storeAs('explanation_images', $imageName, 'public');
            $validated['explanation_image'] = 'storage/' . $imagePath;
        }

        // Buat pertanyaan
        $question = Question::create([
            'quiz_id' => $validated['quiz_id'],
            'question_text' => $validated['question_text'],
            'question_image' => $validated['question_image'] ?? null,
            'explanation_text' => $validated['explanation_text'],
            'explanation_image' => $validated['explanation_image'] ?? null,
        ]);

        // Tambahkan jawaban
        foreach ($validated['answers'] as $answer) {
            $question->answers()->create($answer);
        }

        return response()->json([
            'statusCode' => 201,
            'message' => 'Question and answers created successfully',
            'data' => $question->load('answers'),
        ]);
    }

    public function show($id)
    {
        $question = Question::with('answers')->find($id);

        if (!$question) {
            return response()->json(
                [
                    'statusCode' => 404,
                    'message' => 'Question not found',
                    'data' => null,
                ],
                404,
            );
        }

        // Ambil user yang sedang login
        $user = Auth::user();

        // Ambil learning_path_id dari Quiz terkait
        $learningPathId = $question->quiz->learning_path_id;

        // Ambil user_learning_path_id berdasarkan user dan learning_path_id
        $userLearningPath = UserLearningPath::where('user_id', $user->id)
            ->where('learning_path_id', $learningPathId)
            ->first();

        // Tambahkan user_learning_path_id sebagai properti tambahan
        $question->user_learning_path_id = $userLearningPath ? $userLearningPath->id : null;

        return response()->json([
            'statusCode' => 200,
            'message' => 'Question retrieved successfully',
            'data' => $question,
        ]);
    }

    public function update(Request $request, $id)
    {
        $question = Question::find($id);

        if (!$question) {
            return response()->json(
                [
                    'statusCode' => 404,
                    'message' => 'Question not found',
                    'data' => null,
                ],
                404,
            );
        }

        $validated = $request->validate([
            'question_text' => 'required|string',
            'question_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'explanation_text' => 'required|string',
            'explanation_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'answers' => 'required|array|min:2',
            'answers.*.answer_text' => 'required|string',
            'answers.*.is_correct' => 'required|boolean',
        ]);

        if ($request->hasFile('question_image')) {
            if ($question->question_image) {
                $oldImagePath = public_path('storage/' . $question->question_image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            $imageName = time() . '_' . $request->file('question_image')->getClientOriginalName();
            $imagePath = $request->file('question_image')->storeAs('question_images', $imageName, 'public');
            $validated['question_image'] = 'public/' . $imagePath;
        }

        if ($request->hasFile('explanation_image')) {
            if ($question->explanation_image) {
                $oldImagePath = public_path('storage/' . $question->explanation_image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            $imageName = time() . '_' . $request->file('explanation_image')->getClientOriginalName();
            $imagePath = $request->file('explanation_image')->storeAs('explanation_images', $imageName, 'public');
            $validated['explanation_image'] = 'public/' . $imagePath;
        }

        // Update pertanyaan
        $question->update([
            'question_text' => $validated['question_text'],
            'question_image' => $validated['question_image'] ?? $question->question_image,
            'explanation_text' => $validated['explanation_text'],
            'explanation_image' => $validated['explanation_image'] ?? $question->explanation_image,
        ]);

        // Update jawaban (hapus semua dulu, lalu tambahkan kembali)
        $question->answers()->delete();
        foreach ($validated['answers'] as $answer) {
            $question->answers()->create($answer);
        }

        return response()->json([
            'statusCode' => 200,
            'message' => 'Question and answers updated successfully',
            'data' => $question->load('answers'),
        ]);
    }

    public function destroy($id)
    {
        $question = Question::find($id);
        if (!$question) {
            return response()->json(
                [
                    'statusCode' => 404,
                    'message' => 'Question not found',
                    'data' => null,
                ],
                404,
            );
        }

        $question->delete();
        return response()->json([
            'statusCode' => 200,
            'message' => 'Question deleted successfully',
            'data' => null,
        ]);
    }

    public function submitSingleQuestion(Request $request, $questionId)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'answer_id' => 'required|exists:answers,id',
        ]);

        $question = Question::find($questionId);

        if (!$question) {
            return response()->json(
                [
                    'statusCode' => 404,
                    'message' => 'Question not found',
                ],
                404,
            );
        }

        $correctAnswer = $question->answers()->where('is_correct', true)->first();
        $isCorrect = $correctAnswer && $correctAnswer->id == $validated['answer_id'];

        $earnedExp = $isCorrect ? 200 : 0;

        $user = User::findOrFail($validated['user_id']);
        $user->exp += $earnedExp;

        $user->level = User::determineLevel($user->exp);
        $user->league = User::determineLeague($user->exp);

        $user->save();

        // Update user_quizzes to set is_completed to true
        $userQuiz = UserQuiz::where('user_learning_path_id', $user->id)
            ->where('quiz_id', $question->quiz_id)
            ->first();

        if ($userQuiz) {
            $userQuiz->is_completed = true;
            $userQuiz->save();
        }

        return response()->json([
            'statusCode' => 200,
            'message' => $isCorrect ? 'Correct answer!' : 'Incorrect answer!',
            'data' => [
                'is_correct' => $isCorrect,
                'earned_exp' => $earnedExp,
                'correct_answer' => $correctAnswer ? $correctAnswer : null,
            ],
        ]);
    }
}
