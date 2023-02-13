<x-app-layout>
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-12 col-xl-8">
                    <h3 class="font-weight-bold">Organisasi</h3>
                </div>
                <div class="col-12 col-xl-4">
                    <div class="justify-content-end d-flex">
                        Pengaturan / Organisasi
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
                            <h3 class="font-weight-bold">Semua Organisasi</h3>
                        </div>
                        <div class="col-12 col-xl-4">
                            <div class="justify-content-end d-flex">
                                <a class="btn btn-success btn-md text-white" href="{{route('setting-user-add')}}">Tambah Organisasi</a>
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
                          <th>Induk</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        @forelse($org as $item)
                        <tr>
                            <td>
                                {{$item['organizationName']}}
                            </td>
                            <td>
                                {{$item['organizationLevel']}}
                            </td>
                            <td>
                                {{$item['organizationParent']}}
                            </td>
                            <td>
                                <a href="" class="btn btn-md btn-outline-success">
                                    <i class="ti-eye"></i>
                                </a>
                                <a href="" class="btn btn-md btn-outline-danger">
                                    <i class="ti-trash"></i>
                                </a>
                            </td>
                        </tr>
                        @empty
                        @endforelse
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