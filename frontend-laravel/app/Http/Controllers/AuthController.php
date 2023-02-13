<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        if($request->session()->has('access_token')){
            return redirect('/dashboard');
        }
        if ($request->isMethod('POST')) {
            $request->validate([
                'username' => 'required|min:8',
                'password' => 'required'
            ]);
            
            $response = Http::post(env('API_URL').'login',[
                'username' => $request->username,
                'password'=> $request->password
            ])->json();

            if($response['success']===true){
                session()->put('access_token',$response['token']);
                session()->put('roles',$response['role']);
                session()->put('user_name', $response['name']);
                return redirect('/dashboard'); 
            } else {
                return redirect()->back()->with('error', $response['message']);
            }
        }
        return view('pages.auth.login');
    }


    public function register(Request $request)
    {
        if ($request->isMethod('POST')) {
            return $this->_submitRegister($request);
        }
        return view('pages.auth.register');
    }

    public function logout(Request $request){
        $request->session()->flush();
        return redirect('/login');
    }

}
