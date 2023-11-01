<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//Cuentas
Route::get('/cuentas', 'App\Http\Controllers\CuentaController@index'); //Mostrar todos los registros
Route::post('/cuentas', 'App\Http\Controllers\CuentaController@store'); //Crear registro
Route::put('/cuentas/{id}', 'App\Http\Controllers\CuentaController@update'); //Actualizar registro
Route::delete('/cuentas/{id}', 'App\Http\Controllers\CuentaController@destroy'); //Eliminar registro
Route::get('/getCuentaID', 'App\Http\Controllers\CuentaController@getCuentaID'); 

//Sectores
Route::get('/sectores', 'App\Http\Controllers\SectoresController@index'); //Mostrar todos los sectores
Route::get('/sectoresConActividad', 'App\Http\Controllers\SectoresController@sectoresConActividad'); //Mostrar todos los sectores con sus actividades
Route::put('/sectores/{id}', 'App\Http\Controllers\SectoresController@update'); //Actualizar 
Route::delete('/sectores/{id}', 'App\Http\Controllers\SectoresController@destroy'); //Eliminar 
Route::post('/sectores', 'App\Http\Controllers\SectoresController@store'); //Mostrar todos los sectores

//ActividadEconomica
Route::get('/actividades', 'App\Http\Controllers\ActividadEconomicaController@index'); //Mostrar todas las actividades
Route::get('/actividadesPorSector', 'App\Http\Controllers\ActividadEconomicaController@actividadesPorSector'); //Mostrar todas las actividades por sector


//Empresas
Route::get('/empresas', 'App\Http\Controllers\EmpresasController@index'); //Mostrar todas las empresas
Route::post('/empresas', 'App\Http\Controllers\EmpresasController@store'); //Crear registro
Route::get('/ultimaEmpresa', 'App\Http\Controllers\EmpresasController@ultimaEmpresa'); //Mostrar todas las empresas

//Balances
Route::get('/balances', 'App\Http\Controllers\BalancesController@index'); //Mostrar todos los registros de balances
Route::post('/balances', 'App\Http\Controllers\BalancesController@store'); //Guarda los balances
Route::get('/balances/analisis', 'App\Http\Controllers\BalancesController@analisis'); //Informacion para analisis Horizontal
Route::get('/balances/periodo', 'App\Http\Controllers\BalancesController@periodo'); //Informacion de los periodos

//Rubros
Route::get('/rubros', 'App\Http\Controllers\RubrosController@index'); //Mostrar todos los registros de rubros

//Analisis horizontal
Route::get('/analisisHorizontal', 'App\Http\Controllers\AnalisisHorizontalController@index');
Route::post('/analisisHorizontal', 'App\Http\Controllers\AnalisisHorizontalController@store');
Route::get('/analisisHorizontal/existencia', 'App\Http\Controllers\AnalisisHorizontalController@existencia');

//Analisis vertical
Route::get('/analisisVertical', 'App\Http\Controllers\AnalisisVerticalController@index');
Route::post('/analisisVertical', 'App\Http\Controllers\AnalisisVerticalController@store');
Route::get('/analisisVertical/existencia', 'App\Http\Controllers\AnalisisVerticalController@existencia');

//Razones Financieras
Route::get('/razonesFinancieras', 'App\Http\Controllers\RazonFinancieraController@index'); //Mostrar todas las razones financieras

//Periodos Ratios
Route::get('/ratiosEmpresa/periodo', 'App\Http\Controllers\RatiosEmpresaController@periodo');

//Mostrar ratios segun razon financiera, tipo informe, y los periodos
Route::get('/ratiosEmpresa/informe', 'App\Http\Controllers\RatiosEmpresaController@informe');
Route::get('/ratiosEmpresa/promedio', 'App\Http\Controllers\RatiosEmpresaController@promedio');

//Graficar.
Route::get('/graficar','App\Http\Controllers\GraficarController@index');
Route::post('/graficar','App\Http\Controllers\GraficarController@datosG');
Route::get('/cuentaEmpresa/{idEmpresa}','App\Http\Controllers\CuentaController@cuentasR');
Route::get('/EmpresasG','App\Http\Controllers\EmpresasController@EmpresasR');
