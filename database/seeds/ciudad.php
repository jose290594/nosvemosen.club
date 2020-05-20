<?php

use Illuminate\Database\Seeder;

class ciudad extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('ciudad')->insert([
            'ciudad_id' => '1',
            'nombre' => 'CABA',
            'provincia_id'=>'1'
        ]);
    }
}
