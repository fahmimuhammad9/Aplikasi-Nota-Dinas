<x-app-layout>
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-12 col-xl-8">
                    <h3 class="font-weight-bold">{{$detail['orgName']}}</h3>
                </div>
                <div class="col-12 col-xl-4">
                    <div class="justify-content-end d-flex">
                        Pengaturan / Detail Organisasi 
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-3">
        <div class="col-md-12 transparent">
            <div class="row">
                <div class="col-md-4 mb-3 transparent">
                    <a href="" style="text-decoration: none;">
                    <div class="card card-tale">
                        <div class="card-body">
                            <p class="mb-4">Nota Dinas Dibuat</p>
                            <p class="fs-30 mb-2">4006</p>
                        </div>
                    </div>
                    </a>
                </div>
                <div class="col-md-4 mb-3 transparent">
                    <a href="" style="text-decoration: none;">
                    <div class="card card-dark-blue text-white">
                        <div class="card-body">
                            <p class="mb-4">Memo Dibuat</p>
                            <p class="fs-30 mb-2">61344</p>
                        </div>
                    </div>
                    </a>
                </div>
                <div class="col-md-4 mb-3 transparent">
                    <a href="" style="text-decoration: none;">
                    <div class="card card-light-danger">
                        <div class="card-body">
                            <p class="mb-4">Total Draft</p>
                            <p class="fs-30 mb-2">47033</p>
                        </div>
                    </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-3">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <div class="card-title">
                        Anggota
                    </div>
                    <div class="table-responsive">
                    <table class="table" id="myTable">
                      <thead>
                        <tr>
                          <th>Nama</th>
                          <th>Jabatan</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        @foreach($detail['team'] as $item)
                        <tr>
                            <td>{{$item['userName']}}</td>
                            <td>{{$item['roleName']}}</td>
                            <td>
                                <a href="" class="btn btn-md btn-outline-success">
                                    <i class="ti-eye"></i>
                                </a>
                                <a href="" class="btn btn-md btn-outline-warning">
                                    <i class="ti-write"></i>
                                </a>
                            </td>
                        </tr>
                        @endforeach
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">  
            <div class="card">
                <div class="card-body">
                    <div class="card-title">
                        Organisasi Induk
                    </div>
                    <ul class="bullet-line-list">
                        @forelse($detail['parent'] as $item)
                        <li>
							<h6>{{$item['orgName']}}</h6>
							<p class="text-muted mb-4">
								<i class="ti-time"></i>
								7 months ago.
							</p>
						</li>
                        @empty
                        <li>
							<h6>You Are Top of The King</h6>
							<p>No Need Explanation From Anyone Your Are The King </p>
							<p class="text-muted mb-4">
								<i class="ti-time"></i>
								7 months ago.
							</p>
						</li>
                        @endforelse
					</ul>
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