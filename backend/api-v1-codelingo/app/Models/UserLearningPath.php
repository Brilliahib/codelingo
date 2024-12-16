<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLearningPath extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function learningPath()
    {
        return $this->belongsTo(LearningPath::class);
    }

    public function userMaterials()
    {
        return $this->hasMany(UserMaterial::class);
    }

    public function userQuizzes()
    {
        return $this->hasMany(UserQuiz::class);
    }
}
