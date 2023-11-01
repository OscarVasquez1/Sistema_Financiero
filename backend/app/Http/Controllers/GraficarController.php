<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AnalisisHorizontale;
use App\Models\balances;
class GraficarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $analisisBalance = balances::with('empresa','cuenta','rubro')->get();
        return $analisisBalance;
    }

    public function datosG(Request $request)
    {
        $idCuenta = $request->input('idCuenta');
        $idEmpresa = $request->input('idEmpresa');
        $anioInicio = $request->input('anioIni');
        $anioFin = $request->input('anioFin');
        
        $balanceG = balances::where('balances.cuenta_id','=',$idCuenta)
        ->where('balances.empresa_id','=',$idEmpresa)
        ->where('balances.anio','>=',$anioInicio)
        ->where('balances.anio','<=',$anioFin)
        ->with('cuenta','rubro','empresa')
        ->get();

        return $balanceG;

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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
