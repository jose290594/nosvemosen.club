<!DOCTYPE html>
    <html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- CSRF Token -->   
        <link rel="icon" type="image/png" sizes="32x32" href="fire.png" />
        <meta name="csrf-token" content="{{ csrf_token() }}" id="tag">
        <title>Punto Club</title>
        <!-- Styles -->
     
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>
    <body>
        <div id="app"></div>

        <script src="{{ asset('js/app.js') }}"></script>
        <script src=""></script>
    </body>
    </html>