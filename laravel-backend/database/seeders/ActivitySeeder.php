<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Activity;
use App\Models\User;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();

        Activity::create([
            'title' => 'Workshop Flutter Development',
            'description' => 'Workshop pengembangan aplikasi mobile menggunakan Flutter untuk mahasiswa Teknik Informatika.',
            'date' => '2026-02-10',
            'time' => '09:00 - 15:00 WIB',
            'location' => 'Lab Komputer 1',
            'status' => 'perencanaan',
            'reminder' => true,
            'quota' => 50,
            'created_by' => $admin->id,
        ]);

        Activity::create([
            'title' => 'Seminar AI & Machine Learning',
            'description' => 'Seminar tentang penerapan AI dan Machine Learning dalam industri teknologi.',
            'date' => '2026-02-15',
            'time' => '13:00 - 17:00 WIB',
            'location' => 'Auditorium Kampus',
            'status' => 'perencanaan',
            'reminder' => true,
            'quota' => 100,
            'created_by' => $admin->id,
        ]);

        Activity::create([
            'title' => 'Bakti Sosial HIMATIF',
            'description' => 'Kegiatan bakti sosial ke panti asuhan sebagai bentuk kepedulian sosial mahasiswa.',
            'date' => '2026-01-25',
            'time' => '08:00 - 14:00 WIB',
            'location' => 'Panti Asuhan Al-Hikmah',
            'status' => 'selesai',
            'created_by' => $admin->id,
        ]);
    }
}
