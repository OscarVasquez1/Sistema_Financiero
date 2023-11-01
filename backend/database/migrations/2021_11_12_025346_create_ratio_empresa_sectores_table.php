<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRatioEmpresaSectoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ratio_empresa_sectores', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("anio_res");
            $table->float("valor_sector", 18, 2);
            $table->float("promedio_empresas", 18, 2);
            $table->string("empresas_cumplen_sector", 300);
            $table->string("empresas_cumplen_empresas", 300);
            $table->unsignedBigInteger("actividad_economicas_id");
            $table->foreign("actividad_economicas_id")->references("id")->on("actividad_economicas")->onDelete("cascade");
            $table->unsignedBigInteger("ratios_id");
            $table->foreign("ratios_id")->references("id")->on("ratios")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ratio_empresa_sectores');
    }
}
