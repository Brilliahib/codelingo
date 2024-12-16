<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;  // Untuk membuat UUID

class Material extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = ['id'];

    protected static function booted()
    {
        static::creating(function ($material) {
            if (empty($material->id)) {
                $material->id = (string) Str::uuid(); 
            }
        });

        static::created(function ($material) {
            $learningPathId = $material->learning_path_id;

            $userLearningPaths = UserLearningPath::where('learning_path_id', $learningPathId)->get();

            foreach ($userLearningPaths as $userLearningPath) {
                $isFirstMaterial = !UserMaterial::where('user_learning_path_id', $userLearningPath->id)->exists();

                $allMaterialsCompleted = UserMaterial::where('user_learning_path_id', $userLearningPath->id)
                    ->where('is_completed', false)
                    ->doesntExist();

                $isUnlocked = $isFirstMaterial || $allMaterialsCompleted;

                UserMaterial::create([
                    'user_learning_path_id' => $userLearningPath->id,
                    'material_id' => $material->id,
                    'is_completed' => false,
                    'is_unlocked' => $isUnlocked,
                ]);
            }
        });
    }

    public function learningPath()
    {
        return $this->belongsTo(LearningPath::class);
    }

    public function sections()
    {
        return $this->hasMany(Section::class)->orderBy('order');
    }

    public function userMaterials()
    {
        return $this->hasMany(UserMaterial::class);
    }
}
