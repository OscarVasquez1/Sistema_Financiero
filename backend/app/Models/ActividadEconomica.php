<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActividadEconomica extends Model
{
    use HasFactory;
    protected $fillable = ['nombre', 'descripcion', 'sector_id'];
    public function sector(){
        return $this->belongsTo('App\Models\Sectores');
    }
    public function empresas(){
        return $this->hasMany('App\Models\Empresas');
    }
}
