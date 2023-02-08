<x-auth-layout>
    <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth px-0">
            <div class="row w-100 mx-0">
                <div class="col-lg-4 mx-auto">
                    <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                        <h4>Aplikasi Nota Dinas</h4>
                        <h6 class="font-weight-light">PT. Pesonna Optima Jasa</h6>
                        @if(session()->has('error'))
                        <div class="alert alert-danger" role="alert">
                            {{session('error')}}
                        </div>
                        @endif
                        <form class="pt-3" action="{{route('login')}}" method="post">
                            @csrf
                            <div class="form-group">
                                <input type="text" class="form-control form-control-lg" id="username"
                                    placeholder="Masukkan Username" name="username">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control form-control-lg" id="password"
                                    name="password" placeholder="Masukkan Password">
                            </div>
                            <div class="mt-3">
                                <button class="btn btn-block btn-primary btn-sm auth-form-btn" type="submit">SIGN
                                    IN</button>
                            </div>
                            <div class="my-2 d-flex justify-content-between align-items-center">
                                <div class="form-check">
                                    <label class="form-check-label text-muted">
                               >
                                    </label>
                                </div>
                                <a href="#" class="auth-link text-black">Forgot password?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
</x-auth-layout>