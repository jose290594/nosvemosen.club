<?php

use Illuminate\Database\Seeder;

class provincias extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('provincias')->insert([
            'provincia_id' => '1',
            'nombre' => 'Buenos Aires',
        ]);
    }
}
