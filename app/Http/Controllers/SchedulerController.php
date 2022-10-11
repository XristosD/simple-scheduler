<?php

namespace App\Http\Controllers;

use App\Models\GroupTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SchedulerController extends Controller
{
    public function index()
    {
        $groups = Auth::user()
            ->groups()
            ->whereDate('date', today())
            ->select('id', 'title', 'order', 'date')
            ->with(['tasks:id,title,body,open,order,begin_time,end_time,group_id'])
            ->get();

        return Inertia::render('Scheduler', [
            'groups' => $groups
        ]);
    }
}
