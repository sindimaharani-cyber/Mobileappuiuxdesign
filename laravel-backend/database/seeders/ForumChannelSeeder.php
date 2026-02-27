<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ForumChannel;

class ForumChannelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ForumChannel::create([
            'name' => 'General',
            'type' => 'all',
        ]);

        ForumChannel::create([
            'name' => 'Pengumuman',
            'type' => 'all',
        ]);

        ForumChannel::create([
            'name' => 'Divisi Acara',
            'type' => 'division',
            'division' => 'Divisi Acara',
        ]);

        ForumChannel::create([
            'name' => 'Divisi Humas',
            'type' => 'division',
            'division' => 'Divisi Humas',
        ]);

        ForumChannel::create([
            'name' => 'Divisi Multimedia',
            'type' => 'division',
            'division' => 'Divisi Multimedia',
        ]);
    }
}
