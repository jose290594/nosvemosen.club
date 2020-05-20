<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use App\usuarios;
use App\Modelos;
use Illuminate\Http\Request;

use JWTAuth;
use JWTAuthException;
class UsuariosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }
    
    private function getToken($correo, $password)
    {
        $token = null;
        //$credentials = $request->only('email', 'password');
        try {
            if (!$token = JWTAuth::attempt( ['correo'=>$correo, 'password'=>$password])) {
                return response()->json([
                    'error' => null
                ]);
            }
        } catch (JWTAuthException $e) {
           return $token;
        }
        return $token;
    }
    public function login(Request $request)
    {   if($request->id == 0){
        $user = usuarios::where('correo', $request->correo)->get()->first();
        if($user){
        $correo = $request->correo;
        $password = $request->password;
        if( $token = self::getToken($request->correo, $request->password)){
        $user->auth_token = $token;
        $user->save();
        $response = ['success'=>true, 'data'=>['user_id'=>$user->id,'tipo'=>2,'auth_token'=>$user->auth_token,'nombre'=>$user->nombres, 'correo'=>$user->correo,'req'=>$request->id]]; 
        }else{
            $response = ['success'=>false, 'data'=>'Record doesnt exists'];
        } 
    }
        else{
            $response = ['success'=>false, 'data'=>'Record doesnt exists'];
        }
        return response()->json($response, 201);//The passwords match...
       
    }else{
        $user = Modelos::where('correo', $request->correo)->get()->first();
        $user2 = usuarios::where('correo', 'sa')->get()->first();
        if ($user && Hash::check($request->password,$user->password)) // The passwords match...
        {
            $correo = $request->correo;
            $password = $request->password;
            $data = ['user_id'=>$user->id,'nombre'=>$user->nombres, 'correo'=>$user->correo,'req'=>$request->id];
            $token = JWTAuth::fromUser($user2,$data);
            $user->auth_token = $token;
            $user->save();
            $response = ['success'=>true, 'data'=>['user_id'=>$user->id,'tipo'=>1,'auth_token'=>$user->auth_token,'nombre'=>$user->nombres, 'correo'=>$user->correo,'req'=>$request->id]];           
        }
        else 
          $response = ['success'=>false, 'data'=>'Record doesnt exists'];
      
        return response()->json($response, 201);
    }
        
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $usuario = new usuarios();
        $usuario->nombres = request('nombre');
        $usuario->apellidos = request('apellidos');
        $usuario->direccion = request('direccion');
        $usuario->numero = request('numero');
        $usuario->whatsapp = request('whatsapp');
        $usuario->correo = request('correo');
        $usuario->password = request('password');
        if ($usuario->save())
        {
            $token = self::getToken($request->correo, $request->password); // generate user token
            
            if (!is_string($token))  return response()->json(['success'=>false,'data'=>'Token generation failed'], 201);
            
            $user =usuarios::where('correo', $request->correo)->get()->first();
            
            $user->auth_token = $token; // update user token
            
           // $user->save();
            
            $response = ['success'=>true, 'data'=>['name'=>$user->nombre,'id'=>$user->id,'email'=>$request->correo,'auth_token'=>$token]];        
        }
        else
            $response = ['success'=>false, 'data'=>'Couldnt register user'];
        
        
        return response()->json($response, 201);
    }
       

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function checkUser($token,$user)
    {
        $user = usuarios::where('id',$user)->where('Auth_token',$token)->get()->first();
        if($user){
            return true;
        }else{
            return false;
        }
    }
    public function checkModel($token,$user){
        $user = Modelos::where('id', $user)->where('Auth_token',$token)->get()->first();
        if($user){
            return true;
        }else{
            return false;
        }
    }
    public function show(Request $request)
    {
        if(self::checkUser($request->token,$request->user)){          
            $user = usuarios::where('id', $request->user)->get()->first(); 
            if($user){
               // $imgs = DB::table('imgs')->where('id',$request->user)->pluck('path');
                $response = ['user' =>$user, 'log'=>true ];
                return response()->json($response);
            }else{
                    $response = ['error'=>'nose encontro ninguno'];
                    return response()->json($response);
            };
         }else{
                $response = ['sesion expirada' , 'log' =>false];
                return response()->json($response);
            }
    }
    /**
     * Display the specified resource.
     * @param  \App\usuarios  $usuarios
     * @return \Illuminate\Http\Response
     *
     */

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\usuarios  $usuarios
     * @return \Illuminate\Http\Response
     */
    public function edit(usuarios $usuarios)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\usuarios  $usuarios
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, usuarios $usuarios)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\usuarios  $usuarios
     * @return \Illuminate\Http\Response
     */
    public function destroy(usuarios $usuarios)
    {
        //
    }
}
