<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class DivisionController extends Controller
{
    public function index(Request $request){
        $chart = Http::withToken(session('access_token'))->get(env('API_URL').'organization/division')->json();
        $chartdiv = $chart['step'];
        $chartnode = $chart['results'];
        $data = json_encode($chartdiv);
        $nodes = json_encode($chartnode);
        return view('pages.division.findall', compact('data', 'nodes'));
    }

    public function mine(Request $request){
        return view('pages.division.mine');
    }

    public function status(Request $request){
        return view('pages.division.stats');
    }
}