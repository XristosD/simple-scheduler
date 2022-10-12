<?php

namespace App\Http\Controllers;

use App\Models\GroupTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect as Redirect;


class GroupTaskController extends Controller
{
    public function update(Request $request, GroupTask $group)
    {
        $group->title = $request->title;
        $group->save();
        return Redirect::route('scheduler');
    }
}
