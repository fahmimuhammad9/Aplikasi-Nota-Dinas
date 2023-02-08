<x-app-layout>
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-12 col-xl-8">
                    <h3 class="font-weight-bold">Pengaturan Pengguna</h3>
                </div>
                <div class="col-12 col-xl-4">
                    <div class="justify-content-end d-flex">
                        Pengaturan / Pengguna
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-2">
        <div class="col-md-12 transparent">
            <div class="row">
                <div class="col-md-4 mb-3 transparent">
                    <a href="" style="text-decoration: none;">
                    <div class="card card-tale">
                        <div class="card-body">
                            <p class="mb-4">Pengguna Aktif</p>
                            <p class="fs-30 mb-2">4006</p>
                        </div>
                    </div>
                    </a>
                </div>
                <div class="col-md-4 mb-3 transparent">
                    <a href="" style="text-decoration: none;">
                    <div class="card card-dark-blue text-white">
                        <div class="card-body">
                            <p class="mb-4">Pengguna Online</p>
                            <p class="fs-30 mb-2">61344</p>
                        </div>
                    </div>
                    </a>
                </div>
                <div class="col-md-4 mb-3 transparent">
                    <a href="" style="text-decoration: none;">
                    <div class="card card-light-danger">
                        <div class="card-body">
                            <p class="mb-4">Pengguna Tidak Aktif</p>
                            <p class="fs-30 mb-2">47033</p>
                        </div>
                    </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <div class="card-title">
                    <div class="row">
                        <div class="col-12 col-xl-8">
                            <h3 class="font-weight-bold">Semua Pengguna</h3>
                        </div>
                        <div class="col-12 col-xl-4">
                            <div class="justify-content-end d-flex">
                                <a class="btn btn-success btn-md text-white" href="{{route('setting-user-add')}}">Tambah Pengguna</a>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="table-responsive">
                    <table class="table" id="myTable">
                      <thead>
                        <tr>
                          <th>Nama</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Nomor HP</th>
                          <th>Sistem Aktor</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>
        </div>
    </div>
    @push('scripts')
    <script>
        $(document).ready( function () {
            $('#myTable').DataTable();
        } );
    </script>
    @endpush
</x-app-layout>