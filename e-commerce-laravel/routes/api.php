<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\CorsMiddleware;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Middleware\RoleMiddleware;

Route::middleware([CorsMiddleware::class])->group(function (){
    //auth
    Route::post('/signin', [AuthController::class, 'signIn']);
    Route::post('/signout', [AuthController::class, 'signOut'])->middleware(JwtMiddleware::class);
    Route::get('/me', [AuthController::class, 'me'])->middleware(JwtMiddleware::class);
    Route::get('/verify/{token}', [AuthController::class, 'verifyEmailAndCreateUser'])
        ->where('token', '.*'); // allow tất cả ký tự
    Route::post('/register', [AuthController::class, 'register']);

//user, chỉ admin mới được truy cập
    Route::middleware([JwtMiddleware::class, RoleMiddleware::class.':ADMIN'])->group(function (){
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::get('/users/{id}', [UserController::class, 'show']);
        Route::put('/users/{id}', [UserController::class, 'update']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);
    });
});

Route::options('{any}', function () {
    return response()->json([], 200);
})->where('any', '.*');

