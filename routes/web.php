<?php

use App\Http\Controllers\GroupTaskController;
use App\Http\Controllers\SchedulerController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/scheduler/{date?}', [SchedulerController::class, 'index'])->middleware(['auth', 'verified'])->name('scheduler');

Route::prefix('/groups')->name('group.')->controller(GroupTaskController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::post('/', 'create')->name('create')->middleware('can:create,App\Models\GroupTask');
    Route::put('/{group}', 'update')->name('update')->middleware('can:update,group');
    Route::post('/newtask/{group}', 'newTask')->name('newtask')->middleware('can:update,group');
});

Route::prefix('/tasks')->name('task.')->controller(TaskController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::put('/{task}', 'update')->name('update')->middleware('can:update,task');
    Route::post('/{task}/open', 'setOpen')->name('setOpen')->middleware('can:update,task');
    Route::delete('/{task}', 'delete')->name('delete')->middleware('can:update,task');
});

require __DIR__ . '/auth.php';
