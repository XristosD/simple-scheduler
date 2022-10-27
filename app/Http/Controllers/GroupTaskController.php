<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateGroupRequest;
use App\Models\GroupTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect as Redirect;


class GroupTaskController extends Controller
{
    public function update(UpdateGroupRequest $request, GroupTask $group)
    {
        $group->update($request->safe()->only(['title']));
        return back();
    }
}
