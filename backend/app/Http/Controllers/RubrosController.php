<?php

namespace App\Http\Controllers;

use App\Models\Rubros;
use Illuminate\Http\Request;

class RubrosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rubros = Rubros::all();
        return $rubros;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Rubros  $rubros
     * @return \Illuminate\Http\Response
     */
    public function show(Rubros $rubros)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Rubros  $rubros
     * @return \Illuminate\Http\Response
     */
    public function edit(Rubros $rubros)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Rubros  $rubros
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rubros $rubros)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Rubros  $rubros
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rubros $rubros)
    {
        //
    }
}
