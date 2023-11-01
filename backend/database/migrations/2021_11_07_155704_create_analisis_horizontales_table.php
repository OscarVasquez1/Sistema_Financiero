<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnalisisHorizontalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('analisis_horizontales', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->decimal('valor_anterior', 16,2);
            $table->decimal('valor_actual', 16,2);
            $table->bigInteger('anio_actual');
            $table->bigInteger('anio_anterior');
            $table->string('rubro', 191);
            $table->decimal('valor_absoluto', 16,2);
            $table->string('valor_relativo');
            $table->unsignedBigInteger('empresa_id');
            $table->foreign('empresa_id')->references('id')->on('empresas')->onDelete('cascade');
            $table->unsignedBigInteger('cuenta_id');
            $table->foreign('cuenta_id')->references('id')->on('cuentas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('analisis_horizontales');
    }
}
