<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and are assigned to the
| "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rota corrigida
Route::get('/status', [UserController::class, 'status']);

Route::group(['namespace' => 'Api'], function(){
  Route::post('/users', [UserController::class, 'add']);

  Route::get('/users', [UserController::class, 'list']);

  Route::get('/users/{id}', [UserController::class, 'select']);

  Route::put('/users/{id}', [UserController::class, 'update']);

  Route::delete('/users/{id}', [UserController::class, 'delete']);
});