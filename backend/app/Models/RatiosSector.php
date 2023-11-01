<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RatiosSector extends Model
{
    use HasFactory;
    protected $fillable = ['parametro_comparacion', 'actividad_economica_id', 'ratios_id'];
}
