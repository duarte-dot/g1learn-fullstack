<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;

class PostController extends Controller
{
    public function list(Request $request)
    {
        $category_id = $request->input('category_id');

        $postsQuery = Post::with(['category', 'user']);

        if ($category_id) {
            $postsQuery->where('category_id', $category_id);
        }

        $posts = $postsQuery->get();

        $formattedPosts = $posts->map(function ($post) {
            return [
                'id' => $post->id,
                'user' => $post->user->name,
                'category' => $post->category->name,
                'title' => $post->title,
                'content' => $post->content,
                'created_at' => $post->created_at,
                'updated_at' => $post->updated_at
            ];
        });

        return $formattedPosts;
    }

    public function select($id)
    {
        $post = Post::with(['category', 'user'])->find($id);

        if (!$post) {
            return response()->json(['retorno' => 'erro', 'mensagem' => 'Post não existe']);
        }

        $formattedPost = [
            'id' => $post->id,
            'user_id' => $post->user->id,
            'user' => $post->user->name,
            'category' => $post->category->name,
            'title' => $post->title,
            'content' => $post->content,
            'created_at' => $post->created_at,
            'updated_at' => $post->updated_at
        ];

        return $formattedPost;
    }

    public function add(Request $request)
    {
        try {
            $user = auth()->user();
            $post = new Post();

            $post->title = $request->title;
            $post->content = $request->content;
            $post->category_id = $request->category_id;

            $user->posts()->save($post);

            $post->load('category');

            $formattedPost = [
                'id' => $post->id,
                'user' => $post->user->name,
                'category' => $post->category->name,
                'title' => $post->title,
                'content' => $post->content,
                'created_at' => $post->created_at,
                'updated_at' => $post->updated_at
            ];

            return response()->json(['retorno' => 'Post criado!', 'post' => $formattedPost]);
        } catch (\Exception $error) {
            return response()->json(['retorno' => 'erro', 'details' => $error->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $post = Post::with(['user', 'category'])->find($id);

            if (!$post) {
                return response()->json(['retorno' => 'erro', 'mensagem' => 'Post não existe']);
            }

            $user = auth()->user();
            if ($post->user_id !== $user->id) {
                return response()->json(['retorno' => 'erro', 'mensagem' => 'Você não tem permissão para editar este post']);
            }

            $post->title = $request->title;
            $post->content = $request->content;
            $post->category_id = $request->category_id;

            $post->save();

            $post->refresh();

            $formattedPost = [
                'id' => $post->id,
                'user' => $post->user->name,
                'category' => $post->category->name,
                'title' => $post->title,
                'content' => $post->content,
                'created_at' => $post->created_at,
                'updated_at' => $post->updated_at
            ];

            return response()->json(['retorno' => 'Post atualizado!', 'updated_data' => $formattedPost]);
        } catch (\Exception $error) {
            return response()->json(['retorno' => 'erro', 'details' => $error->getMessage()]);
        }
    }

    public function delete($id)
    {
        try {
            $post = Post::find($id);

            if (!$post) {
                return response()->json(['retorno' => 'erro', 'mensagem' => 'Post não existe']);
            }

            $user = auth()->user();
            if ($post->user_id !== $user->id) {
                return response()->json(['retorno' => 'erro', 'mensagem' => 'Você não tem permissão para deletar este post']);
            }

            $post->delete();

            return response()->json(['retorno' => 'Post deletado']);
        } catch (\Exception $error) {
            return response()->json(['retorno' => 'erro', 'details' => $error->getMessage()]);
        }
    }
}
