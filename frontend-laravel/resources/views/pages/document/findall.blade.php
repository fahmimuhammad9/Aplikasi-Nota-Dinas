<x-app-layout>
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-12 col-xl-8">
                    <h3 class="font-weight-bold">Semua Nota Dinas</h3>
                </div>
                <div class="col-12 col-xl-4">
                    <div class="justify-content-end d-flex">
                        Nota Dinas / Semua Nota Dinas
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-2">
        <div class="col-md-12 transparent">
            <div class="row">
                <div class="col-md-3 mb-3 transparent">
                    <a href="" style="text-decoration: none;">
                    <div class="card card-tale">
                        <div class="card-body">
                            <p class="mb-4">Dokumen Draft Saya</p>
                            <p class="fs-30 mb-2">4006</p>
                        </div>
                    </div>
                    </a>
                </div>
                <div class="col-md-3 mb-3 transparent">
                    <a href="" style="text-decoration: none;">
                    <div class="card card-dark-blue text-white">
                        <div class="card-body">
                            <p class="mb-4">Dokumen Dalam Proses</p>
                            <p class="fs-30 mb-2">61344</p>
                        </div>
                    </div>
                    </a>
                </div>
                <div class="col-md-3 mb-3  transparent">
                    <a href="" style="text-decoration: none;">
                    <div class="card card-light-blue">
                        <div class="card-body">
                            <p class="mb-4">Surat Masuk</p>
                            <p class="fs-30 mb-2">34040</p>
                        </div>
                    </div>
                    </a>
                </div>
                <div class="col-md-3 mb-3 transparent">
                    <a href="" style="text-decoration: none;">
                    <div class="card card-light-danger">
                        <div class="card-body">
                            <p class="mb-4">Dokumen Di Tandai</p>
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
                        Semua Nota Dinas
                    </div>
                    <div class="table-responsive">
                    <table class="table" id="myTable">
                      <thead>
                        <tr>
                          <th>Pembuat</th>
                          <th>Tanggal Pengajuan</th>
                          <th>Perihal</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        @forelse($nodin as $item)
                        <tr>
                          <td>{{$item['fromUserRole'] . ' ' . $item['fromUserOrg']}}</td>
                          <td>{{date('d-m-Y',strtotime($item['upDate']))}}</td>
                          <td>{{$item['title']}}</td>
                          <td>
                            @if($item['isapprove'])
                            <label class="badge badge-success">{{$item['approvalStatus']}}</label>
                            @else
                            <label class="badge badge-warning">{{$item['approvalStatus']}}</label>
                            @endif
                          </td>
                          <td></td>
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