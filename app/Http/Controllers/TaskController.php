<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class TaskController extends Controller
{
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $validated = $request->validated();
        $task->update($validated);
        return back();
    }
}
