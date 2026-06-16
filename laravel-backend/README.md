# HIMATIF UIR — Laravel Backend API

Backend REST API untuk Sistem Informasi HIMATIF UIR (Himpunan Mahasiswa Teknik Informatika, Universitas Islam Riau).

Dibangun dengan **Laravel 11** + **Laravel Sanctum** untuk autentikasi berbasis token.

---

## Fitur

- 5 role pengguna: Admin, Bendahara, Ketua Divisi, Anggota, Prodi
- 30+ endpoint API untuk 18 modul
- Autentikasi token via Laravel Sanctum
- Migrasi database lengkap (12 tabel)
- Seeder dengan data awal

---

## Cara Cepat Mulai

### Prasyarat

- PHP >= 8.2
- Composer
- MySQL >= 8.0

### Instalasi

**Opsi A — Script Otomatis (Mac/Linux)**

```bash
chmod +x setup.sh
./setup.sh
```

**Opsi B — Manual**

```bash
# 1. Install dependency
composer install

# 2. Buat file .env
cp .env.example .env
php artisan key:generate

# 3. Edit .env — sesuaikan database
#    DB_DATABASE=himatif_uir
#    DB_USERNAME=root
#    DB_PASSWORD=

# 4. Buat database di MySQL
mysql -u root -e "CREATE DATABASE himatif_uir;"

# 5. Migrasi & seed data awal
php artisan migrate
php artisan db:seed

# 6. Jalankan server
php artisan serve
```

API berjalan di: **http://localhost:8000**

---

## Login Default

| Role | Email | Password |
|------|-------|----------|
| Admin/Ketua | sindimaharani@student.uir.ac.id | password |
| Bendahara | siti.rahma@student.uir.ac.id | password |
| Ketua Divisi | budi.santoso@student.uir.ac.id | password |
| Anggota | dewi.lestari@student.uir.ac.id | password |
| Prodi | prodi@uir.ac.id | password |

---

## Konfigurasi `.env` Penting

```env
# Database
DB_DATABASE=himatif_uir
DB_USERNAME=root
DB_PASSWORD=

# Domain frontend yang boleh mengakses API
SANCTUM_STATEFUL_DOMAINS=localhost:5173,localhost:3000

# URL frontend
FRONTEND_URL=http://localhost:5173
```

---

## Endpoint Utama

```
POST /api/login                 → Login, dapat token
POST /api/logout                → Logout
GET  /api/me                    → Info user aktif

GET  /api/announcements         → List pengumuman
GET  /api/activities            → List kegiatan
GET  /api/financial-transactions → List transaksi keuangan
GET  /api/members               → List anggota
GET  /api/jobdesks              → List jobdesk
GET  /api/notifications         → Notifikasi user
GET  /api/forum-channels        → Forum diskusi
GET  /api/recruitments          → Rekrutmen open member
GET  /api/documents             → Dokumentasi & arsip
GET  /api/letters               → Manajemen surat
```

Semua endpoint (kecuali login) memerlukan header:
```
Authorization: Bearer {token}
```

---

## Dokumentasi Lengkap

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** — Cara menambah fitur, struktur folder, troubleshooting
- **[database.sql](./database.sql)** — Export schema database lengkap
- **[.env.example](./.env.example)** — Template konfigurasi dengan penjelasan setiap variabel

---

## Menghubungkan Frontend React

Di file `src/lib/api.ts` pada proyek React/Vite:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

---

## Lisensi

MIT License
