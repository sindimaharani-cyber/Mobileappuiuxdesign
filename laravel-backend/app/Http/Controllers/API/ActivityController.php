<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    /**
     * Display a listing of activities.
     */
    public function index(Request $request)
    {
        $query = Activity::with(['creator', 'registrations']);

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by date range
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('date', [$request->start_date, $request->end_date]);
        }

        $activities = $query->latest('date')->get();

        return response()->json($activities);
    }

    /**
     * Store a newly created activity.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|string',
            'location' => 'required|string',
            'status' => 'sometimes|in:perencanaan,persiapan,pelaksanaan,selesai',
            'reminder' => 'sometimes|boolean',
            'quota' => 'sometimes|integer',
        ]);

        $activity = Activity::create([
            'title' => $request->title,
            'description' => $request->description,
            'date' => $request->date,
            'time' => $request->time,
            'location' => $request->location,
            'status' => $request->status ?? 'perencanaan',
            'reminder' => $request->reminder ?? false,
            'quota' => $request->quota,
            'created_by' => $request->user()->id,
        ]);

        return response()->json($activity->load('creator'), 201);
    }

    /**
     * Display the specified activity.
     */
    public function show($id)
    {
        $activity = Activity::with(['creator', 'registrations.user', 'financialTransactions', 'documents'])
            ->findOrFail($id);
        return response()->json($activity);
    }

    /**
     * Update the specified activity.
     */
    public function update(Request $request, $id)
    {
        $activity = Activity::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'date' => 'sometimes|date',
            'time' => 'sometimes|string',
            'location' => 'sometimes|string',
            'status' => 'sometimes|in:perencanaan,persiapan,pelaksanaan,selesai',
            'reminder' => 'sometimes|boolean',
            'quota' => 'sometimes|integer',
            'documentation' => 'sometimes|array',
        ]);

        $activity->update($request->all());

        return response()->json($activity->load('creator'));
    }

    /**
     * Remove the specified activity.
     */
    public function destroy($id)
    {
        $activity = Activity::findOrFail($id);
        $activity->delete();

        return response()->json(['message' => 'Activity deleted successfully']);
    }

    /**
     * Get activity statistics
     */
    public function statistics()
    {
        $stats = [
            'total' => Activity::count(),
            'perencanaan' => Activity::where('status', 'perencanaan')->count(),
            'persiapan' => Activity::where('status', 'persiapan')->count(),
            'pelaksanaan' => Activity::where('status', 'pelaksanaan')->count(),
            'selesai' => Activity::where('status', 'selesai')->count(),
            'upcoming' => Activity::where('date', '>=', now())->count(),
            'past' => Activity::where('date', '<', now())->count(),
        ];

        return response()->json($stats);
    }
}
