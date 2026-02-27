<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin/Ketua
        User::create([
            'nim' => '2021001',
            'name' => 'Sindi Maharani',
            'email' => 'sindimaharani@student.uir.ac.id',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'division' => 'Inti',
            'position' => 'Ketua HIMATIF',
            'angkatan' => '2021',
            'phone' => '081234567890',
            'status' => 'aktif',
        ]);

        // Create Bendahara
        User::create([
            'nim' => '2021002',
            'name' => 'Siti Rahma',
            'email' => 'siti.rahma@student.uir.ac.id',
            'password' => Hash::make('password'),
            'role' => 'bendahara',
            'division' => 'Inti',
            'position' => 'Bendahara',
            'angkatan' => '2021',
            'phone' => '081234567891',
            'status' => 'aktif',
        ]);

        // Create Ketua Divisi
        User::create([
            'nim' => '2022001',
            'name' => 'Budi Santoso',
            'email' => 'budi.santoso@student.uir.ac.id',
            'password' => Hash::make('password'),
            'role' => 'ketua_divisi',
            'division' => 'Divisi Acara',
            'position' => 'Ketua Divisi Acara',
            'angkatan' => '2022',
            'phone' => '081234567892',
            'status' => 'aktif',
        ]);

        // Create Anggota
        User::create([
            'nim' => '2023001',
            'name' => 'Dewi Lestari',
            'email' => 'dewi.lestari@student.uir.ac.id',
            'password' => Hash::make('password'),
            'role' => 'anggota',
            'division' => 'Divisi Acara',
            'position' => 'Anggota',
            'angkatan' => '2023',
            'phone' => '081234567893',
            'status' => 'aktif',
        ]);

        // Create Prodi
        User::create([
            'name' => 'Dr. Muhammad Yusuf, M.Kom',
            'email' => 'prodi@uir.ac.id',
            'password' => Hash::make('password'),
            'role' => 'prodi',
            'position' => 'Ketua Prodi Teknik Informatika',
            'status' => 'aktif',
        ]);

        // Call other seeders
        $this->call([
            AnnouncementSeeder::class,
            ActivitySeeder::class,
            FinancialTransactionSeeder::class,
            ForumChannelSeeder::class,
        ]);
    }
}
