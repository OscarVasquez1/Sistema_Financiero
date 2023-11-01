<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresas extends Model
{
    use HasFactory;
    protected $fillable = ['nombre', 'descripcion', 'actividad_id'];
    public function actividad(){
        return $this->belongsTo('App\Models\ActividadEconomica');
    }
    public function balance(){
        return $this->belongsTo('App\Models\balances');
    }
}
