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
        // dd($validated);
        $task->update($validated);
        return back();
    }

    public function setOpen(Request $request, Task $task)
    {
        $validated = $request->validate([
            'open' => 'required|boolean',
        ]);
        $task->open = $validated['open'];
        $task->save();

        return back();
    }

    public function delete(Request $request, Task $task)
    {
        $task->delete();

        return back();
    }
}
