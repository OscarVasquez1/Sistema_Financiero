<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnalisisHorizontale extends Model
{
    use HasFactory;
    protected $fillable = ['valor_anterior', 'valor_actual', 'anio_actual', 'anio_anterior', 'rubro', 'valor_absoluto', 'valor_relativo', 'empresa_id', 'cuenta_id'];
    /* public function empresa(){
        return $this->belongsTo('App\Models\Empresas');
    }
    public function cuenta(){
        return $this->belongsTo('App\Models\Cuenta');
    }
    function rubro(){
        return $this->belongsTo('\App\Models\Rubros');
    } */
}
