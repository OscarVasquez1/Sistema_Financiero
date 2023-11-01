<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sectores;
class SectoresController extends Controller
{
    //
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sectores = Sectores::all();
        return $sectores;
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
        $sector = new Sectores();
        $sector->nombre =  $request->nombre;
        $sector->descripcion =  $request->descripcion;

        $sector->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }
    /**
     * Display a listing of the resource.
     ** @param  \Illuminate\Http\Request  $request
     *  
     * @return \Illuminate\Http\Response
     */
    public function sectoresConActividad()
    {
        $sectores = Sectores::with('actividades')->get();
        return $sectores;
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $sectores = Sectores::findOrFail($request->id);
        $sectores->nombre =  $request->nombre;
        $sectores->descripcion =  $request->descripcion;

        $sectores->save();
        return $sectores;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $sectores = Sectores::destroy($request->id);
        return $sectores;
    }
}
