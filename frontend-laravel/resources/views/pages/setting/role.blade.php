<x-app-layout>
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-12 col-xl-8">
                    <h3 class="font-weight-bold">Pengaturan Kewenangan</h3>
                </div>
                <div class="col-12 col-xl-4">
                    <div class="justify-content-end d-flex">
                        Pengaturan / Kewenangan
                    </div>
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
                            <h3 class="font-weight-bold">Semua Peran</h3>
                        </div>
                        <div class="col-12 col-xl-4">
                            <div class="justify-content-end d-flex">
                                <a class="btn btn-success btn-md text-white" href="{{route('setting-user-add')}}">Tambah Peran Baru</a>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="table-responsive">
                    <table class="table" id="myTable">
                      <thead>
                        <tr>
                          <th>Nama</th>
                          <th>Level</th>
                          <th>Organisasi</th>
                          <th>Nomor HP</th>
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