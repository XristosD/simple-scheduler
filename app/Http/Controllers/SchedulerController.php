<?php

namespace App\Http\Controllers;

use App\Models\GroupTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;

class SchedulerController extends Controller
{
    public function index(Request $request, $date = null)
    {
        $date = is_null($date) || strtotime($date) === false ? today() : Date::createFromTimestamp(strtotime($date));
        $groups = Auth::user()
            ->groups()
            ->whereDate('date', $date)
            ->select('id', 'title', 'order', 'date')
            ->with(['tasks:id,title,body,open,order,begin_time,end_time,group_id'])
            ->get();

        return Inertia::render('Scheduler', [
            'date' => $date,
            'groups' => $groups
        ]);
    }
}
