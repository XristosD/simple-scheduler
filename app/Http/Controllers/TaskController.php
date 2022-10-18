<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class TaskController extends Controller
{
    public function update(Request $request, Task $task)
    {
        $task->title = $request->title;
        $task->open = $request->open;
        $task->save();
        return Redirect::route('scheduler');
    }
}
