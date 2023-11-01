<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cuenta extends Model
{
    use HasFactory;
    protected $fillable = ['nombre', 'rubro_id', 'tipo_id','empresa_id'];
    function rubro(){
        return $this->belongsTo('\App\Models\Rubros');
    }
    function empresa(){
        return $this->belongsTo('App\Models\Empresas');
    }
    
}


