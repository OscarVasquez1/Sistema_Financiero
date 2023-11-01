<?php

namespace App\Http\Controllers;

use App\Models\AnalisisVerticale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalisisVerticalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $analisisVertical = AnalisisVerticale::all();
       /*  $analisisHorizontal = AnalisisHorizontal::with('empresa', 'cuenta', 'cuenta.rubro')->get(); */
        return $analisisVertical;
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
        $analisisVertical = new AnalisisVerticale();
        $analisisVertical->valor = $request->valor;
        $analisisVertical->anio = $request->anio;
        $analisisVertical->rubro = $request->rubro;
        $analisisVertical->valor_vertical = $request->valor_vertical;
        $analisisVertical->empresa_id = $request->empresa_id;
        $analisisVertical->cuenta_id = $request->cuenta_id;
        $analisisVertical->save();
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

    public function existencia(Request $request)
    {
        $empresa = $request->get('empresa');
        $periodo = $request->get('periodo');
        $rubro = $request->get('rubro');

        $existencia = DB::table('analisis_verticales')->distinct()
            ->join('empresas', 'empresas.id', '=', 'analisis_verticales.empresa_id')
            ->join('cuentas', 'cuentas.id', '=', 'analisis_verticales.cuenta_id')
            ->select('analisis_verticales.id')
            ->where([['analisis_verticales.empresa_id', '=', $empresa], 
            ['analisis_verticales.anio', '=', $periodo],
            ['analisis_verticales.rubro', '=', $rubro]])
            ->get();

        return $existencia;
    }
}
