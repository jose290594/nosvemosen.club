<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
class usuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $password = Hash::make('0426');
        DB::table('usuarios')->insert([
            'id' => '1',
            'nombres' => 'rafael',
            'apellidos' => "sa",
            'numero' => "sa",
            'correo' => "sa",
            'direccion' => "sa",
            'password' => $password,
            'whatsapp' => "sa",
            'Auth_token' =>"s"
        ]);
    }
}
