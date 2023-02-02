<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\AuthController as Auth;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::match(['post','get'],'/login',[Auth::class,'login'])->name('login');

Route::middleware(['auth'])->group(function(){
    Route::get('/')->name('dashboard');
});