# 🚀 Quick Start Guide - HIMATIF UIR

## Cara Cepat Menjalankan Aplikasi

### 📦 Prerequisites

Pastikan sudah terinstall:
- ✅ PHP 8.2+
- ✅ Composer
- ✅ MySQL 8.0+
- ✅ Node.js 18+

---

## 🔥 Backend Setup (5 Menit)

```bash
# 1. Create Laravel Project
composer create-project laravel/laravel himatif-backend
cd himatif-backend

# 2. Install Sanctum
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# 3. Copy semua file dari folder laravel-backend/ ke project Laravel
# - app/Models/*
# - app/Http/Controllers/API/*
# - database/migrations/*
# - database/seeders/*
# - routes/api.php
# - config/cors.php

# 4. Setup Database
mysql -u root -p
> CREATE DATABASE himatif_uir;
> EXIT;

# 5. Edit .env
DB_DATABASE=himatif_uir
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:3000
FRONTEND_URL=http://localhost:3000

# 6. Run Migration & Seeder
php artisan migrate
php artisan db:seed

# 7. Start Server
php artisan serve
```

**✅ Backend siap di: http://localhost:8000**

---

## ⚛️ Frontend Setup (Sudah Siap!)

Frontend React sudah berjalan. Untuk connect ke backend:

```bash
# 1. Install Axios
npm install axios

# 2. Buat file src/lib/api.ts
# (Copy dari INSTALLATION_GUIDE.md)

# 3. Update komponen untuk pakai API
# Replace mockData dengan API calls
```

---

## 🧪 Test Login

### Via Postman:

```http
POST http://localhost:8000/api/login
Content-Type: application/json

{
  "email": "sindimaharani@student.uir.ac.id",
  "password": "password"
}
```

### Via Browser Console:

```javascript
fetch('http://localhost:8000/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'sindimaharani@student.uir.ac.id',
    password: 'password'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## 📋 Default Users

| Role | Email | Password |
|------|-------|----------|
| Admin | sindimaharani@student.uir.ac.id | password |
| Bendahara | siti.rahma@student.uir.ac.id | password |
| Ketua Divisi | budi.santoso@student.uir.ac.id | password |
| Anggota | dewi.lestari@student.uir.ac.id | password |
| Prodi | prodi@uir.ac.id | password |

---

## 🎯 API Endpoints Penting

### Authentication
- `POST /api/login` - Login
- `POST /api/logout` - Logout
- `GET /api/me` - Current user

### Resources
- `GET /api/announcements` - Pengumuman
- `GET /api/activities` - Kegiatan
- `GET /api/financial-transactions` - Keuangan
- `GET /api/members` - Anggota

**All endpoints need:** `Authorization: Bearer {token}`

---

## 🐛 Troubleshooting

### Error: CORS
**Solusi:** Pastikan `config/cors.php` sudah benar

### Error: 401 Unauthorized
**Solusi:** Cek token di header request

### Error: Connection Refused
**Solusi:** Pastikan `php artisan serve` berjalan

### Error: Database
**Solusi:** 
```bash
php artisan migrate:fresh --seed
```

---

## 📞 Need Help?

Baca dokumentasi lengkap di **INSTALLATION_GUIDE.md**

---

**Selamat Coding! 🎉**
