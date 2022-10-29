<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateGroupRequest;
use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Models\GroupTask;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect as Redirect;

class GroupTaskController extends Controller
{
    public function create(CreateGroupRequest $request)
    {
        $validated = $request->validated();

        $order = $request->user()->groups()->whereDate('date', $request->ref_date)->max('order') + 1;

        $group = new GroupTask(['title' => $validated['title']]);
        $group->date = $validated['ref_date'];
        $group->order = $order;

        $request->user()->groups()->save($group);
        // $group->user_id = $request->user()->id;
        $group->save();

        return back();
    }

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
