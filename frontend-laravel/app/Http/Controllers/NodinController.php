<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class NodinController extends Controller
{
    public function create(Request $request){
        if($request->isMethod('POST')){
            $type = '';
            if($request->input('action')=='approve'){
               $type = '2971dc40-23f7-4f04-90ab-a4b6b531a1e7';
            } else if($request->input('action')=='draft'){
                $type = '7a39d940-f3c3-4414-8306-18aa04eaece6';
            }
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
                'approval' => $approval,
                'typeId' => $type 
            ])->json();
            if($postingInfo['success']){
                return redirect()->route('nodin-all');
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
        $response = Http::withToken(session('access_token'))->get(env('API_URL').'nodin/draft')->json();
        $draft = $response['results'];
        return view('pages.document.draft', compact('draft'));
    }

    public function findAll(Request $request){
        $dash = Http::withToken(session('access_token'))->get(env('API_URL').'dashboard/nodin')->json();
        $response = Http::withToken(session('access_token'))->get(env('API_URL').'nodin')->json();
        $status = $dash['results'];
        $nodin = $response['results'];
        return view('pages.document.findall', compact('nodin', 'status'));
    }

    public function progress(Request $request){
        return view('pages.document.progress');
    }

    public function tagged(Request $request){
        return view('pages.document.tagged');
    }
}