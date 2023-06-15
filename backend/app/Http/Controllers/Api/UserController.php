<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function status()
    {
        return response()->json(['status' => 'ok']);
    }

    public function add(Request $request)
    {
        try {
            $user = new User();

            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));

            $user->save();

            return response()->json(['retorno' => 'ok']);
        } catch (\Exception $error) {
            return response()->json(['retorno' => 'erro', 'details' => $error->getMessage()]);
        }
    }

    public function list()
    {
        $users = User::all(['name', 'email']);

        return $users;
    }

    public function select($id)
    {
        $user = User::find($id, ['name', 'email']);

        if (!$user) {
            return response()->json(['retorno' => 'erro', 'mensagem' => 'Usuário não existe']);
        }

        return $user;
    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json(['retorno' => 'erro', 'mensagem' => 'Usuário não existe']);
            }

            if (!Hash::check($request->input('password'), $user->password)) {
                return response()->json(['retorno' => 'erro', 'mensagem' => 'Senha incorreta']);
            }

            $user->name = $request->input('name');
            $user->email = $request->input('email');

            $user->save();

            return response()->json(['retorno' => 'Usuário atualizado!', 'updated_data' => $request->only('name', 'email')]);
        } catch (\Exception $error) {
            return response()->json(['retorno' => 'erro', 'details' => $error->getMessage()]);
        }
    }

    public function delete($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json(['retorno' => 'erro', 'mensagem' => 'Usuário não existe']);
            }

            $user->delete();

            return response()->json(['retorno' => 'Usuário deletado']);
        } catch (\Exception $error) {
            return response()->json(['retorno' => 'erro', 'details' => $error->getMessage()]);
        }
    }
}
