<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller {
  public function status() {
    return ['status' => 'ok'];
  }

  public function add(Request $request) {
    try {
      $user = new User();

      $user->name= $request->name;
      $user->email= $request->email;
      $user->password= $request->password;

      $user->save();

      return ['retorno'=>'ok'];
    } catch(\Exception $erro) {
      return ['retorno'=>'erro', 'details'=>$erro];
    }
  }

  public function list() {
    $user = User::all('name', 'email');
    
    return $user;
  }

  public function select($id) {
    $user = User::find($id, ['name', 'email']);

    if (!$user) {
      return ['retorno' => 'erro', 'mensagem' => 'Usuário não existe'];
    }
  
    return $user;
  }

  public function update(Request $request, $id) {
    try {
      $user = User::find($id);

      // Verificar se o usuário existe
      if (!$user) {
          return ['retorno' => 'erro', 'mensagem' => 'Usuário não existe'];
      }

      // Verificar se a senha fornecida está correta
      if (!Hash::check($request->password, $user->password)) {
          return ['retorno' => 'erro', 'mensagem' => 'Senha incorreta'];
      }

      $user->name = $request->name;
      $user->email = $request->email;

      $user->save();

      return ['retorno' => 'Usuário atualizado!', 'updated_data' => $request->only('name', 'email')];
    } catch (\Exception $erro) {
      return ['retorno' => 'erro', 'details' => $erro];
    }
  }

  public function delete($id) {
    try {
      $user = User::find($id);

      if (!$user) {
        return ['retorno' => 'erro', 'mensagem' => 'Usuário não existe'];
      }

      $user->delete();

      return ['retorno' => 'Usuário deletado'];
    } catch (\Exception $erro) {
      return ['retorno' => 'erro', 'details' => $erro];
    }
  }
}
