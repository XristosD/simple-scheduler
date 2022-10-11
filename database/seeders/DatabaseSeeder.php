<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\GroupTask;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        $order = 0;

        $user = User::factory()->state([
            'name' => 'Xristos',
            'email' => 'xristos@email.com',
        ])->has(
            GroupTask::factory()
                ->state(new Sequence(
                    ['date' => today()],
                    ['date' => today()->addDay()],
                    ['date' => today()->addDays(2)],
                ))
                ->sequence(fn ($sequence) => ['order' => $sequence->index])->has(
                    Task::factory()
                        ->state([
                            'begin_time' => today(),
                            'end_time' => today(),
                        ])
                        ->sequence(fn ($sequence) => ['order' => $sequence->index])
                        ->count(5)
                )
                ->count(20),
            'groups'
        )
            ->create();
    }
}
