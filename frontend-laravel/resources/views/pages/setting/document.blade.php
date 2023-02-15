<x-app-layout>
	@push('styles')
	<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
	@endpush
   <div class="row">
      <div class="col-md-12">
         <div class="row">
            <div class="col-12 col-xl-8">
               <h3 class="font-weight-bold">Pengaturan Dokumen</h3>
            </div>
            <div class="col-12 col-xl-4">
               <div class="justify-content-end d-flex">
                  Pengaturan / Dokumen
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="row">
      <div class="col">
         <div class="card">
            <div class="card-body">
               <div class="row">
                  <div class="col-2">
                     <ul class="nav nav-tabs nav-tabs-vertical-custom" role="tablist">
                        <li class="nav-item bottom-border">
                           <a class="nav-link active" id="home-tab-custom" data-bs-toggle="tab" href="#home-3" role="tab" aria-controls="home-3" aria-selected="true">
                           Kode Surat
                           </a>
                        </li>
                        <li class="nav-item">
                           <a class="nav-link" id="profile-tab-custom" data-bs-toggle="tab" href="#profile-3" role="tab" aria-controls="profile-3" aria-selected="false">
                           Margin Layout
                           </a>
                        </li>
                        <li class="nav-item">
                           <a class="nav-link" id="contact-tab-custom" data-bs-toggle="tab" href="#contact-3" role="tab" aria-controls="contact-3" aria-selected="false">
                           QR Code
                           </a>
                        </li>
                        <li class="nav-item">
                           <a class="nav-link" id="contact-tab-custom" data-bs-toggle="tab" href="#contact-3" role="tab" aria-controls="contact-3" aria-selected="false">
                           Approval
                           </a>
                        </li>
                     </ul>
                  </div>
                  <div class="col-10 col-lg-10">
                     <div class="tab-content tab-content-vertical tab-content-vertical-custom">
                        <div class="tab-pane fade active show" id="home-3" role="tabpanel" aria-labelledby="home-tab-custom">
                           <ul class="nav nav-pills nav-pills-success" id="pills-tab" role="tablist">
                              <li class="nav-item">
                                 <a class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Semua Kode</a>
                              </li>
                              <li class="nav-item">
                                 <a class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Pengguna Kode</a>
                              </li>
                           </ul>
                           <div class="tab-content" id="pills-tabContent">
                              <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                 <div class="row">
                                    <div class="d-flex justify-content-between align-middle mb-2">
                                       <h4>Semua Kode Surat</h4>
                                       <button class="btn btn-md btn-success text-white" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Tambah Kode Surat</button>
                                       <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                          <div class="modal-dialog" role="document">
                                             <div class="modal-content">
                                                <div class="modal-header">
                                                   <h5 class="modal-title" id="exampleModalLabel">Tambah Kode Surat</h5>
                                                   <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                                   <span aria-hidden="true">×</span>
                                                   </button>
                                                </div>
                                                <div class="modal-body">
                                                   <form class="forms-sample">
                                                      <div class="form-group">
                                                         <label for="exampleInputUsername1">Kode</label>
                                                         <input type="text" class="form-control form-control-sm" id="code" name="code" placeholder="Masukkan Kode Surat">
                                                      </div>
                                                      <div class="form-group">
                                                         <label for="exampleInputEmail1">Nama</label>
                                                         <input type="text" class="form-control form-control-sm" id="name" name="name" placeholder="Masukkan Nama Kode">
                                                      </div>
                                                      <div class="d-flex justify-content-end">
                                                         <button type="submit" class="btn btn-primary me-2">Submit</button>
                                                      </div>
                                                   </form>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="table-responsive">
                                    <table class="table" id="myTable">
                                       <thead>
                                          <tr>
                                             <th>Kode</th>
                                             <th>Nama</th>
                                             <th></th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          @foreach($code as $item)
                                          <tr>
                                             <td>{{$item['ocCode']}}</td>
                                             <td>{{$item['ocName']}}</td>
                                             <td>
                                                <a href="" class="btn btn-md btn-danger text-white"><i class="ti-trash"></i></a>
                                             </td>
                                          </tr>
                                          @endforeach
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                              <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                 <div class="row">
                                    <div class="d-flex justify-content-between">
                                       <h4>Semua Pengguna Kode</h4>
                                       <button class="btn btn-md btn-success text-white" type="button" data-bs-toggle="modal" data-bs-target="#codeUser">Tambah Pengguna Kode</button>
                                       <div class="modal fade" id="codeUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                          <div class="modal-dialog" role="document">
                                             <div class="modal-content">
                                                <div class="modal-header">
                                                   <h5 class="modal-title" id="exampleModalLabel">Tambah Pengguna Kode Surat</h5>
                                                   <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                                   <span aria-hidden="true">×</span>
                                                   </button>
                                                </div>
                                                <div class="modal-body">
                                                   <form class="forms-sample">
                                                      <div class="form-group">
                                                         <label for="exampleInputUsername1">Kode</label>
                                                         <select class="form-control form-control-lg" id="exampleSelectGender">
																				<option selected hidden>--Pilih Kode Surat--</option>
																				@foreach($code as $item)
																				<option value="{{$item['ocId']}}">{{$item['ocCode']}} ({{$item['ocName']}})</option>
																				@endforeach
																			</select>
                                                      </div>
                                                      <div class="form-group">
                                                         <label for="exampleInputEmail1">Pengguna</label>
                                                         <select class="form-control form-control-lg" id="exampleSelectGender">
																				<option selected hidden>--Pilih Pengguna--</option>
																				@foreach($user as $item)
																				<option value="{{$item['userId']}}">{{$item['userName']}}</option>
																				@endforeach
																			</select>
                                                      </div>
                                                      <div class="d-flex justify-content-end">
                                                         <button type="submit" class="btn btn-primary me-2">Submit</button>
                                                      </div>
                                                   </form>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="table-responsive">
                                    <table class="table">
                                       <thead>
                                          <tr>
                                             <th>Nama Pengguna</th>
                                             <th>Kode Surat</th>
                                             <th></th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <tr>
                                             <td>Jacob</td>
                                             <td>53275531</td>
                                             <td>
                                                <a href="" class="btn btn-md btn-danger text-white">
                                                <i class="ti-trash"></i>
                                                </a>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="tab-pane fade" id="profile-3" role="tabpanel" aria-labelledby="profile-tab-custom">
                           <div class="media">
                              <img class="align-self-center me-3 w-25 rounded" src="../../../../images/samples/300x300/15.jpg" alt="sample image">
                              <div class="media-body">
                                 <p>
                                    And until then, I can never die? I'm a thing. Fry, you can't just sit here in the dark listening to 
                                    classical music. Is today's hectic lifestyle making you tense and impatient? Is today's hectic lifestyle 
                                    making you tense and impatient?
                                 </p>
                                 <p>
                                    Robot 1-X, save my friends! And Zoidberg! Aww, it's true. I've been hiding it for so long. Fry, we have a 
                                    crate to deliver. Yes! In your face, Gandhi! Interesting. No, wait, the other thing: tedious.
                                 </p>
                                 <p>
                                    Five hours? Aw, man! Couldn't you just get me the death penalty? Yes! In your face, Gandhi! We're rescuing 
                                    ya. Yeah, I do that with my stupidness. With gusto.
                                 </p>
                              </div>
                           </div>
                        </div>
                        <div class="tab-pane fade" id="contact-3" role="tabpanel" aria-labelledby="contact-tab-custom">
                           <div class="media">
                              <div class="media-body">
                                 <h5 class="mt-0 mb-1">You've swallowed a planet!</h5>
                                 Did I mention we have comfy chairs? You hate me; you want to kill me! Well, go on! Kill me! KILL ME! I'm the Doctor, 
                                 I'm worse than everyone's aunt. *catches himself* And that is not how I'm introducing myself.
                              </div>
                              <img class="ms-3 w-25" src="../../../../images/samples/300x300/5.jpg" alt="sample image">
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   @push('scripts')
	<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
   <script>
      $(document).ready( function () {
              $('#myTable').DataTable();
				  $('.select2example').select2();
          } );
   </script>
   @endpush
</x-app-layout>