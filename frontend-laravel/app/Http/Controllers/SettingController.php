<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class SettingController extends Controller
{
    public function documentSetting(Request $request){
        $response_code = Http::withToken(session('access_token'))->get(env('API_URL').'nodin/code')->json();
        $response_user = Http::withToken(session('access_token'))->get(env('API_URL').'user')->json();
        $user = $response_user['results'];
        $code = $response_code['results'];
        return view('pages.setting.document', compact('code', 'user'));
    }

    public function userSetting(Request $request){
        $response = Http::withToken(session('access_token'))->get(env('API_URL').'user')->json();
        $user = $response['results'];
        return view('pages.setting.user', compact('user'));
    }

    public function deleteEditUser(Request $request, $id){
        $response = Http::withToken(session('access_token'))->withOptions([
            'query' => [
                'userId' => $id
            ]
        ])->delete(env('API_URL').'user')->json();
        if($response['success']){
            return redirect()->route('setting-user')->with('success', $response['message']);
        }else{
            return redirect()->back()->with('error', $response['message']);
        }
    }

    public function detailUser(Request $request, $id){
        $response = Http::withToken(session('access_token'))->withOptions([
            'query' => [
                'userId' => $id
            ]
        ])->get(env('API_URL').'user/detail')->json();
        $detail = $response['results'];
        return view('pages.setting.detail-user', compact('detail'));
    }

    public function addUser(Request $request){
        if($request->isMethod('POST')){
            $response = Http::withToken(session('access_token'))->post(env('API_URL').'user',[
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => $request->password1,
                'roleId' => $request->role,
                'organizationId' => $request->org 
            ])->json();
            if($response['success']){
                return redirect()->route('setting-user')->with('success', $response['message']);
            } else {
                return redirect()->back()->with('error', $response['message']);
            }
        }
        $response = Http::withToken(session('access_token'))->get(env('API_URL').'organization')->json();
        $response2 = Http::withToken(session('access_token'))->get(env('API_URL').'roles')->json();

        $org = $response['results'];
        $roles = $response2['results'];
        return view('pages.setting.add-user', compact('org', 'roles'));
    }

    public function orgSetting(Request $request){
        $response = Http::withToken(session('access_token'))->get(env('API_URL').'organization')->json();
        $org = $response['results'];
        return view('pages.setting.auth', compact('org'));
    }

    public function orgDetail(Request $request, $id){
        $response = Http::withToken(session('access_token'))->withOptions([
            'query' => [
                'organizationId' => $id
            ]
        ])->get(env('API_URL').'organization/detail')->json();  
        $detail = $response['results'];

        return view('pages.setting.detail-org', compact('detail'));
    }
}