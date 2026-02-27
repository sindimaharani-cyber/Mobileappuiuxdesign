<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\FinancialTransaction;
use Illuminate\Http\Request;

class FinancialTransactionController extends Controller
{
    /**
     * Display a listing of financial transactions.
     */
    public function index(Request $request)
    {
        $query = FinancialTransaction::with(['activity', 'creator']);

        // Filter by type
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filter by activity
        if ($request->has('activity_id')) {
            $query->where('activity_id', $request->activity_id);
        }

        // Filter by date range
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('date', [$request->start_date, $request->end_date]);
        }

        $transactions = $query->latest('date')->get();

        return response()->json($transactions);
    }

    /**
     * Store a newly created transaction.
     */
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:pemasukan,pengeluaran',
            'amount' => 'required|numeric|min:0',
            'description' => 'required|string',
            'date' => 'required|date',
            'activity_id' => 'nullable|exists:activities,id',
            'receipt_file' => 'nullable|string',
        ]);

        $transaction = FinancialTransaction::create([
            'type' => $request->type,
            'amount' => $request->amount,
            'description' => $request->description,
            'date' => $request->date,
            'activity_id' => $request->activity_id,
            'created_by' => $request->user()->id,
            'receipt_file' => $request->receipt_file,
        ]);

        return response()->json($transaction->load(['activity', 'creator']), 201);
    }

    /**
     * Display the specified transaction.
     */
    public function show($id)
    {
        $transaction = FinancialTransaction::with(['activity', 'creator'])->findOrFail($id);
        return response()->json($transaction);
    }

    /**
     * Update the specified transaction.
     */
    public function update(Request $request, $id)
    {
        $transaction = FinancialTransaction::findOrFail($id);

        $request->validate([
            'type' => 'sometimes|in:pemasukan,pengeluaran',
            'amount' => 'sometimes|numeric|min:0',
            'description' => 'sometimes|string',
            'date' => 'sometimes|date',
            'activity_id' => 'nullable|exists:activities,id',
            'receipt_file' => 'nullable|string',
        ]);

        $transaction->update($request->all());

        return response()->json($transaction->load(['activity', 'creator']));
    }

    /**
     * Remove the specified transaction.
     */
    public function destroy($id)
    {
        $transaction = FinancialTransaction::findOrFail($id);
        $transaction->delete();

        return response()->json(['message' => 'Transaction deleted successfully']);
    }

    /**
     * Get financial summary
     */
    public function summary(Request $request)
    {
        $query = FinancialTransaction::query();

        // Filter by date range if provided
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('date', [$request->start_date, $request->end_date]);
        }

        $pemasukan = (clone $query)->where('type', 'pemasukan')->sum('amount');
        $pengeluaran = (clone $query)->where('type', 'pengeluaran')->sum('amount');
        $saldo = $pemasukan - $pengeluaran;

        return response()->json([
            'pemasukan' => $pemasukan,
            'pengeluaran' => $pengeluaran,
            'saldo' => $saldo,
            'total_transactions' => $query->count(),
        ]);
    }
}
