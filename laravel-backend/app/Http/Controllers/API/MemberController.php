<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    /**
     * Display a listing of members.
     */
    public function index(Request $request)
    {
        $query = User::query();

        // Filter by role
        if ($request->has('role')) {
            $query->where('role', $request->role);
        }

        // Filter by division
        if ($request->has('division')) {
            $query->where('division', $request->division);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by angkatan
        if ($request->has('angkatan')) {
            $query->where('angkatan', $request->angkatan);
        }

        // Search by name or NIM
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('nim', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $members = $query->latest()->get();

        return response()->json($members);
    }

    /**
     * Display the specified member.
     */
    public function show($id)
    {
        $member = User::with([
            'eventRegistrations.activity',
            'certificates.activity',
            'jobdesks'
        ])->findOrFail($id);
        
        return response()->json($member);
    }

    /**
     * Update the specified member.
     */
    public function update(Request $request, $id)
    {
        $member = User::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'nim' => 'sometimes|string|unique:users,nim,' . $id,
            'role' => 'sometimes|in:admin,bendahara,ketua_divisi,anggota,prodi',
            'division' => 'sometimes|string',
            'position' => 'sometimes|string',
            'angkatan' => 'sometimes|string',
            'phone' => 'sometimes|string',
            'status' => 'sometimes|in:aktif,non_aktif,alumni',
        ]);

        $member->update($request->all());

        return response()->json($member);
    }

    /**
     * Remove the specified member.
     */
    public function destroy($id)
    {
        $member = User::findOrFail($id);
        $member->delete();

        return response()->json(['message' => 'Member deleted successfully']);
    }

    /**
     * Get member statistics
     */
    public function statistics()
    {
        $stats = [
            'total' => User::count(),
            'aktif' => User::where('status', 'aktif')->count(),
            'non_aktif' => User::where('status', 'non_aktif')->count(),
            'alumni' => User::where('status', 'alumni')->count(),
            'by_role' => [
                'admin' => User::where('role', 'admin')->count(),
                'bendahara' => User::where('role', 'bendahara')->count(),
                'ketua_divisi' => User::where('role', 'ketua_divisi')->count(),
                'anggota' => User::where('role', 'anggota')->count(),
            ],
            'by_angkatan' => User::selectRaw('angkatan, count(*) as count')
                ->whereNotNull('angkatan')
                ->groupBy('angkatan')
                ->orderBy('angkatan', 'desc')
                ->pluck('count', 'angkatan'),
        ];

        return response()->json($stats);
    }
}
