<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateModelosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('modelos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombres');
            $table->string('apellidos');
            $table->string('numero');
            $table->string('correo');
            $table->string('provincia');
            $table->string('ciudad');
            $table->string('password');
            $table->string('whatsapp');
            $table->string('DNI');
            $table->string('img');
            $table->boolean('destacado')->default(0)->nullable();
            $table->mediumText('auth_token')->nullable();
            $table->string('estatura')->default('0')->nullable();
            $table->tinyInteger('edad')->default('0')->nullable();
            $table->string('medidas')->default('0')->nullable();
            $table->string('busto')->default('0')->nullable();
            $table->string('piel')->default('0')->nullable();
            $table->string('cabello')->default('0')->nullable();
            $table->string('ojos')->default('0')->nullable();
            $table->string('orientacion')->default('0')->nullable();
            $table->string('preferencia')->default('0')->nullable();
            $table->string('talla_pie')->default('0')->nullable();
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
        Schema::dropIfExists('modelos');
    }
}
