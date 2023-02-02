<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        if(session('access_token')!== null){
            return redirect('/dashboard');
        }
        if ($request->isMethod('POST')) {
            $validator = Validator::make($request->all(),[
                'username' => 'required|min:5',
                'password' => 'required|min:8'
            ]);
            if ($validator->fails()) {
                return redirect()
                        ->route('login')
                        ->withErrors($validator->errors())
                        ->withInput($request->all());
            }
            $response = Http::post(env('API_URL').'login',[
                'username' => $request->username,
                'password'=> $request->password
            ])->json();

            if($response['success']===true){
                session()->put('access_token',$response['token']);
                session()->put('roles','superuser');
                return redirect('/dashboard'); 
            } else {
                dd($response);
            }
        }
        return view('pages.auth.login');
    }
}
