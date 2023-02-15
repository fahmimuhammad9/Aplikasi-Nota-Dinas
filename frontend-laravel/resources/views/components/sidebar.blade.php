<nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
        <li class="nav-item">
            <a class="nav-link" href="{{route('dashboard')}}">
                <i class="icon-grid menu-icon"></i>
                <span class="menu-title">Dashboard</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#divisi" aria-expanded="false"
                aria-controls="divisi">
                <i class="icon-head menu-icon"></i>
                <span class="menu-title">Divisi</span>
                <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="divisi">
                <ul class="nav flex-column sub-menu">
                    <li class="nav-item"> <a class="nav-link" href="{{route('division-mine')}}">Divisi Saya</a></li>
                    <li class="nav-item"> <a class="nav-link" href="{{route('division-status')}}">Status Divisi</a></li>
                    <li class="nav-item"> <a class="nav-link" href="{{route('division-all')}}">Semua Divisi</a></li>
                </ul>
            </div>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#nota-dinas" aria-expanded="false"
                aria-controls="nota-dinas">
                <i class="icon-map menu-icon"></i>
                <span class="menu-title">Nota Dinas</span>
                <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="nota-dinas">
                <ul class="nav flex-column sub-menu">
                    <li class="nav-item"> <a class="nav-link" href="{{route('nodin-all')}}">Semua Nota Dinas</a></li>
                    <li class="nav-item"> <a class="nav-link" href="{{route('nodin-create')}}">Buat Nota Dinas</a></li>
                    <li class="nav-item"> <a class="nav-link" href="{{route('nodin-draft')}}">Draft Saya</a></li>
                    <li class="nav-item"> <a class="nav-link" href="{{route('nodin-progress')}}">Pengajuan Saya</a></li>
                    <li class="nav-item"> <a class="nav-link" href="{{route('nodin-tagged')}}">Ditandai</a></li>
                </ul>
            </div>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#memo-dinas" aria-expanded="false"
                aria-controls="memo-dinas">
                <i class="icon-book menu-icon"></i>
                <span class="menu-title">Memo</span>
                <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="memo-dinas">
                <ul class="nav flex-column sub-menu">
                    <li class="nav-item"> <a class="nav-link" href="">Semua Memo</a></li>
                    <li class="nav-item"> <a class="nav-link" href="">Draft Saya</a></li>
                    <li class="nav-item"> <a class="nav-link" href="">Pengajuan Memo</a></li>
                    <li class="nav-item"> <a class="nav-link" href="">Ditandai</a></li>
                </ul>
            </div>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#surat-dinas" aria-expanded="false"
                aria-controls="surat-dinas">
                <i class="icon-mail menu-icon"></i>
                <span class="menu-title">Surat</span>
                <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="surat-dinas">
                <ul class="nav flex-column sub-menu">
                    <li class="nav-item"> <a class="nav-link" href="">Draft Saya</a></li>
                    <li class="nav-item"> <a class="nav-link" href="">Surat Masuk</a></li>
                    <li class="nav-item"> <a class="nav-link" href="">Surat Keluar</a></li>
                    <li class="nav-item"> <a class="nav-link" href="">Surat Ditandai</a></li>
                </ul>
            </div>
        </li>
        @if(session('roles')=='cf0f62b0-192c-4585-b392-714bb8e34300')
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#pengaturan-pengguna" aria-expanded="false"
                aria-controls="pengaturan-pengguna">
                <i class="icon-cog menu-icon"></i>
                <span class="menu-title">Pengaturan</span>
                <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="pengaturan-pengguna">
                <ul class="nav flex-column sub-menu">
                    <li class="nav-item"> <a class="nav-link" href="{{route('setting-document')}}">Dokumen</a></li>
                    <li class="nav-item"> <a class="nav-link" href="{{route('setting-user')}}">Pengguna</a></li>
                    <li class="nav-item"> <a class="nav-link" href="{{route('setting-org')}}">Organisasi</a></li>
                    <li class="nav-item"> <a class="nav-link" href="">Kewenangan</a></li>
                    <li class="nav-item"> <a class="nav-link" href="">Logs</a></li>
                </ul>
            </div>
        </li>
        @endif
    </ul>
</nav>