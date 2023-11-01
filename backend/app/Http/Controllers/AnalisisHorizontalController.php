<?php

namespace App\Http\Controllers;

use App\Models\AnalisisHorizontale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalisisHorizontalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $analisisHorizontal = AnalisisHorizontale::all();
       /*  $analisisHorizontal = AnalisisHorizontal::with('empresa', 'cuenta', 'cuenta.rubro')->get(); */
        return $analisisHorizontal;
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
        $analisisHorizontal = new AnalisisHorizontale();
        $analisisHorizontal->valor_anterior = $request->valor_anterior;
        $analisisHorizontal->valor_actual = $request->valor_actual;
        $analisisHorizontal->anio_actual = $request->anio_actual;
        $analisisHorizontal->anio_anterior = $request->anio_anterior;
        $analisisHorizontal->rubro = $request->rubro;
        $analisisHorizontal->valor_absoluto = $request->valor_absoluto;
        $analisisHorizontal->valor_relativo = $request->valor_relativo;
        $analisisHorizontal->empresa_id = $request->empresa_id;
        $analisisHorizontal->cuenta_id = $request->cuenta_id;
        $analisisHorizontal->save();
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
        $periodoAnterior = $request->get('periodoAnterior');
        $periodoActual = $request->get('periodoActual');
        $rubro = $request->get('rubro');

        $existencia = DB::table('analisis_horizontales')->distinct()
            ->join('empresas', 'empresas.id', '=', 'analisis_horizontales.empresa_id')
            ->join('cuentas', 'cuentas.id', '=', 'analisis_horizontales.cuenta_id')
            ->select('analisis_horizontales.id')
            ->where([['analisis_horizontales.empresa_id', '=', $empresa], 
            ['analisis_horizontales.anio_anterior', '=', $periodoAnterior],
            ['analisis_horizontales.anio_actual', '=', $periodoActual],
            ['analisis_horizontales.rubro', '=', $rubro]])
            ->get();

        return $existencia;
    }
}
