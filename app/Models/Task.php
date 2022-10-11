<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\GroupTask;

class Task extends Model
{
    use HasFactory;

    protected $casts = [
        'open' => 'boolean',
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function group()
    {
        return $this->belongsTo(GroupTask::class, 'group_id');
    }
}
