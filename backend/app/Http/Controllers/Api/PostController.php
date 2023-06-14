<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;

class PostController extends Controller
{
  public function list() {
    $post = Post::all();
    
    return $post;
  }

  public function add(Request $request) {
    try {
      if (!auth()->check()) {
        return ['retorno' => 'erro', 'mensagem' => 'Usuário não autenticado'];
    }

    $user = auth()->user();
    $post = new Post();

    $post->title = $request->title;
    $post->content = $request->content;

    $user->posts()->save($post);

    return ['retorno' => 'Post criado!', 'post' => $request->only('title', 'content')];
    } catch(\Exception $erro) {
      return ['retorno'=>'erro', 'details'=>$erro];
    }
  }
}
