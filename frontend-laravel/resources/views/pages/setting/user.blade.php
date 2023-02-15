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
   <div class="row">
      <div class="col">
         @if(session()->has('success'))
         <div class="alert alert-success text-center" role="alert">
            {{session('success')}}
         </div>
         @endif
         @if(session()->has('error'))
         <div class="alert alert-danger text-center" role="alert">
            {{session('error')}}
         </div>
         @endif
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
                           <th>Aksi</th>
                        </tr>
                     </thead>
                     <tbody>
                        @forelse($user as $item)
                        <tr>
                           <td>
                              {{$item['userName']}}
                           </td>
                           <td>
                              {{$item['userUsername']}}
                           </td>
                           <td>
                              {{$item['userEmail']}}
                           </td>
                           <td>
                              {{$item['userPhone']}}
                           </td>
                           <td>
                              <a href="{{route('setting-user-detail', $item['userId'])}}" class="btn btn-md btn-outline-success">
                                <i class="ti-eye"></i>
                              </a>
                              <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-md btn-outline-danger">
                                <i class="ti-trash"></i>
                              </button>
                              <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                 <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                       <div class="modal-header">
                                          <h5 class="modal-title" id="exampleModalLabel">Hapus User <b>{{$item['userUsername']}}</b></h5>
                                          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                          <span aria-hidden="true">×</span>
                                          </button>
                                       </div>
                                       <div class="modal-body">
                                          <div class="row">
                                             <div class="col">
                                                <p class="text-left align-item-middle">
                                                   Anda akan menghapus pengguna <b>{{$item['userName']}}</b>? <br>
                                                   Langkah ini tidak dapat di ulang, Klik <button class="btn btn-danger" disabled>Delete</button> untuk Hapus
                                                </p>
                                             </div>
                                          </div>
                                          <div class="row">
                                             <div class="col">
                                                <button class="btn btn-secondary text-white" data-bs-dismiss="modal">Batalkan</button>
                                                <a href="{{route('setting-user-edit-delete',$item['userId'])}}" class="btn btn-danger text-white">Delete</a>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
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