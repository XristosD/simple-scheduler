<?php

namespace App\Http\Controllers;

use App\Models\GroupTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SchedulerController extends Controller
{
    public function index(Request $request, $date = null)
    {
        $aheadBehind = 10;
        $date = is_null($date) || strtotime($date) === false ? today() : Date::createFromTimestamp(strtotime($date));
        $date->toImmutable();
        $fromDate = $date->toImmutable()->subMonths($aheadBehind)->firstOfMonth();
        $toDate = $date->toImmutable()->addMonths($aheadBehind)->endOfMonth();

        $daysSum = DB::table('group_tasks')->join('tasks', 'group_tasks.id', '=', 'tasks.group_id')
            ->select('date')
            ->selectRaw('SUM(tasks.open) AS open')
            ->selectRaw('count(group_tasks.id) AS total')
            ->whereBetween('group_tasks.date', [$fromDate, $toDate])
            ->groupBy('group_tasks.date')
            ->get();

        $groups = Auth::user()
            ->groups()
            ->whereDate('date', $date)
            ->select('id', 'title', 'order', 'date')
            ->with(['tasks:id,title,body,open,order,begin_time,end_time,group_id'])
            ->get();

        return Inertia::render('Scheduler', [
            'date' => $date,
            'aheadBehind' => $aheadBehind,
            'daysSum' => $daysSum,
            'groups' => $groups
        ]);
    }
}
