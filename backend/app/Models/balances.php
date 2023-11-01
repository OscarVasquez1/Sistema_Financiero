<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class balances extends Model
{
    use HasFactory;
    protected $fillable = ['anio', 'valor', 'empresa_id', 'cuenta_id'];
    public function empresa(){
        return $this->belongsTo('App\Models\Empresas');
    }
    public function cuenta(){
        return $this->belongsTo('App\Models\Cuenta');
    }
    function rubro(){
        return $this->belongsTo('\App\Models\Rubros');
    }
}
