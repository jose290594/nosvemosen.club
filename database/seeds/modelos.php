<?php

use Illuminate\Database\Seeder;

class modelos extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $password = Hash::make('0426');
        DB::table('modelos')->insert([
            'id' => '1',
            'nombres' => 'sasha',
            'apellidos' => "grey",
            'numero' => "0412",
            'correo' => "sashaGrey@gmail.com",
            'provincia' => "Buenos Aires",
            'ciudad' => "CABA",
            'password' => $password,
            'destacado' => 1,
            'whatsapp' => "04123333888",
            'Auth_token' =>"s",
            'DNI' =>"666055544",
            'img' =>"images/tipa1.png",
            'estatura' =>"00",
            'edad' =>"21",
            'medidas' =>"1.65",
            'busto' =>"A32",
            'piel' =>"blanca",
            'cabello' =>"negro",
            'ojos' =>"verdes",
            'orientacion' =>"heterosexual",
            'preferencia' =>"hombres",
            'talla_pie' =>"40"
        ]);
        DB::table('modelos')->insert([
            'id' => '2',
            'nombres' => 'maria',
            'apellidos' => "antonia",
            'destacado' => 1,
            'numero' => "0412",
            'correo' => "antonia@gmail.com",
            'provincia' => "Buenos Aires",
            'ciudad' => "CABA",
            'password' => $password,
            'whatsapp' => "04123333888",
            'Auth_token' =>"s",
            'DNI' =>"666055544",
            'img' =>"images/tipa2.png",
            'estatura' =>"00",
            'edad' =>"21",
            'medidas' =>"1.70",
            'busto' =>"B34",
            'piel' =>"blanca",
            'cabello' =>"negro",
            'ojos' =>"verdes",
            'orientacion' =>"heterosexual",
            'preferencia' =>"hombres",
            'talla_pie' =>"40"
        ]);
        DB::table('modelos')->insert([
            'id' => '5',
            'nombres' => 'carolina',
            'apellidos' => "Herrera",
            'numero' => "0476",
            'destacado' => 1,
            'correo' => "carolinaHerrera@gmail.com",
            'provincia' => "Buenos Aires",
            'ciudad' => "CABA",
            'password' => $password,
            'whatsapp' => "04123333888",
            'Auth_token' =>"s",
            'DNI' =>"6660555er44",
            'img' =>"images/images.jpg/images.jpg",
            'estatura' =>"00",
            'edad' =>"21",
            'medidas' =>"1.60",
            'busto' =>"C34",
            'piel' =>"blanca",
            'cabello' =>"negro",
            'ojos' =>"verdes",
            'orientacion' =>"heterosexual",
            'preferencia' =>"hombres",
            'talla_pie' =>"40"
        ]);
        DB::table('modelos')->insert(['id' => '3',
        'nombres' => 'karen',
        'apellidos' => "del valle",
        'numero' => "0412",
        'destacado' => 1,
        'correo' => "karenDelvalley@gmail",
        'provincia' => "Buenos Aires",
        'ciudad' => "CABA",
        'password' => $password,
        'whatsapp' => "04123333888",
        'Auth_token' =>"s",
        'DNI' =>"666055544",
        'img' =>"images/tipa3.png",
        'estatura' =>"00",
        'edad' =>"21",
        'medidas' =>"1.56",
        'busto' =>"B34",
        'piel' =>"blanca",
        'cabello' =>"negro",
        'ojos' =>"verdes",
        'orientacion' =>"heterosexual",
        'preferencia' =>"hombres",
        'talla_pie' =>"40"]);
        DB::table('modelos')->insert([
            'id' => '4',
            'nombres' => 'holi',
            'apellidos' => "lol",
            'numero' => "0412",
            'destacado' => 1,
            'correo' => "yiria@gmail.com",
            'provincia' => "Buenos Aires",
            'ciudad' => "CABA",
            'password' => $password,
            'whatsapp' => "04123333888",
            'Auth_token' =>"s",
            'DNI' =>"666055544",
            'img' =>"images/tipa4.png",
            'estatura' =>"00",
            'edad' =>"21",
            'medidas' =>"1.4",
            'busto' =>"D32",
            'piel' =>"blanca",
            'cabello' =>"negro",
            'ojos' =>"verdes",
            'orientacion' =>"heterosexual",
            'preferencia' =>"hombres",
            'talla_pie' =>"40"
        ]);
    }
}
