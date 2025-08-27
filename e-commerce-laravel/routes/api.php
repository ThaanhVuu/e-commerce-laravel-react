<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;

Route::prefix('v1.0')->group(function () {
    /**
     * Public
     */
    // auth
    Route::post('/signup', [AuthController::class, 'signUp']);
    Route::post('/signin', [AuthController::class, 'signIn']);
    Route::get('/verify/{token}', [AuthController::class, 'handleVerificationEmail']);
    Route::post('/forgetpassword', [AuthController::class, 'forgetPassword']);
    Route::get('/resetpassword/{token}', [AuthController::class, 'resetPassword']);

    /**
     * Admin
     */
    Route::middleware([JwtMiddleware::class, AdminMiddleware::class])->group(function () {
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::put('/users/{id}', [UserController::class, 'update']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);
    });

    /**
     * All user
     */
    Route::middleware([JwtMiddleware::class])->group(function () {
        // auth
        Route::post('/signout', [AuthController::class, 'signOut']);
        // user
        Route::get('/me', [UserController::class, 'profile']);
    });
});
