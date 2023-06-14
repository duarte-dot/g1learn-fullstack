<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Category;
use App\Models\Comment;


class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'category_id',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    public function user() {
      return $this->belongsTo(User::class);
    }

    public function category() {
      return $this->belongsTo(Category::class);
    }

    public function comments() {
      return $this->hasMany(Comment::class);
    }
}
