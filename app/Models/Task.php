<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\GroupTask;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'body',
        'begin_time',
        'end_time',
        'open',
    ];

    protected $casts = [
        'open' => 'boolean',
        'begin_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function group()
    {
        return $this->belongsTo(GroupTask::class, 'group_id');
    }
}
