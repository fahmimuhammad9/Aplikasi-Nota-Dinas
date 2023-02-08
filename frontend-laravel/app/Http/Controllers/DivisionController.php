<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class DivisionController extends Controller
{
    public function index(Request $request){
        return view('pages.division.findall');
    }

    public function mine(Request $request){
        return view('pages.division.mine');
    }

    public function status(Request $request){
        return view('pages.division.stats');
    }
}