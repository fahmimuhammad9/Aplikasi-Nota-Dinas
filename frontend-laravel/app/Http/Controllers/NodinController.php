<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class NodinController extends Controller
{
    public function create(Request $request){
        if($request->isMethod('POST')){
            $response = Http::withToken(session('access_token'))->get(env('API_URL').'nodin/origin')->json();
            $approval = $response['results'];
            $postingInfo = Http::withToken(session('access_token'))->post(env('API_URL').'nodin',[
                'fromUser' => $request->fromUser,
                'toUser' => $request->toUser,
                'upDate' => $request->upDate,
                'charSeverity' => $request->char,
                'urgentSeverity' => $request->urgent,
                'title' => $request->title,
                'content' => $request->content,
                'approval' => $approval
            ])->json();
            if($postingInfo['success']){
                return redirect()->route('nodin');
            }else {
                return redirect()->back()->with('error', $postingInfo['message']);
            }
        }
        $response = Http::withToken(session('access_token'))->get(env('API_URL').'nodin/origin')->json();
        $destName = end($response['results']);
        $orginName = $response['results'][count($response['results'])-2];
        $origin = $response['results'];

        $response2 = Http::withToken(session('access_token'))->get(env('API_URL').'nodin/severity')->json();
        $severity = $response2['results'];
        return view('pages.document.create', compact('origin', 'destName', 'orginName', 'severity'));
    }

    public function detail(Request $request, $id){
        $response = Http::withToken(session('access_token'))->withOptions([
            'query' => [
                'nodinId' => $id
            ]
        ])->get(env('API_URL').'nodin/detail')->json();
        $detail = $response['results'];
        return view('pages.document.detail', compact('detail'));
    }

    public function draft(Request $request){
        return view('pages.document.draft');
    }

    public function findAll(Request $request){
        $response = Http::withToken(session('access_token'))->get(env('API_URL').'nodin')->json();
        $nodin = $response['results'];
        return view('pages.document.findall', compact('nodin'));
    }

    public function progress(Request $request){
        return view('pages.document.progress');
    }

    public function tagged(Request $request){
        return view('pages.document.tagged');
    }
}