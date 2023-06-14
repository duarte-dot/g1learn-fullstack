<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
  public function list() {
    $comments = Comment::with(['post', 'user'])->get();

    $formattedComments = $comments->map(function ($comment) {
        return [
            'id' => $comment->id,
            'user' => $comment->user->name,
            'post_id' => $comment->post->id,
            'content' => $comment->content,
            'created_at' => $comment->created_at,
            'updated_at' => $comment->updated_at
        ];
    });

    return $formattedComments;
  }

  public function select($id) {
    $comment = Comment::find($id);

    if (!$comment) {
      return ['retorno' => 'erro', 'mensagem' => 'Comentário não existe'];
    }
  
    return $comment;
  }

  public function add(Request $request) {
    try {
        $user = auth()->user();
        $comment = new Comment();

        $comment->content = $request->content;
        $comment->post_id = $request->post_id;

        $user->comments()->save($comment);

        return [
            'retorno' => 'Comentário criado!',
            'comentário' => [
                'content' => $comment->content,
            ]
        ];
    } catch(\Exception $erro) {
        return ['retorno' => 'erro', 'details' => $erro];
    }
  }

  public function addCommentToPost(Request $request, $post_id) {
    try {
        $user = auth()->user();
        $comment = new Comment();
        
        $comment->content = $request->content;
        $comment->post_id = $post_id;

        $user->comments()->save($comment);

        return [
            'retorno' => 'Comentário criado!',
            'comentário' => [
                'content' => $comment->content,
            ]
        ];
    } catch(\Exception $erro) {
        return ['retorno' => 'erro', 'details' => $erro];
    }
}

  public function listByPost($post_id) {
    $comments = Comment::with(['post', 'user'])
        ->where('post_id', $post_id)
        ->get();

    $formattedComments = $comments->map(function ($comment) {
        return [
            'id' => $comment->id,
            'user' => $comment->user->name,
            'post_id' => $comment->post->id,
            'content' => $comment->content,
            'created_at' => $comment->created_at,
            'updated_at' => $comment->updated_at
        ];
    });

    return $formattedComments;
  }

  public function updateComment(Request $request, $id) {
    try {
        $user = auth()->user();
        $comment = Comment::findOrFail($id);

        $comment->content = $request->content;
        $comment->save();

        return [
            'retorno' => 'Comentário atualizado!',
            'comentário' => [
                'id' => $comment->id,
                'user' => $comment->user->name,
                'post_id' => $comment->post->id,
                'content' => $comment->content,
                'created_at' => $comment->created_at,
                'updated_at' => $comment->updated_at
            ]
        ];
    } catch(\Exception $erro) {
        return ['retorno' => 'erro', 'details' => $erro];
    }
  }

  public function deleteComment($id) {
    try {
        $user = auth()->user();
        $comment = Comment::find($id);

        if (!$comment) {
            return ['retorno' => 'erro', 'mensagem' => 'Comentário não existe'];
        }

        $comment->delete();

        return ['retorno' => 'Comentário excluído com sucesso'];
    } catch (\Exception $erro) {
        return ['retorno' => 'erro', 'details' => $erro];
    }
  }
}
