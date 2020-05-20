<?php

namespace App\Http\Controllers;
use App\usuarios;
use Illuminate\Support\Facades\Hash;
use App\Modelos;
use App\imgs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class ModelosController extends Controller
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
    public function aleatorio(Request $request)
    {
        if($request->id==1){
            if(self::checkModel($request->token,$request->userid)){
                $max =  Modelos::all()->max('id');
                $rand=rand(1,$max);
                $user =Modelos::where('id', $rand)->get()->first();
                if($user){
                    $imgs = DB::table('imgs')->pluck('path')->where('id',$rand);
                    $response = ['user' =>$user, 'log'=>true ,"imagenes"=>$imgs ];
                    return response()->json($response);
                }else{
                self::aleatorio($request->all());
                };
            }else{
                $response = ['sesion expirada' , 'log' =>false];
                    return response()->json($response);
            }
        }else{
            if(self::checkUser($request->token,$request->userid)){
                $max =  Modelos::all()->max('id');
                $rand=rand(1,$max);
                $user =Modelos::where('id', $rand)->get()->first();
                if($user){
                    $imgs = DB::table('imgs')->pluck('path')->where('id',$rand);
                    $response = ['user' =>$user, 'log'=>true ,"imagenes"=>$imgs ];
                    return response()->json($response);
                }else{
                self::aleatorio($request->all());
                };
            }else{
                $response = ['sesion expirada' , 'log' =>false];
                    return response()->json($response);
            }
        }
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $usuario = new Modelos();
        $req = request('contra');
        $password =  Hash::make($req);
        $datos = request('data');
        $guardar = json_decode($datos);
        $usuario->nombres = request('nombre');
        $usuario->apellidos = request('apellidos');
        $usuario->provincia = request('provincia');
        $usuario->ciudad = request('ciudad');
        $usuario->numero = request('numero');
        $usuario->DNI = request('dni');
        $usuario->correo = request('correo');
        $usuario->password =$password;
        $usuario->whatsapp = request('whatsapp');
        $usuario->estatura = request('estatura');
        $usuario->edad = request('edad');
        $usuario->medidas = request('medidas');
        $usuario->busto = request('busto');
        $usuario->piel = request('piel');
        $usuario->cabello = request('cabello');
        $usuario->ojos = request('ojos');
        $usuario->orientacion = request('orientacion');
        $usuario->preferencia = request('preferencia');
        $usuario->talla_pie = request('talla_pie');
        $usuario->img = request('img');
        $usuario->save();
        
        return compact($usuario);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeImg(Request $request)
    {
        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $fileName = $image->getClientOriginalName();
            $add = '';
            for($i = 0; $i <=4 ; $i++){
                $number = random_int( 0 , 60);
                $text = strval($number);
                $add = $add.''.$number;
            };
            $fileName = $add.$fileName;
            $destinationPath = base_path() . '/public/images/' . $fileName;
            $image->move($destinationPath, $fileName);
            $response = ["save" =>  $destinationPath];
            return response()->json($response);
        }else{
            $response = ['img' => $request->all(),'h'=>$request->file('img')];
            return response()->json($response);
        }
    }
    public function storeNewImg(Request $request)
    {
        if ($request->hasFile('img')){
            if(self::checkModel($request->token,$request->user)){
                   $image = $request->file('img');
                    $fileName = $image->getClientOriginalName();
                    $add = '';
                    for($i = 0; $i <=4 ; $i++){
                        $number = random_int( 0 , 60);
                        $text = strval($number);
                        $add = $add.''.$number;
                    };
                    $fileName = $add.$fileName;
                    $destinationPath = base_path() . '/public/images/' . $fileName;
                    $image->move($destinationPath, $fileName);
                if($user = Modelos::where('id', $request->user)->get()->first()){
                    $img = new imgs();
                    $img->path =$destinationPath;
                    $img->id =$request->user;
                    $img->save();
                    $response = ["save" =>  $destinationPath ,"user" =>$img];
                    return response()->json($response);
                }else{
                    $response = ["save" =>  'usuario no encontrado' ];
                    return response()->json($response);
                }
            }else{
                $response = ["save" =>  'token invalido' ];
                return response()->json($response);
            }     
        }else{
            $response = ['img' => $request->all(),'h'=>$request->file('img')];
            return response()->json($response);
        }
    }
    

    private function checkModel($token,$user){
        $user = Modelos::where('id', $user)->where('Auth_token',$token)->get()->first();
        if($user){
            return true;
        }else{
            return false;
        }
    }
    private function checkUser($token,$user)
    {
        $user = usuarios::where('id',$user)->where('Auth_token',$token)->get()->first();
        if($user){
            return true;
        }else{
            return false;
        }
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Modelos  $modelos
     * @return \Illuminate\Http\Response
     */
    public function show1(Request $request)
    {
    if($request->id == 1){
        if(self::checkModel($request->token,$request->user)){
                
            $user = Modelos::where('id', $request->user)->get()->first(); 
            if($user){
                $imgs = DB::table('imgs')->where('id',$request->user)->pluck('path');
                $response = ['user' =>$user, 'log'=>true , "imagenes"=>$imgs];
                return response()->json($response);
            }else{
                    $response = ['error'=>'nose encontro ninguno'];
                    return response()->json($response);
            };
         }else{
                $response = ['sesion expirada' , 'log' =>false];
                return response()->json($response);
            }
        }else{
            if(self::checkUser($request->token,$request->userid)){
                $user = Modelos::where('id', $request->user)->get()->first(); 
                if($user){
                    $imgs = DB::table('imgs')->pluck('path')->where('id',$request->user);
                    $response = ['user' =>$user, 'log'=>true , "imagenes"=>$imgs];
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
    }
    

    public function showAll(Request $request)
    {
        if($request->id == 1){
            if(self::checkModel($request->token,$request->user)){
                $busto = $request->busto;
                $estatura = $request->estatura;
                 $user =  Modelos::orderBy('id')->where("id",">",$request->cantidad)->estatura($estatura)->busto($busto)->get(['id','edad','provincia','ciudad','img','busto','nombres','orientacion'])->take(8);
                 $response =[ 'user'=>$user,'log'=>true,'cantidad' =>$request->cantidad];
                    return response()->json($response);
            }else{
                
                    $response = ['sesion expirada' , 'log' =>false];
                    return response()->json($response);
            };
        }else{
                   if(self::checkUser($request->token,$request->user)){
                       $busto = $request->busto;
                       $estatura = $request->estatura;
                        $user =  Modelos::orderBy('id')->where("id",">",$request->cantidad)->estatura($estatura)->busto($busto)->get(['id','edad','provincia','ciudad','img','busto','nombres','orientacion'])->take(8);
                        $response =[ 'user'=>$user,'log'=>true,'cantidad' =>$request->cantidad];
                        return response()->json($response);
                }else{
                    $response = ['sesion expirada' , 'log' =>false];
                    return response()->json($response);
                }
        }
    }
    public function destacados(Request $request)
    {
        if($request->id == 1){
            if(self::checkModel($request->token,$request->user)){
                $modelos =  Modelos::all()->where("destacado","=",1);
                $user = $modelos->pluck('id');
                $img = $modelos->pluck('img');
                $gusto = $modelos->pluck('orientacion');
                $nombres = $modelos->pluck('nombres');
                $response =[ 'user'=>$user,'img'=>$img,'gusto'=>$gusto,'nombres' => $nombres,'log'=>true];
                return response()->json($response);
            }else{
               
                $response = ['sesion expirada' , 'log' =>false];
                return response()->json($response);
            };
        }else{
            if(self::checkUser($request->token,$request->user)){
                $modelos =  Modelos::all()->where("destacado","=",1);
                $user = $modelos->pluck('id');
                $img = $modelos->pluck('img');
                $gusto = $modelos->pluck('orientacion');
                $nombres = $modelos->pluck('nombres');
                $response =[ 'user'=>$user,'img'=>$img,'gusto'=>$gusto,'nombres' => $nombres,'log'=>true];
                    return response()->json($response);
                }else{
                    $response = ['sesion expirada' , 'log' =>false];
                    return response()->json($response);
                }
        }
    }
  public function editar(Request $request)
    {
      
            if(self::checkModel($request->token,$request->user)){
                        $user = \App\Modelos::where('id', $request->user)->get()->first(); 
                        $user->nombres = $request->nombres;
                        $user->apellidos = $request->apellidos;
                        $user->ciudad = $request->ciudad;
                        $user->provincia = $request->provincia;
                        $user->numero = $request->numero;
                        $user->DNI = $request->dni;
                        $user->correo = $request->correo;

                        $user->whatsapp = $request->whatsapp;
                        $user->estatura = $request->estatura;
                        $user->edad = $request->edad;
                        $user->medidas = $request->medidas;
                        $user->busto = $request->busto;
                        $user->piel = $request->piel;
                        $user->cabello = $request->cabello;
                        $user->ojos = $request->ojos;
                        $user->orientacion = $request->orientacion;
                        $user->preferencia = $request->preferencia;
                        $user->talla_pie = $request->talla_pie;
                        $user->update();
                        $imgs = DB::table('imgs')->where('id',$request->user)->pluck('path');
                        $response =[ 'user'=>$user,'req'=>$request->nombres,'imagenes'=>$imgs, 'log'=>true];
                        return response()->json($response);
                }else{
                if(self::checkUser($request->token,$request->user)){
                 
                    return response()->json($response);
                if($user){
                    $response = $user;
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
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Modelos  $modelos
     * @return \Illuminate\Http\Response
     */
    public function edit(Modelos $modelos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Modelos  $modelos
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Modelos $modelos)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Modelos  $modelos
     * @return \Illuminate\Http\Response
     */
    public function destroy(Modelos $modelos)
    {
        //
    }
}
