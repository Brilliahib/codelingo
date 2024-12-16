<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\Quiz;
use App\Models\User;
use App\Models\UserLearningPath;
use App\Models\UserMaterial;
use App\Models\UserQuiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MaterialController extends Controller
{
    public function getAllMaterials()
    {
        $materials = Material::with('learningPath')->get();

        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'All materials retrieved successfully',
                'data' => $materials,
            ],
            200,
        );
    }
    // Fetch all materials for a learning path
    public function index($learningPathId)
    {
        $materials = Material::where('learning_path_id', $learningPathId)->get();
        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'Materials retrieved successfully',
                'data' => $materials,
            ],
            200,
        );
    }

    // Create a new material
    public function store(Request $request)
    {
        $validated = $request->validate([
            'learning_path_id' => 'required|exists:learning_paths,id',
            'title' => 'required|string|max:255',
            'material_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validasi file image
            'material_text' => 'required|string',
        ]);

        // Cek jika ada file material_image
        if ($request->hasFile('material_image')) {
            $imageName = time() . '_' . $request->file('material_image')->getClientOriginalName();
            $imagePath = $request->file('material_image')->storeAs('materials/images', $imageName, 'public');
            $validated['material_image'] = 'storage/' . $imagePath; // Simpan path file
        }

        $material = Material::create($validated);
        return response()->json(
            [
                'statusCode' => 201,
                'message' => 'Material created successfully',
                'data' => $material,
            ],
            201,
        );
    }

    // Show a single material
    public function show($id)
    {
        $material = Material::find($id);

        if (!$material) {
            return response()->json(
                [
                    'statusCode' => 404,
                    'message' => 'Material not found',
                    'data' => null,
                ],
                404,
            );
        }

        // Ambil user yang sedang login
        $user = Auth::user();

        // Ambil learning_path_id dari Material terkait
        $learningPathId = $material->learning_path_id;

        // Ambil user_learning_path_id berdasarkan user dan learning_path_id
        $userLearningPath = UserLearningPath::where('user_id', $user->id)
            ->where('learning_path_id', $learningPathId)
            ->first();

        // Tambahkan user_learning_path_id sebagai properti tambahan ke Material
        $material->user_learning_path_id = $userLearningPath ? $userLearningPath->id : null;

        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'Material retrieved successfully',
                'data' => $material,
            ],
            200,
        );
    }

    // Update a material
    public function update(Request $request, $id)
    {
        $material = Material::find($id);
        if (!$material) {
            return response()->json(
                [
                    'statusCode' => 404,
                    'message' => 'Material not found',
                    'data' => null,
                ],
                404,
            );
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'material_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'material_text' => 'required|string',
        ]);

        // Cek jika ada file material_image
        if ($request->hasFile('material_image')) {
            $imageName = time() . '_' . $request->file('material_image')->getClientOriginalName();
            $imagePath = $request->file('material_image')->storeAs('materials/images', $imageName, 'public');
            $validated['material_image'] = 'public/' . $imagePath; // Simpan path file
        }

        $material->update($validated);
        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'Material updated successfully',
                'data' => $material,
            ],
            200,
        );
    }

    // Delete a material
    public function destroy($id)
    {
        $material = Material::find($id);
        if (!$material) {
            return response()->json(
                [
                    'statusCode' => 404,
                    'message' => 'Material not found',
                    'data' => null,
                ],
                404,
            );
        }

        $material->delete();
        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'Material deleted successfully',
                'data' => null,
            ],
            200,
        );
    }

    public function submitMaterial($materialId)
    {
        $user = auth()->user();

        // Ambil UserLearningPath berdasarkan user dan materialId
        $userLearningPath = UserLearningPath::where('user_id', $user->id)
            ->whereHas('userMaterials', function ($query) use ($materialId) {
                $query->where('material_id', $materialId);
            })
            ->first();

        // Cek apakah UserLearningPath ditemukan
        if (!$userLearningPath) {
            return response()->json(
                [
                    'statusCode' => 404,
                    'message' => 'User learning path not found for the given material',
                    'data' => null,
                ],
                404,
            );
        }

        // Ambil UserMaterial berdasarkan userLearningPath dan materialId
        $userMaterial = UserMaterial::where('user_learning_path_id', $userLearningPath->id)
            ->where('material_id', $materialId)
            ->first();

        // Cek apakah UserMaterial ditemukan
        if (!$userMaterial) {
            return response()->json(
                [
                    'statusCode' => 404,
                    'message' => 'User material not found',
                    'data' => null,
                ],
                404,
            );
        }

        // Jika material sudah selesai
        if ($userMaterial->is_completed) {
            return response()->json(
                [
                    'statusCode' => 200,
                    'message' => 'Material already completed',
                    'data' => $userMaterial,
                ],
                200,
            );
        }

        // Update is_completed menjadi true
        $userMaterial->update(['is_completed' => true]);

        // Tambahkan EXP ke user
        $earnedExp = 100; // Misalnya setiap materi memberikan 100 EXP
        $user->exp += $earnedExp;

        // Tentukan level dan league baru user berdasarkan EXP yang baru
        $user->level = User::determineLevel($user->exp);
        $user->league = User::determineLeague($user->exp);

        // Simpan perubahan EXP, level, dan league
        $user->save();

        // Unlock next material jika tersedia
        $nextMaterial = Material::where('learning_path_id', $userLearningPath->learning_path_id)
            ->where('id', '>', $materialId)
            ->orderBy('id')
            ->first();

        if ($nextMaterial) {
            // Cek UserMaterial berikutnya
            $nextUserMaterial = UserMaterial::where('user_learning_path_id', $userLearningPath->id)
                ->where('material_id', $nextMaterial->id)
                ->first();

            if ($nextUserMaterial) {
                // Update is_unlocked menjadi true
                $nextUserMaterial->update(['is_unlocked' => true]);
            }
        } else {
            // Jika tidak ada next material, unlock quiz pertama jika ada
            $firstQuiz = Quiz::where('learning_path_id', $userLearningPath->learning_path_id)
                ->orderBy('id')
                ->first();

            if ($firstQuiz) {
                // Cek apakah quiz sudah ada, jika belum buat dan set is_unlocked ke true
                $userQuiz = UserQuiz::firstOrCreate(
                    [
                        'user_learning_path_id' => $userLearningPath->id,
                        'quiz_id' => $firstQuiz->id, // UUID digunakan di sini
                    ],
                    [
                        'is_unlocked' => true,
                    ],
                );

                // Pastikan is_unlocked menjadi true jika UserQuiz sudah ada dan belum di-unlock
                if (!$userQuiz->wasRecentlyCreated && !$userQuiz->is_unlocked) {
                    $userQuiz->update(['is_unlocked' => true]);
                }
            }
        }

        return response()->json(
            [
                'statusCode' => 200,
                'message' => 'Material marked as completed, EXP added, and next material or quiz unlocked',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'exp' => $user->exp,
                        'level' => $user->level,
                        'league' => $user->league,
                    ],
                    'userMaterial' => $userMaterial,
                    'userQuiz' => $userQuiz ?? null,
                ],
            ],
            200,
        );
    }
}
