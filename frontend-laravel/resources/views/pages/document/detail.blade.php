<x-app-layout>
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-12 col-xl-8">
                    <h3 class="font-weight-bold">Informasi Nota Dinas </h3>
                </div>
                <div class="col-12 col-xl-4">
                    <div class="justify-content-end d-flex">
                        Nota Dinas / Detail
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
              <div class="col-md-9">
                  <div class="card px-2">
                      <div class="card-body">
                          <div class="container-fluid">
                            <h3 class="text-center mt-2"><u><b>Nota Dinas</b></u></h3>
                            <h4 class="text-center"><b>No.</b></h4>
                            <table>
                              <tbody>
                                <tr>
                                  <td>Kepada</td>
                                  <td>: {{$detail['toUserRole']}}</td>
                                </tr>
                                <tr>
                                  <td>Dari</td>
                                  <td>: {{$detail['fromUserRole']}}</td>
                                </tr>
                                <tr>
                                  <td>Tanggal</td>
                                  <td>: {{date('d-m-Y', strtotime($detail['upDate']))}}</td>
                                </tr>
                                <tr>
                                  <td>Lampiran</td>
                                  <td>: 1 Bundle Lampiran</td>
                                </tr>
                                <tr>
                                  <td>Sifat</td>
                                  <td>: {{$detail['charSeverityName']}}</td>
                                </tr>
                                <tr>
                                  <td>Urgensi</td>
                                  <td>: {{$detail['urgentSeverityName']}}</td>
                                </tr>
                                <tr>
                                  <td>Perihal</td>
                                  <td>: {{$detail['title']}}</td>
                                </tr>
                              </tbody>
                            </table>
                            <hr>
                          </div>
                          <div class="row">
                            <div class="col-xl mx-5">
                              {!!$detail['content']!!}
                            </div>
                          </div>
                          <div class="row mt-4">
                            <div class="col-xl-9">
                            </div>
                            <div class="col-xl-3 text-center">
                              <h5><b>{{$detail['fromUserRole']}}</b></h5>
                              <img src="https://picsum.photos/150/80" alt="" class="my-3">
                              <h5><b><u>{{$detail['fromUserRole']}}</u></b></h5>
                              <h5><b>NIP. 29293823</b></h5>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-md-3">
                <div class="card">
                  <div class="card-body">
                    <div class="row px-2">
                        <a href="" class="btn btn-block btn-outline-primary"><i class="ti-print"></i> Print</a>
                    </div>
                    <div class="row mt-2 px-2">
                        <a href="" class="btn btn-block btn-outline-success"><i class="ti-print"></i> Approve</a>
                    </div>
                    <div class="row mt-2 px-2">
                        <a href="" class="btn btn-block btn-outline-warning"><i class="ti-print"></i> Reject</a>
                    </div>
                  </div>
                </div>
                <div class="card mt-3">
                <div class="card-body">
									<h4 class="card-title">Approval</h4>
                  @forelse($detail['approval'] as $item)
									<div class="d-flex align-items-center pb-3 border-bottom">
										<div class="ms-3 mt-3">
											<h6 class="mb-1">{{$item['approvalPersonName']}}</h6>
											<small class="text-muted mb-0"><i class="ti-user me-1"></i>{{$item['approvalPersonRole'] . ', ' . $item['approvalPersonOrganization']}}</small>
										</div>
                    @if($item['isapprove'])
										<i class="ti-check font-weight-bold ms-auto px-1 py-1 text-success mdi-24px"></i>
                    @else
                    <i class="ti-close font-weight-bold ms-auto px-1 py-1 text-danger mdi-24px"></i>
                    @endif
									</div>
                  @empty
                  @endforelse
								  </div>
                </div>
              </div>
          </div>
</x-app-layout>