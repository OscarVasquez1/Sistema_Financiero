<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sectores extends Model
{
    use HasFactory;
    protected $fillable = ['nombre', 'descripcion'];
    public function actividades(){
        return $this->hasMany('App\Models\ActividadEconomica','sector_id');
    }
}
