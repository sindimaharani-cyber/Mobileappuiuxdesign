<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of announcements.
     */
    public function index(Request $request)
    {
        $query = Announcement::with('user');

        // Filter by archived status
        if ($request->has('archived')) {
            $query->where('archived', $request->archived);
        }

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        $announcements = $query->latest()->get();

        return response()->json($announcements);
    }

    /**
     * Store a newly created announcement.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string',
        ]);

        $announcement = Announcement::create([
            'title' => $request->title,
            'content' => $request->content,
            'category' => $request->category,
            'user_id' => $request->user()->id,
            'archived' => false,
        ]);

        return response()->json($announcement->load('user'), 201);
    }

    /**
     * Display the specified announcement.
     */
    public function show($id)
    {
        $announcement = Announcement::with('user')->findOrFail($id);
        return response()->json($announcement);
    }

    /**
     * Update the specified announcement.
     */
    public function update(Request $request, $id)
    {
        $announcement = Announcement::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'category' => 'sometimes|string',
            'archived' => 'sometimes|boolean',
        ]);

        $announcement->update($request->all());

        return response()->json($announcement->load('user'));
    }

    /**
     * Remove the specified announcement.
     */
    public function destroy($id)
    {
        $announcement = Announcement::findOrFail($id);
        $announcement->delete();

        return response()->json(['message' => 'Announcement deleted successfully']);
    }

    /**
     * Archive/Unarchive announcement
     */
    public function toggleArchive($id)
    {
        $announcement = Announcement::findOrFail($id);
        $announcement->archived = !$announcement->archived;
        $announcement->save();

        return response()->json($announcement->load('user'));
    }
}
