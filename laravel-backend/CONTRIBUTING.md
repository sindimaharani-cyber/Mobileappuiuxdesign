# Panduan Kontribusi & Pengembangan — HIMATIF UIR Backend

Dokumen ini menjelaskan cara setup, struktur proyek, dan cara menambahkan fitur baru agar developer lain bisa langsung berkontribusi.

---

## Prasyarat

| Tool | Versi Minimum | Cara Install |
|------|--------------|--------------|
| PHP | 8.2+ | https://php.net/downloads |
| Composer | 2.x | https://getcomposer.org |
| MySQL | 8.0+ | https://dev.mysql.com/downloads |
| Git | any | https://git-scm.com |

---

## Setup Lokal (Manual)

### 1. Clone & Masuk Folder

```bash
git clone <url-repository>
cd <nama-folder>
```

### 2. Install Dependencies

```bash
composer install
```

### 3. Buat File `.env`

```bash
cp .env.example .env
php artisan key:generate
```

Lalu buka `.env` dan sesuaikan:

```env
DB_HOST=127.0.0.1       # host MySQL Anda
DB_DATABASE=himatif_uir # nama database
DB_USERNAME=root         # username MySQL
DB_PASSWORD=             # password MySQL (kosong jika tidak ada)
```

### 4. Buat Database

```sql
CREATE DATABASE himatif_uir CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Jalankan Migrasi & Seeder

```bash
php artisan migrate
php artisan db:seed
```

### 6. Jalankan Server

```bash
php artisan serve
```

API berjalan di `http://localhost:8000`

---

## Setup Otomatis (Script)

Jika Anda di Mac/Linux, gunakan script otomatis:

```bash
chmod +x setup.sh
./setup.sh
```

Script akan menanyakan konfigurasi database dan mengurus semuanya otomatis.

---

## Struktur Folder

```
laravel-backend/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── API/              ← Semua controller API
│   │           ├── AuthController.php
│   │           ├── AnnouncementController.php
│   │           ├── ActivityController.php
│   │           ├── FinancialTransactionController.php
│   │           ├── MemberController.php
│   │           ├── JobdeskController.php
│   │           ├── NotificationController.php
│   │           ├── EventRegistrationController.php
│   │           ├── CertificateController.php
│   │           ├── RecruitmentController.php
│   │           ├── DocumentController.php
│   │           ├── LetterController.php
│   │           └── ForumController.php
│   └── Models/                   ← Eloquent models (15 model)
│       ├── User.php
│       ├── Announcement.php
│       ├── Activity.php
│       └── ... (lihat folder)
├── database/
│   ├── migrations/               ← 12 migration files
│   └── seeders/                  ← Data awal/dummy
├── routes/
│   └── api.php                   ← Definisi semua endpoint API
├── .env.example                  ← Template konfigurasi
├── setup.sh                      ← Script instalasi otomatis
└── CONTRIBUTING.md               ← File ini
```

---

## Cara Menambah Fitur Baru

### Contoh: Menambah fitur "Gallery Foto"

#### 1. Buat Migration

```bash
php artisan make:migration create_gallery_photos_table
```

Edit file migration yang dibuat di `database/migrations/`:

```php
Schema::create('gallery_photos', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('file_path');
    $table->string('activity_id')->nullable();
    $table->foreignId('uploaded_by')->constrained('users');
    $table->timestamps();
});
```

Jalankan:

```bash
php artisan migrate
```

#### 2. Buat Model

```bash
php artisan make:model GalleryPhoto
```

Edit `app/Models/GalleryPhoto.php`:

```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryPhoto extends Model
{
    protected $fillable = ['title', 'file_path', 'activity_id', 'uploaded_by'];

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
```

#### 3. Buat Controller

```bash
php artisan make:controller API/GalleryController --api
```

Edit `app/Http/Controllers/API/GalleryController.php` mengikuti pola controller yang sudah ada.

#### 4. Tambah Route

Di `routes/api.php`, dalam blok `auth:sanctum`:

```php
Route::apiResource('gallery', GalleryController::class);
```

---

## Role Pengguna

| Role | Nilai di DB | Hak Akses |
|------|------------|-----------|
| Admin / Ketua | `admin` | Full access |
| Bendahara | `bendahara` | Keuangan + read umum |
| Ketua Divisi | `ketua_divisi` | Jobdesk + aktivitas divisi |
| Anggota | `anggota` | Read + daftar kegiatan |
| Program Studi | `prodi` | Dashboard monitoring (read only) |

Cek role di controller:

```php
if ($request->user()->role !== 'admin') {
    return response()->json(['message' => 'Unauthorized'], 403);
}
```

---

## Endpoint API yang Tersedia

```
POST   /api/login                        Auth: Login
POST   /api/logout                       Auth: Logout
GET    /api/me                           Auth: User info

GET    /api/announcements                Pengumuman: list
POST   /api/announcements                Pengumuman: buat (admin)
PUT    /api/announcements/{id}           Pengumuman: update (admin)
DELETE /api/announcements/{id}           Pengumuman: hapus (admin)

GET    /api/activities                   Kegiatan: list
POST   /api/activities                   Kegiatan: buat
GET    /api/activities-statistics        Kegiatan: statistik

GET    /api/financial-transactions       Keuangan: list
POST   /api/financial-transactions       Keuangan: tambah (bendahara)
GET    /api/financial-summary            Keuangan: ringkasan

GET    /api/members                      Anggota: list
POST   /api/members                      Anggota: tambah (admin)
GET    /api/members-statistics           Anggota: statistik

GET    /api/jobdesks                     Jobdesk: list
POST   /api/jobdesks/{id}/update-status  Jobdesk: update status
POST   /api/jobdesks/{id}/assign-users   Jobdesk: assign

GET    /api/notifications                Notifikasi: list
POST   /api/notifications/mark-all-read  Notifikasi: tandai semua dibaca

POST   /api/event-registrations/register Kegiatan: daftar
POST   /api/event-registrations/{id}/check-in Kegiatan: absen

GET    /api/certificates                 Sertifikat: list
GET    /api/recruitments                 Rekrutmen: list
GET    /api/documents                    Dokumen: list
GET    /api/letters                      Surat: list
GET    /api/forum-channels               Forum: list channel
GET    /api/forum-channels/{id}/messages Forum: pesan
```

---

## Testing API dengan Postman

1. Import collection: buat request baru di Postman
2. Login dulu untuk dapatkan token:

```
POST http://localhost:8000/api/login
Content-Type: application/json

{
  "email": "sindimaharani@student.uir.ac.id",
  "password": "password"
}
```

3. Salin `access_token` dari response
4. Gunakan di setiap request selanjutnya:

```
Authorization: Bearer {access_token}
```

---

## Akun Default (Setelah Seeder)

| Role | Email | Password |
|------|-------|----------|
| Admin/Ketua | sindimaharani@student.uir.ac.id | password |
| Bendahara | siti.rahma@student.uir.ac.id | password |
| Ketua Divisi | budi.santoso@student.uir.ac.id | password |
| Anggota | dewi.lestari@student.uir.ac.id | password |
| Prodi | prodi@uir.ac.id | password |

---

## Troubleshooting

**Error: `SQLSTATE[HY000] [1049] Unknown database`**
→ Buat database dulu: `CREATE DATABASE himatif_uir;`

**Error: `php_network_getaddresses: getaddrinfo failed`**
→ Pastikan MySQL sedang berjalan

**Error: `Class ... not found`**
→ Jalankan `composer dump-autoload`

**Error 401 Unauthorized di semua endpoint**
→ Tambahkan header `Authorization: Bearer {token}` (login dulu)

**Error CORS dari frontend**
→ Tambahkan domain frontend Anda ke `SANCTUM_STATEFUL_DOMAINS` di `.env`

---

## Kontak Tim Pengembang

Untuk pertanyaan teknis, hubungi maintainer proyek melalui repository ini.
