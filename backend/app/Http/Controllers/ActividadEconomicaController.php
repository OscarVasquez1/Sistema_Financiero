<?php

namespace App\Http\Controllers;

use App\Models\ActividadEconomica;
use App\Models\Sectores;
use Illuminate\Http\Request;

class ActividadEconomicaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $actividades = ActividadEconomica::with('sector')->get(); //Traemos con los datos del sector
        return $actividades;
    }
    /**
     * Display a listing of the resource.
     ** @param  \Illuminate\Http\Request  $request
     *  
     * @return \Illuminate\Http\Response
     */
    public function actividadesPorSector(Request $request)
    {
        $sector_id = $request->id;
        $actividades = ActividadEconomica::with('sector')->get()->where('sector_id',$sector_id); //Traemos con los datos del sector
        return $actividades;
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
     * @param  \App\Models\ActividadEconomica  $actividadEconomica
     * @return \Illuminate\Http\Response
     */
    public function show(ActividadEconomica $actividadEconomica)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ActividadEconomica  $actividadEconomica
     * @return \Illuminate\Http\Response
     */
    public function edit(ActividadEconomica $actividadEconomica)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ActividadEconomica  $actividadEconomica
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ActividadEconomica $actividadEconomica)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ActividadEconomica  $actividadEconomica
     * @return \Illuminate\Http\Response
     */
    public function destroy(ActividadEconomica $actividadEconomica)
    {
        //
    }
}
