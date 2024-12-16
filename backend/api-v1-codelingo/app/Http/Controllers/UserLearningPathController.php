<?php

namespace App\Http\Controllers;

use App\Models\UserLearningPath;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserLearningPathController extends Controller
{
    // Get All Learning Path from Users
    public function getAllUserLearningPaths()
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(
                [
                    'statusCode' => 401,
                    'message' => 'Unauthorized',
                ],
                Response::HTTP_UNAUTHORIZED,
            );
        }

        $userLearningPaths = UserLearningPath::with(['learningPath', 'userMaterials', 'userQuizzes'])
            ->where('user_id', $user->id)
            ->get();

        $userLearningPaths->transform(function ($userLearningPath) {
            $completedMaterials = $userLearningPath->userMaterials->where('is_completed', true)->count();
            $totalMaterials = $userLearningPath->userMaterials->count();

            $completedQuizzes = $userLearningPath->userQuizzes->where('is_completed', true)->count();
            $totalQuizzes = $userLearningPath->userQuizzes->count();

            $totalCompleted = $completedMaterials + $completedQuizzes;
            $totalItems = $totalMaterials + $totalQuizzes;
            $progress_status = $totalItems > 0 ? ($totalCompleted / $totalItems) * 100 : 0;

            $userLearningPath->progress_status = round($progress_status, 2);
            return $userLearningPath;
        });

        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'Data User Learning Paths berhasil diambil',
                'data' => $userLearningPaths,
            ],
            Response::HTTP_OK,
        );
    }

    public function getUserLearningPathDetail(UserLearningPath $userLearningPath)
    {
        // Load relasi yang diperlukan
        $userLearningPath->load(['learningPath', 'learningPath.materials', 'learningPath.quizzes', 'userMaterials.material', 'userQuizzes.quiz']);

        // Menghitung jumlah material dan quiz yang telah diselesaikan
        $completedMaterials = $userLearningPath->userMaterials->where('is_completed', true)->count();
        $totalMaterials = $userLearningPath->userMaterials->count();

        $completedQuizzes = $userLearningPath->userQuizzes->where('is_completed', true)->count();
        $totalQuizzes = $userLearningPath->userQuizzes->count();

        // Menghitung total progres
        $totalCompleted = $completedMaterials + $completedQuizzes;
        $totalItems = $totalMaterials + $totalQuizzes;
        $progress_status = $totalItems > 0 ? ($totalCompleted / $totalItems) * 100 : 0;

        $userLearningPath->progress_status = round($progress_status, 2);

        // Menggabungkan data material dan quiz dari learningPath dan user
        $combinedItems = $userLearningPath->learningPath->materials->map(function ($material) use ($userLearningPath) {
            // Cek apakah material ini sudah diselesaikan oleh user
            $userMaterial = $userLearningPath->userMaterials->where('material_id', $material->id)->last();
            return [
                'id' => $material->id, // Mengambil ID dari material yang ada di learningPath
                'type' => 'material',
                'title' => $material->title,
                'is_completed' => $userMaterial ? $userMaterial->is_completed : false, // Status selesai dari user
                'is_unlocked' => $userMaterial ? $userMaterial->is_unlocked : false, // Status unlocked dari user
                'created_at' => $userMaterial ? $userMaterial->created_at : null,
                'updated_at' => $userMaterial ? $userMaterial->updated_at : null,
                'material_image' => $material->material_image,
                'material_text' => $material->material_text,
            ];
        });

        // Tambahkan data quiz setelah material
        $combinedItems = $combinedItems->merge(
            $userLearningPath->learningPath->quizzes->map(function ($quiz) use ($userLearningPath) {
                $userQuiz = $userLearningPath->userQuizzes->where('quiz_id', $quiz->id)->last();

                // Mengambil ID dari question yang pertama terkait dengan quiz
                $question = $quiz->questions->first(); // Ambil question pertama
                $questionId = $question ? $question->id : null;

                return [
                    'id' => $questionId, // Ganti ID quiz dengan ID question
                    'type' => 'quiz',
                    'title' => $quiz->title,
                    'is_completed' => $userQuiz ? $userQuiz->is_completed : false, // Status selesai dari user
                    'is_unlocked' => $userQuiz ? $userQuiz->is_unlocked : false, // Status unlocked dari user
                    'created_at' => $userQuiz ? $userQuiz->created_at : null,
                    'updated_at' => $userQuiz ? $userQuiz->updated_at : null,
                    'quiz_description' => $quiz->description,
                ];
            }),
        );

        // Menyimpan title dari learningPath sebelum menggunakan only
        $learningPathTitle = $userLearningPath->learningPath->title;

        // Menggunakan only untuk mengurangi data yang dikembalikan
        $userLearningPath = $userLearningPath->only('id', 'user_id', 'learning_path_id', 'progress_status', 'created_at', 'updated_at');

        // Menambahkan title dari learningPath ke dalam array yang dikembalikan
        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'Detail User Learning Path berhasil diambil',
                'data' => [
                    'learning_details' => array_merge(
                        $userLearningPath,
                        ['title' => $learningPathTitle], // Menambahkan title di sini
                    ),
                    'learning_items' => $combinedItems,
                ],
            ],
            Response::HTTP_OK,
        );
    }

    // Get progress learning path users
    public function getUserLearningPathProgress(UserLearningPath $userLearningPath)
    {
        $userLearningPath->load(['userMaterials', 'userQuizzes']);

        $completedMaterials = $userLearningPath->userMaterials->where('is_completed', true)->count();
        $totalMaterials = $userLearningPath->userMaterials->count();

        $completedQuizzes = $userLearningPath->userQuizzes->where('is_completed', true)->count();
        $totalQuizzes = $userLearningPath->userQuizzes->count();

        $totalCompleted = $completedMaterials + $completedQuizzes;
        $totalItems = $totalMaterials + $totalQuizzes;
        $progress = $totalItems > 0 ? ($totalCompleted / $totalItems) * 100 : 0;

        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'Progress User Learning Path berhasil dihitung',
                'data' => [
                    'progress_status' => round($progress, 2),
                    'completedMaterials' => $completedMaterials,
                    'totalMaterials' => $totalMaterials,
                    'completedQuizzes' => $completedQuizzes,
                    'totalQuizzes' => $totalQuizzes,
                ],
            ],
            Response::HTTP_OK,
        );
    }

    // Get Completed Learning Path from Users
    public function getCompletedUserLearningPaths()
    {
        $userLearningPaths = UserLearningPath::with(['learningPath', 'userMaterials', 'userQuizzes'])->get();

        $completedUserLearningPaths = $userLearningPaths->filter(function ($userLearningPath) {
            $completedMaterials = $userLearningPath->userMaterials->where('is_completed', true)->count();
            $totalMaterials = $userLearningPath->userMaterials->count();

            $completedQuizzes = $userLearningPath->userQuizzes->where('is_completed', true)->count();
            $totalQuizzes = $userLearningPath->userQuizzes->count();

            $totalCompleted = $completedMaterials + $completedQuizzes;
            $totalItems = $totalMaterials + $totalQuizzes;

            $progress_status = $totalItems > 0 ? ($totalCompleted / $totalItems) * 100 : 0;

            return round($progress_status, 2) === 100.0;
        });

        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'User Learning Paths dengan progress 100% berhasil diambil',
                'data' => $completedUserLearningPaths->values(),
            ],
            Response::HTTP_OK,
        );
    }
}
