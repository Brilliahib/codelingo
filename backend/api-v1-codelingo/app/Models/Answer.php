<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Answer extends Model
{
    use HasFactory;
    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = ['id'];

    protected static function booted()
    {
        static::creating(function ($question) {
            if (empty($question->id)) {
                $question->id = (string) Str::uuid(); 
            }
        });
    }

    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id', 'id');
    }
}
