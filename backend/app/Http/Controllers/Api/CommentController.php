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
                'user_id' => $comment->user->id,
                'post_id' => $comment->post->id,
                'content' => $comment->content,
                'created_at' => $comment->created_at,
                'updated_at' => $comment->updated_at
            ];
        });

        return $formattedComments;
    }

    public function select($id) {
    $comment = Comment::with(['post', 'user'])->find($id);

    if (!$comment) {
        return response()->json(['retorno' => 'erro', 'mensagem' => 'Comentário não existe']);
    }

    $formattedComment = [
        'id' => $comment->id,
        'user' => $comment->user->name,
        'user_id' => $comment->user->id,
        'post_id' => $comment->post->id,
        'content' => $comment->content,
        'created_at' => $comment->created_at,
        'updated_at' => $comment->updated_at
    ];

    return $formattedComment;
}

    public function add(Request $request)
    {
        try {
            $user = auth()->user();
            $comment = $user->comments()->create([
                'content' => $request->content,
                'post_id' => $request->post_id
            ]);

            return response()->json([
                'retorno' => 'Comentário criado!',
                'comentário' => [
                    'content' => $comment->content,
                ]
            ]);
        } catch (\Exception $error) {
            return response()->json(['retorno' => 'erro', 'details' => $error->getMessage()]);
        }
    }

    public function addCommentToPost(Request $request, $post_id)
    {
        try {
            $user = auth()->user();
            $comment = $user->comments()->create([
                'content' => $request->content,
                'post_id' => $post_id
            ]);

            return response()->json([
                'retorno' => 'Comentário criado!',
                'comentário' => [
                    'content' => $comment->content,
                ]
            ]);
        } catch (\Exception $error) {
            return response()->json(['retorno' => 'erro', 'details' => $error->getMessage()]);
        }
    }

    public function listByPost($post_id)
    {
        $comments = Comment::with(['post', 'user'])
            ->where('post_id', $post_id)
            ->get();

        $formattedComments = $comments->map(function ($comment) {
            return [
                'id' => $comment->id,
                'user' => $comment->user->name,
                'user_id' => $comment->user->id,
                'post_id' => $comment->post->id,
                'content' => $comment->content,
                'created_at' => $comment->created_at,
                'updated_at' => $comment->updated_at
            ];
        });

        return $formattedComments;
    }

    public function updateComment(Request $request, $id)
    {
        try {
            $user = auth()->user();
            $comment = Comment::find($id);

            if (!$comment) {
                return response()->json(['retorno' => 'erro', 'mensagem' => 'Comentário não existe']);
            }

            if ($comment->user_id !== $user->id) {
                return response()->json(['retorno' => 'erro', 'mensagem' => 'Você não tem permissão para editar este comentário']);
            }

            $comment->content = $request->content;
            $comment->save();

            return response()->json([
                'retorno' => 'Comentário atualizado!',
                'comentário' => [
                    'id' => $comment->id,
                    'user' => $comment->user->name,
                    'post_id' => $comment->post->id,
                    'content' => $comment->content,
                    'created_at' => $comment->created_at,
                    'updated_at' => $comment->updated_at
                ]
            ]);
        } catch (\Exception $error) {
            return response()->json(['retorno' => 'erro', 'details' => $error->getMessage()]);
        }
    }

    public function deleteComment($id)
    {
        try {
            $user = auth()->user();
            $comment = Comment::find($id);

            if (!$comment) {
                return response()->json(['retorno' => 'erro', 'mensagem' => 'Comentário não existe']);
            }

            if ($comment->user_id !== $user->id) {
                return response()->json(['retorno' => 'erro', 'mensagem' => 'Você não tem permissão para excluir este comentário']);
            }

            $comment->delete();

            return response()->json(['retorno' => 'Comentário excluído com sucesso']);
        } catch (\Exception $error) {
            return response()->json(['retorno' => 'erro', 'details' => $error->getMessage()]);
        }
    }
}
