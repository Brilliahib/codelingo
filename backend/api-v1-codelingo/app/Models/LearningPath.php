<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;  // Untuk membuat UUID

class LearningPath extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = ['id'];

    protected static function booted()
    {
        static::creating(function ($learningPath) {
            if (empty($learningPath->id)) {
                $learningPath->id = (string) Str::uuid();  
            }
        });

        static::created(function ($learningPath) {
            $users = User::all();

            foreach ($users as $user) {
                UserLearningPath::create([
                    'user_id' => $user->id,
                    'learning_path_id' => $learningPath->id,
                ]);
            }
        });
    }

    public function materials()
    {
        return $this->hasMany(Material::class);
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }

    public function userLearningPaths()
    {
        return $this->hasMany(UserLearningPath::class);
    }
}
