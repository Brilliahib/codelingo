<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Quiz extends Model
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

    public function learningPath()
    {
        return $this->belongsTo(LearningPath::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class, 'quiz_id', 'id');
    }

    public function userQuizzes()
    {
        return $this->hasMany(UserQuiz::class);
    }

    protected static function booted()
    {
        static::created(function ($quiz) {
            $learningPathId = $quiz->learning_path_id;

            $userLearningPaths = UserLearningPath::where('learning_path_id', $learningPathId)->get();

            foreach ($userLearningPaths as $userLearningPath) {
                UserQuiz::create([
                    'user_learning_path_id' => $userLearningPath->id,
                    'quiz_id' => $quiz->id,
                    'is_unlocked' => false,
                ]);
            }
        });
    }
}
