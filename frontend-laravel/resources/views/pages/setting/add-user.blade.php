<x-app-layout>
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-12 col-xl-8">
                    <h3 class="font-weight-bold">Tambah Pengguna</h3>
                </div>
                <div class="col-12 col-xl-4">
                    <div class="justify-content-end d-flex">
                        Pengaturan / Tambah Pengguna
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                <div class="card-title">
                    Tambah Pengguna (Single)
                </div>
                <form class="forms-sample">
                    <div class="form-group">
                      <label for="exampleInputName1">Nama Lengkap</label>
                      <input type="text" class="form-control" placeholder="Masukkan Nama Lengkap" name="name" id="name">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail3">Nama Pengguna</label>
                      <input type="text" class="form-control" placeholder="Masukkan Nama Pengguna" name="username" id="username">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail3">Email</label>
                      <input type="email" class="form-control" placeholder="Masukkan Email" name="email" id="email">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail3">Nomor HP</label>
                      <input type="number" class="form-control" placeholder="Masukkan Nomor HP" name="phone" id="phone">
                    </div>
                    <div class="form-group">
                      <label for="exampleSelectGender">Organisasi</label>
                        <select class="form-control form-control-lg" id="org" name="org">
                            <option value="" selected hidden>--Pilih Organisasi Pengguna--</option>
                            @forelse($org as $item)
                            <option value="{{$item['organizationId']}}">{{$item['organizationName']}} ({{$item['organizationParent']}})</option>
                            @empty
                            <option value="">Tidak Ada Organisasi Tersedia Tersedia</option>
                            @endforelse
                        </select>
                      </div>
                      <div class="form-group">
                      <label for="exampleSelectGender">Jabatan</label>
                        <select class="form-control form-control-lg" id="role" name="role">
                            <option value="" selected hidden>--Pilih Jabatan Pengguna--</option>
                            @forelse($roles as $item)
                            <option value="{{$item['roleId']}}">{{$item['roleName']}}</option>
                            @empty
                            <option value="">Tidak Ada Jabatan Tersedia</option>
                            @endforelse
                        </select>
                      </div>
                    <div class="form-group">
                      <label for="exampleInputPassword4">Kata Sandi</label>
                      <input type="password" class="form-control" placeholder="Masukkan Kata Sandi" id="password1" name="password1">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword4">Konfirmasi Kata Sandi</label>
                      <input type="password" class="form-control" placeholder="Konfirmasi Kata Sandi" id="password2" name="password2">
                      <div class="passmessage"></div>
                      <small id="passmessage"></small>
                    </div>
                    <button type="submit" class="btn btn-primary me-2">Submit</button>
                    <button class="btn btn-light">Cancel</button>
                  </form>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <div class="card-title">
                        Tambah Pengguna (CSV)
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <a href="" class="btn btn-md btn-info">Download Format CSV</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @push('scripts')
    <script>
        var password1 = document.getElementById("password1");
        var password2 = document.getElementById("password2");
        var message = document.getElementById("passmessage");

        password2.oninput = function(){
            if(password1.value != password2.value){
                message.innerHTML = "<small class='text-danger'>Password Do Not Match</small>"
            } else {
                message.innerHTML = "<small class='text-success'>Password Match</small>"
            }
        }
    </script>
    @endpush
</x-app-layout>