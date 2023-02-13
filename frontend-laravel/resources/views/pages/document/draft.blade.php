<x-app-layout>
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-12 col-xl-8">
                    <h3 class="font-weight-bold">Draft Saya</h3>
                </div>
                <div class="col-12 col-xl-4">
                    <div class="justify-content-end d-flex">
                        Nota Dinas / Draft Saya
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-body">
                <div class="table-responsive">
                    <table id="myTable" class="table table-hover">
                      <thead>
                        <tr>
                          <th>Perihal</th>
                          <th>Tanggal</th>
                          <th>Urgensi / Karakter</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        @foreach($draft as $item)
                        <tr>
                          <td>{{$item['title']}}</td>
                          <td>{{date('d-m-Y',strtotime($item['upDate']))}}</td>
                          <td>
                            <span class="badge badge-primary">{{$item['urgentSeverityName']}} / {{$item['charSeverityName']}}</span>
                          </td>
                          <td>
                            <a href="" class="btn btn-md btn-outline-success">
                              <i class="ti-eye"></i>
                            </a>
                            <a href="" class="btn btn-md btn-outline-warning">
                              <i class="ti-trash"></i>
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
    </div>
    @push('scripts')
    <script>
        $(document).ready( function () {
            $('#myTable').DataTable();
        } );
    </script>
    @endpush
</x-app-layout>