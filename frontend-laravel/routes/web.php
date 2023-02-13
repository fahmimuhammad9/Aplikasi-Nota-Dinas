<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController as Auth;
use App\Http\Controllers\DashboardController as Dashboard;
use App\Http\Controllers\DivisionController as Division;
use App\Http\Controllers\NodinController as Nodin;
use App\Http\Controllers\SettingController as Setting;
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

Route::match(['get','post'],'/login',[Auth::class,'login'])->name('login');
// Contoh penggunaan middleware auth_guest
// Route::middleware(['auth_guest'])->group(function(){
//     Route::match(['get','post'],'/login',[AuthController::class,'login'])->name('login');
//     Route::match(['get','post'],'/register',[AuthController::class,'register'])->name('register');
// });

Route::post('/login',[Auth::class,'login'])->name('login');
// Contoh penggunaan middleware auth_admin
Route::middleware(['auth_admin'])->group(function(){
    Route::get('/', function () {
        return view('welcome');
    }); 

    Route::get('/setting/user',[Setting::class,'userSetting'])->name('setting-user');
    Route::match(['get','post'],'/setting/add/user',[Setting::class,'addUser'])->name('setting-user-add');
    Route::get('/setting/organization',[Setting::class,'orgSetting'])->name('setting-org');
    Route::get('/setting/detail/organization/{id}',[Setting::class,'orgDetail'])->name('setting-org-detail');

    Route::get('/dashboard',[Dashboard::class, 'index'])->name('dashboard');
    Route::get('/logout',[Auth::class, 'logout'])->name('logout');

    Route::get('/division',[Division::class,'index'])->name('division-all');
    Route::get('/division/my-division',[Division::class,'mine'])->name('division-mine');
    Route::get('/division/stat-division',[Division::class,'status'])->name('division-status');

    Route::get('/nodin/nodin-draft',[Nodin::class,'draft'])->name('nodin-draft');
    Route::get('/nodin/nodin-progress',[Nodin::class,'progress'])->name('nodin-progress');
    Route::get('/nodin/nodin-tagged',[Nodin::class,'tagged'])->name('nodin-tagged');
    Route::get('/nodin',[Nodin::class,'findAll'])->name('nodin-all');
    Route::match(['GET', 'POST'], '/nodin/nodin-create',[Nodin::class,'create'])->name('nodin-create');
    Route::get('/nodin/nodin-detail/{id}',[Nodin::class,'detail'])->name('nodin-detail');
});