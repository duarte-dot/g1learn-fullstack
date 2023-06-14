<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\AuthController;

Route::get('/status', [UserController::class, 'status']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/users', [UserController::class, 'add']);

Route::get('/users', [UserController::class, 'list']);

Route::get('/users/{id}', [UserController::class, 'select']);

Route::put('/users/{id}', [UserController::class, 'update']);

Route::delete('/users/{id}', [UserController::class, 'delete']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/posts', [PostController::class, 'add']);
    Route::get('/posts', [PostController::class, 'list']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
