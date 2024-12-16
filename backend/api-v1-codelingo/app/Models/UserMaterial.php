<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class UserMaterial extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    public function userLearningPath()
    {
        return $this->belongsTo(UserLearningPath::class);
    }

    public function material()
    {
        return $this->belongsTo(Material::class);
    }

    public static function unlockNextMaterial(UserLearningPath $userLearningPath, Material $currentMaterial)
    {
        $nextMaterial = Material::where('learning_path_id', $currentMaterial->learning_path_id)
            ->where('order', '>', $currentMaterial->order)
            ->orderBy('order')
            ->first();

        if ($nextMaterial) {
            self::create([
                'user_learning_path_id' => $userLearningPath->id,
                'material_id' => $nextMaterial->id,
                'is_unlocked' => true,
            ]);
        }
    }

    protected static function booted()
    {
        static::updated(function ($userMaterial) {
            if ($userMaterial->is_completed) {
                $learningPathId = $userMaterial->material->learningPath->id;
                $allMaterialsCompleted = UserMaterial::where('user_learning_path_id', $userMaterial->user_learning_path_id)
                    ->where('is_completed', false)
                    ->doesntExist(); 

                if ($allMaterialsCompleted) {
                    $firstQuiz = Quiz::where('learning_path_id', $learningPathId)->orderBy('id')->first();

                    if ($firstQuiz) {
                        UserQuiz::firstOrCreate(
                            [
                                'user_learning_path_id' => $userMaterial->user_learning_path_id,
                                'quiz_id' => $firstQuiz->id,
                            ],
                            [
                                'is_unlocked' => true,
                            ],
                        );
                    }
                }
            }
        });
    }
}
