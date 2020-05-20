<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
Route::middleware('auth:api')->get('/usuario', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => ['jwt.auth','api-header']], function () {
  
    // all routes to protected resources are registered here  
    Route::get('users/list', function(){
        $users = App\usuarios::all();
        $response = ['success'=>true, 'data'=>$users];
        return response()->json($response, 201);
    });
});
Route::group(['middleware' => 'api-header'], function () {
    // The registration and login requests doesn't come with tokens 
    // as users at that point have not been authenticated yet
    // Therefore the jwtMiddleware will be exclusive of them
    Route::post('/usuario/login', 'UsuariosController@login');
    Route::post('/modelo/destacados', 'ModelosController@destacados');
    Route::post('/modelo/aleatorio', 'ModelosController@aleatorio');
    Route::post('/modelo/perfil/agregar', 'ModelosController@storeNewImg');
    Route::post('/modelo/perfil', 'ModelosController@show1');
    Route::post('/usuario/perfil', 'UsuariosController@show');
    Route::post('/modelo/perfil/editar', 'ModelosController@editar');
    Route::post('/modelo/registro/img', 'ModelosController@storeImg');
    Route::post('/modelo/todas', 'ModelosController@showAll');
    Route::post('/usuario/register', 'UsuariosController@register');
    Route::post('/usuario/registro','UsuariosController@create');
    Route::post('/modelo/registro','ModelosController@create');
});
