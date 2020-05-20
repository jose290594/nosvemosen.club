<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(usuarioSeeder::class);
        $this->call(modelos::class);
        $this->call(ciudad::class);
        $this->call(provincias::class);
        // $this->call(UsersTableSeeder::class);
    }
}
