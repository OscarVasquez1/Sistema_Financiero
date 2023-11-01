<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RatiosEmpresa extends Model
{
    use HasFactory;
    protected $fillable = ['anio_referencia', 'valor_ratio_empresas', 'ratios_id', 'empresas_id'];
}
