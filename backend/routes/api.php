<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;


Route::get('/status', [UserController::class, 'status']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/users', [UserController::class, 'list']);
Route::get('/users/{id}', [UserController::class, 'select']);
Route::post('/users', [UserController::class, 'add']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'delete']);

Route::group(['middleware' => ['auth:sanctum']], function () {
  Route::post('/logout', [AuthController::class, 'logout']);
    
  Route::get('/categories', [CategoryController::class, 'list']);
  Route::get('/categories/{id}', [CategoryController::class, 'select']);
  Route::post('/categories', [CategoryController::class, 'add']);
  Route::put('/categories/{id}', [CategoryController::class, 'update']);
  Route::delete('/categories/{id}', [CategoryController::class, 'delete']);

  Route::get('/posts', [PostController::class, 'list']);
  Route::get('/posts/{id}', [PostController::class, 'select']);
  Route::post('/posts', [PostController::class, 'add']);
  Route::put('/posts/{id}', [PostController::class, 'update']);
  Route::delete('/posts/{id}', [PostController::class, 'delete']);
});
