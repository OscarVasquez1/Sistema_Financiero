<?php

namespace App\Http\Controllers;

use App\Models\balances;
use App\Models\Cuenta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BalancesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $balances = balances::with('empresa', 'cuenta', 'cuenta.rubro')->get();
        return $balances;
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
        $balance = new Balances();
        $balance->anio = $request->anio;
        $balance->valor = $request->valor;
        $balance->empresa_id = $request->empresa_id;
        $cuenta_id = Cuenta::where([['codigo', "=", $request->cuenta_id], ['empresa_id', "=", $request->empresa_id]])->first()->id;
        $balance->cuenta_id = $cuenta_id;
        $balance->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\balances  $balances
     * @return \Illuminate\Http\Response
     */
    public function show(balances $balances)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\balances  $balances
     * @return \Illuminate\Http\Response
     */
    public function edit(balances $balances)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\balances  $balances
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, balances $balances)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\balances  $balances
     * @return \Illuminate\Http\Response
     */
    public function destroy(balances $balances)
    {
        //
    }

    //Metodos analisis
    public function analisis(Request $request)
    {
        $empresa = $request->get('empresa');
        $periodo = $request->get('periodo');
        $rubro = $request->get('rubro');

        if ($rubro == "todo") {
            $balances = DB::table('balances')
                ->join('empresas', 'empresas.id', '=', 'balances.empresa_id')
                ->join('cuentas', 'cuentas.id', '=', 'balances.cuenta_id')
                ->select('balances.anio', 'balances.valor', 'cuentas.nombre', 'cuentas.id')
                ->where([['balances.empresa_id', '=', $empresa], ['balances.anio', '=', $periodo]])
                ->get();
        } else {
            $balances = DB::table('balances')
                ->join('empresas', 'empresas.id', '=', 'balances.empresa_id')
                ->join('cuentas', 'cuentas.id', '=', 'balances.cuenta_id')
                ->select('balances.anio', 'balances.valor', 'cuentas.nombre', 'cuentas.id')
                ->where([['balances.empresa_id', '=', $empresa], ['balances.anio', '=', $periodo], ['cuentas.rubro_id', '=', $rubro]])
                ->get();
        }

        return $balances;
    }

    public function periodo(Request $request)
    {
        $empresa = $request->get('empresa');

        $periodos = DB::table('balances')->distinct()
            ->join('empresas', 'empresas.id', '=', 'balances.empresa_id')
            ->select('balances.anio')
            ->where([['balances.empresa_id', '=', $empresa]])
            ->get();

        return $periodos;
    }
}
