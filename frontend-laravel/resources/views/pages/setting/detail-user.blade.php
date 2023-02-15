<x-app-layout>
   <div class="row">
      <div class="col-md-12">
         <div class="row">
            <div class="col-12 col-xl-8">
               <h3 class="font-weight-bold">Detail Pengguna</h3>
            </div>
            <div class="col-12 col-xl-4">
               <div class="justify-content-end d-flex">
                  Pengaturan / Pengguna / {{$detail['userName']}}
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="row">
   <div class="col-md-12">
      <div class="card">
         <div class="card-body">
            <div class="row">
               <div class="col-lg-4">
                  <div class="border-bottom text-center pb-4">
                     <div class="mb-3 mt-3">
                        <h3>{{$detail['userName']}}</h3>
                        <div class="d-flex align-items-center justify-content-center">
                           <h5 class="mb-0 me-2 text-muted">{{$detail['roleName']}}</h5>
                        </div>
                     </div>
                     <p class="w-75 mx-auto mb-3">{{$detail['orgName']}}</p>
                     <div class="row px-3 mb-2">
                        <button class="btn btn-block btn-warning text-white">Edit Informasi</button>
                     </div>
                     <div class="row px-3 mb-2">
                        <button class="btn btn-block btn-danger text-white">Hapus Pengguna</button>
                     </div>
                  </div>
                  <div class="border-bottom py-4">
                     <p>Asal Kode Surat</p>
                     <div>
                        <label class="badge badge-outline-dark">KEU</label>
                        <label class="badge badge-outline-dark">TI</label>
                     </div>
                  </div>
                  <div class="border-bottom py-4">
                     <p>Informasi Pribadi</p>
                     <table>
                        <tbody>
                           <tr>
                              <td>Nama Lengkap</td>
                              <td>:</td>
                              <td>{{$detail['userName']}}</td>
                           </tr>
                           <tr>
                              <td>Username</td>
                              <td>:</td>
                              <td>{{$detail['userUsername']}}</td>
                           </tr>
                           <tr>
                              <td>Nomor Handphone</td>
                              <td>:</td>
                              <td>{{$detail['userPhone']}}</td>
                           </tr>
                           <tr>
                              <td>Email</td>
                              <td>:</td>
                              <td>{{$detail['userEmai']}}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <div class="py-4">
                     <p class="clearfix">
                        <span class="float-left">
                        Dibuat Oleh
                        </span>
                        <span class="float-right text-muted">
                        {{$detail['createdBy']}}
                        </span>
                     </p>
                     <p class="clearfix">
                        <span class="float-left">
                        Dibuat Pada
                        </span>
                        <span class="float-right text-muted">
                        {{date('H:i:s d-m-Y', strtotime($detail['createdAt']))}}
                        </span>
                     </p>
                     <p class="clearfix">
                        <span class="float-left">
                        Diperbarui Oleh
                        </span>
                        <span class="float-right text-muted">
                        {{$detail['updatedBy']}}
                        </span>
                     </p>
                     <p class="clearfix">
                        <span class="float-left">
                        Diperbarui Pada
                        </span>
                        <span class="float-right text-muted">
                        {{date('H:i:s d-m-Y', strtotime($detail['updatedAt']))}}
                        </span>
                     </p>
                  </div>
                  <button class="btn btn-primary btn-block mb-2">Preview</button>
               </div>
               <div class="col-lg-8">
                  <div class="mt-3 py-2">
                     <ul class="nav nav-pills nav-pills-success" id="pills-tab" role="tablist">
                        <li class="nav-item">
                           <a class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"><i class="ti-clipboard"></i> Nota Dinas</a>
                        </li>
                        <li class="nav-item">
                           <a class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false"><i class="ti-notepad"></i> Memo</a>
                        </li>
                        <li class="nav-item">
                           <a class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false"><i class="ti-email"></i> Surat</a>
                        </li>
                     </ul>
                     <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade active show" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                           <div class="table-responsive">
                              <table class="table">
                                 <thead>
                                    <tr>
                                       <th>Profile</th>
                                       <th>VatNo.</th>
                                       <th>Created</th>
                                       <th>Status</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <tr>
                                       <td>Jacob</td>
                                       <td>53275531</td>
                                       <td>12 May 2017</td>
                                       <td><label class="badge badge-danger">Pending</label></td>
                                    </tr>
                                    <tr>
                                       <td>Messsy</td>
                                       <td>53275532</td>
                                       <td>15 May 2017</td>
                                       <td><label class="badge badge-warning">In progress</label></td>
                                    </tr>
                                    <tr>
                                       <td>John</td>
                                       <td>53275533</td>
                                       <td>14 May 2017</td>
                                       <td><label class="badge badge-info">Fixed</label></td>
                                    </tr>
                                    <tr>
                                       <td>Peter</td>
                                       <td>53275534</td>
                                       <td>16 May 2017</td>
                                       <td><label class="badge badge-success">Completed</label></td>
                                    </tr>
                                    <tr>
                                       <td>Dave</td>
                                       <td>53275535</td>
                                       <td>20 May 2017</td>
                                       <td><label class="badge badge-warning">In progress</label></td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>
                        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                           <div class="table-responsive">
                              <table class="table">
                                 <thead>
                                    <tr>
                                       <th>Profile</th>
                                       <th>VatNo.</th>
                                       <th>Created</th>
                                       <th>Status</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <tr>
                                       <td>Jacob</td>
                                       <td>53275531</td>
                                       <td>12 May 2017</td>
                                       <td><label class="badge badge-danger">Pending</label></td>
                                    </tr>
                                    <tr>
                                       <td>Messsy</td>
                                       <td>53275532</td>
                                       <td>15 May 2017</td>
                                       <td><label class="badge badge-warning">In progress</label></td>
                                    </tr>
                                    <tr>
                                       <td>John</td>
                                       <td>53275533</td>
                                       <td>14 May 2017</td>
                                       <td><label class="badge badge-info">Fixed</label></td>
                                    </tr>
                                    <tr>
                                       <td>Peter</td>
                                       <td>53275534</td>
                                       <td>16 May 2017</td>
                                       <td><label class="badge badge-success">Completed</label></td>
                                    </tr>
                                    <tr>
                                       <td>Dave</td>
                                       <td>53275535</td>
                                       <td>20 May 2017</td>
                                       <td><label class="badge badge-warning">In progress</label></td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>
                        <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                           <div class="table-responsive">
                              <table class="table">
                                 <thead>
                                    <tr>
                                       <th>Profile</th>
                                       <th>VatNo.</th>
                                       <th>Created</th>
                                       <th>Status</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <tr>
                                       <td>Jacob</td>
                                       <td>53275531</td>
                                       <td>12 May 2017</td>
                                       <td><label class="badge badge-danger">Pending</label></td>
                                    </tr>
                                    <tr>
                                       <td>Messsy</td>
                                       <td>53275532</td>
                                       <td>15 May 2017</td>
                                       <td><label class="badge badge-warning">In progress</label></td>
                                    </tr>
                                    <tr>
                                       <td>John</td>
                                       <td>53275533</td>
                                       <td>14 May 2017</td>
                                       <td><label class="badge badge-info">Fixed</label></td>
                                    </tr>
                                    <tr>
                                       <td>Peter</td>
                                       <td>53275534</td>
                                       <td>16 May 2017</td>
                                       <td><label class="badge badge-success">Completed</label></td>
                                    </tr>
                                    <tr>
                                       <td>Dave</td>
                                       <td>53275535</td>
                                       <td>20 May 2017</td>
                                       <td><label class="badge badge-warning">In progress</label></td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</x-app-layout>