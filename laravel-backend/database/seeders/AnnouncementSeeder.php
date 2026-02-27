<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Announcement;
use App\Models\User;

class AnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();

        Announcement::create([
            'title' => 'Rapat Koordinasi Pengurus HIMATIF',
            'content' => 'Mengundang seluruh pengurus HIMATIF untuk hadir dalam rapat koordinasi yang akan membahas agenda kegiatan semester genap 2026.',
            'category' => 'Rapat',
            'user_id' => $admin->id,
            'archived' => false,
        ]);

        Announcement::create([
            'title' => 'Pendaftaran Seminar Teknologi Terkini',
            'content' => 'Dibuka pendaftaran seminar teknologi dengan tema "AI & Machine Learning in Practice". Terbatas untuk 100 peserta.',
            'category' => 'Acara',
            'user_id' => $admin->id,
            'archived' => false,
        ]);

        Announcement::create([
            'title' => 'Laporan Keuangan Bulan Januari 2026',
            'content' => 'Telah tersedia laporan keuangan HIMATIF periode Januari 2026. Silakan cek di menu Keuangan.',
            'category' => 'Keuangan',
            'user_id' => $admin->id,
            'archived' => false,
        ]);
    }
}
