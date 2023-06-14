<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
  public function list() {
    $category = Category::all();
    
    return $category;
  }

  public function select($id) {
    $category = Category::find($id, 'name');

    if (!$category) {
      return ['retorno' => 'erro', 'mensagem' => 'Categoria não existe'];
    }
  
    return $category;
  }

  public function add(Request $request) {
    try {
    $category = new Category();

    $category->name = $request->name;

    $category->save();

    return ['retorno' => 'Categoria criada!', 'categoria' => $category];
    } catch(\Exception $erro) {
      return ['retorno'=>'erro', 'details'=>$erro];
    }
  }

  public function update(Request $request, $id) {
    try {
      $category = Category::find($id);

      // Verificar se o usuário existe
      if (!$category) {
          return ['retorno' => 'erro', 'mensagem' => 'Categoria não existe'];
      }

      $category->name = $request->name;

      $category->save();

      return ['retorno' => 'Categoria atualizada!', 'updated_data' => $request->only('name')];
    } catch (\Exception $erro) {
      return ['retorno' => 'erro', 'details' => $erro];
    }
  }

  public function delete($id) {
    try {
      $category = Category::find($id);

      if (!$category) {
        return ['retorno' => 'erro', 'mensagem' => 'Categoria não existe'];
      }

      $category->delete();

      return ['retorno' => 'Categoria deletada'];
    } catch (\Exception $erro) {
      return ['retorno' => 'erro', 'details' => $erro];
    }
  }
}
