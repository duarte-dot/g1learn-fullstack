<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function list()
    {
        $categories = Category::all();

        return $categories;
    }

    public function select($id)
    {
        $category = Category::find($id, 'name');

        if (!$category) {
            return response()->json(['retorno' => 'erro', 'mensagem' => 'Categoria não existe']);
        }

        return $category;
    }

    public function add(Request $request)
    {
        try {
            $category = Category::create([
                'name' => $request->name,
            ]);

            return response()->json(['retorno' => 'Categoria criada!', 'categoria' => $category]);
        } catch (\Exception $error) {
            return response()->json(['retorno' => 'erro', 'details' => $error->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $category = Category::find($id);

            if (!$category) {
                return response()->json(['retorno' => 'erro', 'mensagem' => 'Categoria não existe']);
            }

            $category->name = $request->name;
            $category->save();

            return response()->json(['retorno' => 'Categoria atualizada!', 'updated_data' => $request->only('name')]);
        } catch (\Exception $error) {
            return response()->json(['retorno' => 'erro', 'details' => $error->getMessage()]);
        }
    }

    public function delete($id)
    {
        try {
            $category = Category::find($id);

            if (!$category) {
                return response()->json(['retorno' => 'erro', 'mensagem' => 'Categoria não existe']);
            }

            $category->delete();

            return response()->json(['retorno' => 'Categoria deletada']);
        } catch (\Exception $error) {
            return response()->json(['retorno' => 'erro', 'details' => $error->getMessage()]);
        }
    }
}
