<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class SettingController extends Controller
{
    public function userSetting(Request $request){
        return view('pages.setting.user');
    }

    public function addUser(Request $request){
        $response = Http::withToken(session('access_token'))->get(env('API_URL').'organization')->json();
        $response2 = Http::withToken(session('access_token'))->get(env('API_URL').'roles')->json();

        $org = $response['results'];
        $roles = $response2['results'];
        return view('pages.setting.add-user', compact('org', 'roles'));
    }

    public function orgSetting(Request $request){
        return view('pages.setting.auth');
    }
}