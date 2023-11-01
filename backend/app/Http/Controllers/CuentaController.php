<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cuenta;
use App\Models\balances;
use Illuminate\Support\Facades\DB;

class CuentaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cuentas = Cuenta::with('empresa', 'rubro')->get();
        return $cuentas;
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
        $cuenta = new Cuenta();
        $cuenta->codigo = $request->codigo;
        $cuenta->nombre =  $request->nombre;
        $cuenta->rubro_id = $request->rubro_id;
        $cuenta->tipo_id =  $request->tipo_id;
        $cuenta->empresa_id =  $request->empresa_id;

        $cuenta->save();
    }


    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    
     //Muestra el ID de la cuenta filtrado por su código
    public function getCuentaID(Request $request)
    {
        //
        $codigo = $request->codigo;
        $cuenta = Cuenta::where('codigo',$codigo)->first();
        return $cuenta;
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
    public function update(Request $request)
    {
        $cuenta = Cuenta::findOrFail($request->id);
        $cuenta->codigo =  $request->codigo;
        $cuenta->rubro_id = $request->rubrop_id;
        $cuenta->tipo_id =  $request->tipo_id;

        $cuenta->save();
        return $cuenta;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($request)
    {
        $cuenta = Cuenta::destroy($request->id);
        return $cuenta;
    }

    public function cuentasR($idEmpresa)
    {
        $cuentas = DB::table("balances")
            ->distinct()
            ->join('cuentas', 'cuentas.id', '=', 'balances.cuenta_id')
            ->select('cuentas.nombre', 'cuentas.id')
            ->where('balances.empresa_id', '=', $idEmpresa)->get();
        return $cuentas;
    }
}
