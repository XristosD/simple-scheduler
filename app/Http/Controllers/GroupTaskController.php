<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Models\GroupTask;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect as Redirect;


class GroupTaskController extends Controller
{
    public function update(UpdateGroupRequest $request, GroupTask $group)
    {
        $group->update($request->safe()->only(['title']));
        return back();
    }

    public function newTask(CreateTaskRequest $request, GroupTask $group)
    {
        $order = $group->tasks()->max('order') + 1;
        $task = new Task($request->validated());
        $task->order = $order;
        $group->tasks()->save($task);
        return back();
    }
}
