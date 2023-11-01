<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRatioEmpresasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ratio_empresas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('anio_referencia');
            $table->float('valor_ratio_empresas', 18, 2);
            $table->unsignedBigInteger('ratios_id');
            $table->foreign('ratios_id')->references('id')->on("ratios")->onDelete('cascade');
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
        Schema::dropIfExists('ratio_empresas');
    }
}
