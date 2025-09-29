<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use Illuminate\Http\Request;

class CollectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $limit = $request->get('limit');
        $collection = Collection::paginate($limit);
        return response()->json($collection);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validate = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'img_url' => 'sometimes|required|string|max:1000',
            'status' => 'sometimes|required|in:ACTIVE,INACTIVE',
        ]);

        $collection = Collection::create([
            'name' => $validate['name'],
            'img_url' => $validate['img_url'],
            'status' => $validate['status']
        ]);

        return response()->json([
            'message' => 'Collection images created successfully',
            'data' => $collection,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Collection $collection)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Collection $collection)
    {
        //
        $validate = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'img_url' => 'sometimes|required|string|max:1000',
            'status' => 'sometimes|required|in:ACTIVE,INACTIVE',
        ]);

        $collection->update($validate);

        return response()->json([
            'message' => 'Collection images updated successfully',
            'data' => $collection,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Collection $collection)
    {
        $collection->delete();
        //
        return response()->json([
            'message' => 'Collection images deleted successfully',
        ]);
    }
}
