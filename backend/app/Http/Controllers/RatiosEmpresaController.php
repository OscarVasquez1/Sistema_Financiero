<?php

namespace App\Http\Controllers;

use App\Models\RatiosEmpresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use SebastianBergmann\Environment\Console;

class RatiosEmpresaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ratioEmpresa = RatiosEmpresa::all();
        return $ratioEmpresa;
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

    public function periodo(Request $request){

        $empresa = $request->get('empresa');

        $periodo = DB::table('ratio_empresas')->distinct()
        ->select('ratio_empresas.anio_referencia')
        ->join('empresas', 'empresas.id', '=', 'ratio_empresas.empresas_id')
        ->where('empresas.id', '=', $empresa)
        ->get();

        return $periodo;
    }

    public function informe(Request $request){
        
        $empresa = $request->get("empresa");
        $razonFinanciera = $request->get("razonFinanciera");
        $periodo = $request->get("periodo");

        $datos = DB::table('ratio_empresas')->distinct()
        ->select('ratio_empresas.id', 'ratios.nombre', 'ratio_empresas.valor_ratio_empresas', 'ratio_sectores.parametro_comparacion')
        ->join('empresas', 'empresas.id', '=', 'ratio_empresas.empresas_id')
        ->join('ratios', 'ratios.id', '=', 'ratio_empresas.ratios_id')
        ->join('razon_financieras', 'razon_financieras.id', '=', 'ratios.razonFinancieras_id')
        ->join('ratio_sectores', 'ratio_sectores.ratios_id', '=', 'ratios.id')
        ->orderBy('ratios.nombre', 'asc')
        ->where([['empresas.id','=', $empresa],
                 ['razon_financieras.id', '=', $razonFinanciera], 
                 ['ratio_empresas.anio_referencia', '=', $periodo]
                ])
        ->get();

        return $datos;
    }

    public function promedio(Request $request){

        $periodo = $request->get('periodo');

        $prom = DB::table('ratio_empresas')->distinct()
        ->select('ratios.nombre', 'ratio_empresas.valor_ratio_empresas')
        ->join('empresas', 'empresas.id', '=', 'ratio_empresas.empresas_id')
        ->join('ratios', 'ratios.id', '=', 'ratio_empresas.ratios_id')
        ->join('actividad_economicas', 'actividad_economicas.id', '=', 'empresas.actividad_id')
        ->join('sectores', 'sectores.id', '=', 'actividad_economicas.sector_id')
        ->where('ratio_empresas.anio_referencia', '=', $periodo)
        ->get();

        return $prom;
    }
}
