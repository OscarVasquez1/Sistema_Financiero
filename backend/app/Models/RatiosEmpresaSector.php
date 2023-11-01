<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RatiosEmpresaSector extends Model
{
    use HasFactory;
    protected $fillable = ['anio_res', 'valor_sector', 'promedio_empresas', 'empresas_cumplen_sector', 'empresas_cumplen_empresas', 'actividad_economica_id', 'ratios_id'];
}
