<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BannerHomeImageController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VisitController;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\ManagerMiddleware;
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

    //home
    Route::post('/hit', [VisitController::class, 'hit']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::post('/orders/details', [OrderDetailController::class, 'store']);
    Route::post('/profile', [ProfileController::class, 'store']);
    /**
     * Admin
     */
    Route::middleware([JwtMiddleware::class, AdminMiddleware::class])->group(function () {
        //user
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::put('/users/{id}', [UserController::class, 'update']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);
        Route::get('/users/paging/limit={limit}', [UserController::class, 'usePaging']);
        Route::get('/users/show/{id}', [UserController::class, 'show']);

        //profile
        Route::get('/profile/limit={limit}', [ProfileController::class, 'index']);
        Route::delete('profile/{id}', [ProfileController::class, 'destroy']);
        Route::get('profile/{id}', [ProfileController::class , 'show']);
        Route::put('profile/{id}', [ProfileController::class, 'update']);
    });

    /**
     * MANAGER
     */
    Route::middleware([JwtMiddleware::class, ManagerMiddleware::class])->group(function (){
        //category
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::get('/categories/{category}', [CategoryController::class, 'show']);
        Route::put('/categories/{category}', [CategoryController::class, 'update']);
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

        //product
        Route::post('/products', [ProductController::class, 'store']);
        Route::get('/products/{product}', [ProductController::class, 'show']);
        Route::put('/products/{product}', [ProductController::class, 'update']);
        Route::delete('/products/{product}', [ProductController::class, 'destroy']);

        // Orders
        Route::get('/orders', [OrderController::class, 'index']);
        Route::get('/orders/{order}', [OrderController::class, 'show']);
        Route::put('/orders/{order}', [OrderController::class, 'update']);
        Route::delete('/orders/{order}', [OrderController::class, 'destroy']);

        // Order details
        Route::get('/orders/{orderId}/details', [OrderDetailController::class, 'index']);
        Route::get('/order-details/{orderDetail}', [OrderDetailController::class, 'show']);
        Route::put('/order-details/{orderDetail}', [OrderDetailController::class, 'update']);
        Route::delete('/order-details/{orderDetail}', [OrderDetailController::class, 'destroy']);

        Route::apiResource('banner-home-images', BannerHomeImageController::class);
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
