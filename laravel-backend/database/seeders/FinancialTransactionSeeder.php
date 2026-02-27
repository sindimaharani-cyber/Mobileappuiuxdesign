<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FinancialTransaction;
use App\Models\User;
use App\Models\Activity;

class FinancialTransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bendahara = User::where('role', 'bendahara')->first();
        $seminar = Activity::where('title', 'Seminar AI & Machine Learning')->first();

        FinancialTransaction::create([
            'type' => 'pemasukan',
            'amount' => 5000000,
            'description' => 'Dana Sponsor Seminar AI',
            'date' => '2026-01-15',
            'activity_id' => $seminar->id,
            'created_by' => $bendahara->id,
        ]);

        FinancialTransaction::create([
            'type' => 'pengeluaran',
            'amount' => 2500000,
            'description' => 'Biaya Sewa Venue Workshop Flutter',
            'date' => '2026-01-18',
            'created_by' => $bendahara->id,
        ]);

        FinancialTransaction::create([
            'type' => 'pemasukan',
            'amount' => 3000000,
            'description' => 'Iuran Anggota Semester Genap',
            'date' => '2026-01-20',
            'created_by' => $bendahara->id,
        ]);
    }
}
