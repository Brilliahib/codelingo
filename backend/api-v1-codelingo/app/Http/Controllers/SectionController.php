<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    // Fetch all sections for a material
    public function index($materialId)
    {
        $sections = Section::where('material_id', $materialId)->orderBy('order')->get();
        return response()->json([
            'statusCode' => 200,
            'message' => 'Sections retrieved successfully',
            'data' => $sections
        ], 200);
    }

    // Create a new section
    public function store(Request $request)
    {
        $validated = $request->validate([
            'material_id' => 'required|exists:materials,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'order' => 'required|integer',
            'is_locked' => 'required|boolean',
        ]);

        $section = Section::create($validated);
        return response()->json([
            'statusCode' => 201,
            'message' => 'Section created successfully',
            'data' => $section
        ], 201);
    }

    // Show a single section
    public function show($id)
    {
        $section = Section::find($id);
        if (!$section) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'Section not found',
                'data' => null
            ], 404);
        }

        return response()->json([
            'statusCode' => 200,
            'message' => 'Section retrieved successfully',
            'data' => $section
        ], 200);
    }

    // Update a section
    public function update(Request $request, $id)
    {
        $section = Section::find($id);
        if (!$section) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'Section not found',
                'data' => null
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'order' => 'required|integer',
            'is_locked' => 'required|boolean',
        ]);

        $section->update($validated);
        return response()->json([
            'statusCode' => 200,
            'message' => 'Section updated successfully',
            'data' => $section
        ], 200);
    }

    // Delete a section
    public function destroy($id)
    {
        $section = Section::find($id);
        if (!$section) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'Section not found',
                'data' => null
            ], 404);
        }

        $section->delete();
        return response()->json([
            'statusCode' => 200,
            'message' => 'Section deleted successfully',
            'data' => null
        ], 200);
    }
}
