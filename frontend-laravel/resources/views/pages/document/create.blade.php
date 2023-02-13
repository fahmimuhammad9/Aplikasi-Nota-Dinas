<x-app-layout>
  @push('styles')
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  @endpush
    <div class="row">
        <div class="col-md-12 mb-3">
            <div class="row">
                <div class="col-12 col-xl-8">
                    <h3 class="font-weight-bold">Buat Nota Dinas Baru</h3>
                </div>
                <div class="col-12 col-xl-4">
                    <div class="justify-content-end d-flex">
                        Nota Dinas / Buat Nota Dinas
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-8">
            <div class="card mb-3">
                <div class="card-body">
                  <form class="forms-sample" method="POST" action="{{route('nodin-create')}}" enctype="multipart/form-data">
                    @csrf
                    <div class="form-group">
                      <label for="exampleInputName1">Kepada</label>
                      <input type="text" class="form-control" value="{{$destName['roleName'] . ' ' . $destName['organizationName']}}"  disabled>
                      <input type="text" name="toUser" id="toUser" value="{{$destName['roleId']}}" hidden>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputName1">Dari</label>
                      <input type="text" class="form-control" id="" name="" value="{{$orginName['roleName'] . ' ' . $orginName['organizationName']}}" disabled>
                      <input type="text" name="fromUser" id="fromUser" value="{{$orginName['roleId']}}" hidden>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputName1">Perihal</label>
                      <input type="text" class="form-control" id="title" name="title" placeholder="Name">
                    </div>
                    <div class="form-group">
                      <label for="">Sifat</label>
                        <select class="form-control form-control-lg" id="char" name="char">
                          <option selected hidden>--Pilih Level Sifat Dokumen--</option>
                          @foreach($severity as $item)
                          <option value="{{$item['severityId']}}">{{$item['severityName']}}</option>
                          @endforeach
                        </select>
                    </div>
                    <div class="form-group">
                      <label for="">Urgensi</label>
                        <select class="form-control form-control-lg" id="urgent" name="urgent">
                          <option selected hidden>--Pilih Level Urgensi Dokumen--</option>
                          @foreach($severity as $item)
                          <option value="{{$item['severityId']}}">{{$item['severityName']}}</option>
                          @endforeach
                        </select>
                    </div>
                    <div class="form-group">
                      <label>Tanggal</label>
                      <input type="date" class="form-control" id="upDate" name="upDate" placeholder="Name">
                    </div>
                    <div class="form-group">
                      <label>Lampiran</label>
                      <input type="file" class="form-control" id="attach" name="attach" placeholder="Name">
                    </div>
                    <div class="form-group">
                      <label for="myeditorinstance">Textarea</label>
                      <textarea id="myeditorinstance" name="content"></textarea>
                    </div>
                    <button type="submit" name="action" value="approve" class="btn btn-primary me-2">Submit Nota Dinas</button>
                    <button type="submit" name="action" value="draft" class="btn btn-secondary text-white me-2">Simpan Sebagai Draft</button>
                  </form>
                </div>  
            </div>
        </div>
        <div class="col-md-4">
							<div class="card mb-3">
								<div class="card-body">
									<h4 class="card-title">Tahapan Persetujuan Anda</h4>
									<ul class="bullet-line-list">
                    @forelse($origin as $item)
										<li>
											<h6 class="text-primary">{{$item['userName']}}</h6>
											<p class="mb-3">{{$item['roleName'] . ' ' . $item['organizationName']}}</p>
										</li>
                    @empty
                    <li>
											<h6 class="text-danger">Warning</h6>
											<p class="text-danger">This User Didnt Have Approval Line </p>
										</li> 
                    @endforelse
									</ul>
								</div>
							</div>
              <div class="card">
              <div class="card-body">
                  <h4 class="card-title">Informasi Penting</h4>
                  <div class="mt-4">
                    <div class="accordion" id="accordion" role="tablist">
                      <div class="card">
                        <div class="card-header" role="tab" id="heading-1">
                          <h6 class="mb-0">
                            <a data-bs-toggle="collapse" href="#collapse-1" aria-expanded="false" aria-controls="collapse-1" class="collapsed">
                              How can I pay for an order I placed?
                            </a>
                          </h6>
                        </div>
                        <div id="collapse-1" class="collapse" role="tabpanel" aria-labelledby="heading-1" data-parent="#accordion" style="">
                          <div class="card-body">
                            <div class="row">
                              <div class="col-3">
                                <img src="../../../../images/samples/300x300/10.jpg" class="mw-100" alt="image">                              
                              </div>
                              <div class="col-9">
                                <p class="mb-0">You can pay for the product you have purchased using credit cards, debit cards, or via online banking. 
                                We also on-delivery services.</p>                          
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-header" role="tab" id="heading-2">
                          <h6 class="mb-0">
                            <a class="collapsed" data-bs-toggle="collapse" href="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
                              I can’t sign in to my account
                            </a>
                          </h6>
                        </div>
                        <div id="collapse-2" class="collapse" role="tabpanel" aria-labelledby="heading-2" data-parent="#accordion">
                          <div class="card-body">
                              <p>If while signing in to your account you see an error message, you can do the following</p>
                            <ol class="ps-3 mt-4">
                              <li>Check your network connection and try again</li>
                              <li>Make sure your account credentials are correct while signing in</li>
                              <li>Check whether your account is accessible in your region</li>
                            </ol>
                            <br>
                            <p class="text-success">
                              <i class="ti-alert-octagon me-2"></i>If the problem persists, you can contact our support.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-header" role="tab" id="heading-3">
                          <h6 class="mb-0">
                            <a class="collapsed" data-bs-toggle="collapse" href="#collapse-3" aria-expanded="false" aria-controls="collapse-3">
                              Can I add money to the wallet?
                            </a>
                          </h6>
                        </div>
                        <div id="collapse-3" class="collapse" role="tabpanel" aria-labelledby="heading-3" data-parent="#accordion">
                          <div class="card-body">
                            <p class="mb-0">You can add money to the wallet for any future transaction from your bank account using net-banking, or credit/debit card transaction. The money in the wallet can be used for an easier and faster transaction.</p>
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
    <script src="https://cdn.tiny.cloud/1/pia2empui472j7hrz4ag07l822epo4bcu32vzme0iugguhjo/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
    <script>
    tinymce.init({
        selector: 'textarea#myeditorinstance', // Replace this CSS selector to match the placeholder element for TinyMCE
        plugins: 'table lists',
        removed_menuitems: 'print',
        toolbar: 'undo redo | blocks| bold italic | bullist numlist checklist | table'
    });
</script>
    @endpush
</x-app-layout>
