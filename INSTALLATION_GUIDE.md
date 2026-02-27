# 🚀 HIMATIF UIR - Full Stack Application

Aplikasi manajemen himpunan mahasiswa HIMATIF UIR yang comprehensive dengan Laravel Backend API dan React Frontend.

## 📋 Table of Contents

1. [Struktur Project](#struktur-project)
2. [Requirements](#requirements)
3. [Installation Laravel Backend](#installation-laravel-backend)
4. [Installation React Frontend](#installation-react-frontend)
5. [Database Schema](#database-schema)
6. [API Documentation](#api-documentation)
7. [Default Credentials](#default-credentials)
8. [Features](#features)

---

## 📁 Struktur Project

```
himatif-uir/
├── laravel-backend/              # Laravel API Backend
│   ├── app/
│   │   ├── Http/Controllers/API/
│   │   └── Models/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/
│       └── api.php
│
└── react-frontend/               # React Frontend (sudah ada)
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   └── App.tsx
    │   ├── data/
    │   └── types/
    └── package.json
```

---

## 🔧 Requirements

### Backend (Laravel)
- **PHP** >= 8.2
- **Composer** >= 2.6
- **MySQL** >= 8.0 atau **PostgreSQL** >= 14
- **Laravel** 11.x

### Frontend (React)
- **Node.js** >= 18.x
- **npm** >= 9.x atau **pnpm**
- **React** 18.x
- **TypeScript** 5.x

---

## 🎯 Installation Laravel Backend

### Step 1: Create Laravel Project

```bash
composer create-project laravel/laravel himatif-uir-backend
cd himatif-uir-backend
```

### Step 2: Copy Backend Files

Salin semua file dari folder `laravel-backend/` yang telah dibuat:

```bash
# Copy struktur folder
cp -r laravel-backend/app/* app/
cp -r laravel-backend/database/* database/
cp -r laravel-backend/routes/* routes/
```

### Step 3: Install Laravel Sanctum

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### Step 4: Configure Environment

Edit file `.env`:

```env
APP_NAME="HIMATIF UIR"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=himatif_uir
DB_USERNAME=root
DB_PASSWORD=

# Sanctum Configuration
SANCTUM_STATEFUL_DOMAINS=localhost:3000,localhost:5173,127.0.0.1:3000
SESSION_DRIVER=cookie

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### Step 5: Update App Configuration

Edit `bootstrap/app.php`, tambahkan Sanctum middleware:

```php
<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api(prepend: [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);
        
        $middleware->alias([
            'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
```

### Step 6: Configure CORS

Edit `config/cors.php`:

```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://127.0.0.1:3000',
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

### Step 7: Create Database

```bash
# MySQL
mysql -u root -p
CREATE DATABASE himatif_uir CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### Step 8: Run Migrations & Seeders

```bash
php artisan migrate
php artisan db:seed
```

### Step 9: Start Laravel Server

```bash
php artisan serve
```

Backend API akan berjalan di: **http://localhost:8000**

---

## ⚛️ Installation React Frontend

Frontend sudah tersedia dan berjalan. Untuk menghubungkan dengan Laravel backend:

### Step 1: Install Axios

```bash
npm install axios
# atau
pnpm install axios
```

### Step 2: Create API Client

Buat file `/src/lib/api.ts`:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Interceptor untuk menambahkan token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Step 3: Create API Services

Buat file `/src/services/authService.ts`:

```typescript
import api from '@/lib/api';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/login', { email, password });
    if (response.data.access_token) {
      localStorage.setItem('auth_token', response.data.access_token);
    }
    return response.data;
  },

  logout: async () => {
    await api.post('/logout');
    localStorage.removeItem('auth_token');
  },

  me: async () => {
    const response = await api.get('/me');
    return response.data;
  },
};
```

### Step 4: Update Login Component

Modifikasi `LoginPage.tsx` untuk menggunakan API:

```typescript
import { authService } from '@/services/authService';

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const data = await authService.login(email, password);
    onLogin(data.user);
  } catch (error) {
    console.error('Login failed:', error);
    alert('Login gagal! Periksa email dan password Anda.');
  }
};
```

---

## 🗄️ Database Schema

### Users Table
| Field | Type | Description |
|-------|------|-------------|
| id | BIGINT | Primary key |
| nim | VARCHAR | NIM mahasiswa (unique) |
| name | VARCHAR | Nama lengkap |
| email | VARCHAR | Email (unique) |
| password | VARCHAR | Hashed password |
| role | ENUM | admin, bendahara, ketua_divisi, anggota, prodi |
| division | VARCHAR | Divisi (nullable) |
| position | VARCHAR | Jabatan (nullable) |
| angkatan | VARCHAR | Angkatan (nullable) |
| phone | VARCHAR | Nomor telepon (nullable) |
| status | ENUM | aktif, non_aktif, alumni |

### 12 Tables Total:
1. **users** - Data anggota & pengguna
2. **announcements** - Pengumuman
3. **activities** - Kegiatan
4. **financial_transactions** - Transaksi keuangan
5. **jobdesks** - Tugas divisi
6. **notifications** - Notifikasi
7. **event_registrations** - Pendaftaran & absensi
8. **certificates** - Sertifikat digital
9. **recruitments** & **recruitment_applications** - Rekrutmen
10. **documents** - Dokumentasi & arsip
11. **letters** & **letter_templates** - Manajemen surat
12. **forum_channels** & **forum_messages** - Forum diskusi

---

## 📚 API Documentation

### Authentication Endpoints

#### Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "sindimaharani@student.uir.ac.id",
  "password": "password"
}

Response:
{
  "access_token": "1|xyz123...",
  "token_type": "Bearer",
  "user": {
    "id": 1,
    "name": "Sindi Maharani",
    "email": "sindimaharani@student.uir.ac.id",
    "role": "admin",
    ...
  }
}
```

#### Get Current User
```http
GET /api/me
Authorization: Bearer {token}

Response:
{
  "id": 1,
  "name": "Sindi Maharani",
  "role": "admin",
  ...
}
```

#### Logout
```http
POST /api/logout
Authorization: Bearer {token}

Response:
{
  "message": "Successfully logged out"
}
```

### Resource Endpoints

All endpoints require `Authorization: Bearer {token}` header.

#### Announcements
- `GET /api/announcements` - List all
- `POST /api/announcements` - Create new
- `GET /api/announcements/{id}` - Get single
- `PUT /api/announcements/{id}` - Update
- `DELETE /api/announcements/{id}` - Delete
- `POST /api/announcements/{id}/toggle-archive` - Archive/Unarchive

#### Activities
- `GET /api/activities` - List all
- `POST /api/activities` - Create new
- `GET /api/activities/{id}` - Get single
- `PUT /api/activities/{id}` - Update
- `DELETE /api/activities/{id}` - Delete
- `GET /api/activities-statistics` - Get statistics

#### Financial Transactions
- `GET /api/financial-transactions` - List all
- `POST /api/financial-transactions` - Create new
- `GET /api/financial-transactions/{id}` - Get single
- `PUT /api/financial-transactions/{id}` - Update
- `DELETE /api/financial-transactions/{id}` - Delete
- `GET /api/financial-summary` - Get summary (saldo, pemasukan, pengeluaran)

#### Members
- `GET /api/members` - List all
- `POST /api/members` - Create new
- `GET /api/members/{id}` - Get single
- `PUT /api/members/{id}` - Update
- `DELETE /api/members/{id}` - Delete
- `GET /api/members-statistics` - Get statistics

---

## 🔐 Default Credentials

Setelah menjalankan seeder, gunakan credentials berikut untuk login:

| Role | Email | Password |
|------|-------|----------|
| **Admin/Ketua** | sindimaharani@student.uir.ac.id | password |
| **Bendahara** | siti.rahma@student.uir.ac.id | password |
| **Ketua Divisi** | budi.santoso@student.uir.ac.id | password |
| **Anggota** | dewi.lestari@student.uir.ac.id | password |
| **Prodi** | prodi@uir.ac.id | password |

> ⚠️ **PENTING**: Ganti semua password default sebelum production!

---

## ✨ Features

### 🔔 Informasi & Komunikasi
- ✅ Dashboard dengan statistik
- ✅ Pengumuman dengan kategori
- ✅ Notifikasi real-time
- ✅ Forum diskusi multi-channel

### 🗓️ Manajemen Kegiatan
- ✅ Kalender kegiatan
- ✅ Pendaftaran event online
- ✅ Absensi dengan QR Code
- ✅ Sertifikat digital

### 👥 Keanggotaan & Organisasi
- ✅ Data anggota lengkap
- ✅ Struktur organisasi
- ✅ Sistem rekrutmen

### 📁 Administrasi
- ✅ Manajemen keuangan
- ✅ Jobdesk divisi
- ✅ Dokumentasi & arsip
- ✅ Manajemen surat

### 📊 Monitoring
- ✅ Dashboard monitoring prodi
- ✅ Statistik lengkap
- ✅ Laporan kegiatan

---

## 🧪 Testing API

### Using Postman

1. Import collection atau buat request manual
2. Login untuk mendapatkan token
3. Gunakan token di header `Authorization: Bearer {token}`

### Example: Get Announcements

```bash
curl -X GET http://localhost:8000/api/announcements \
  -H "Authorization: Bearer 1|xyz123..." \
  -H "Accept: application/json"
```

---

## 🚀 Production Deployment

### Backend (Laravel)

1. **Set production environment**
```env
APP_ENV=production
APP_DEBUG=false
```

2. **Configure database**
3. **Set up queue workers**
```bash
php artisan queue:work --tries=3
```

4. **Optimize Laravel**
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

5. **Set up HTTPS & SSL**
6. **Configure file storage (S3, etc)**

### Frontend (React)

1. Build production:
```bash
npm run build
```

2. Deploy ke hosting (Vercel, Netlify, dll)

---

## 📝 License

MIT License - Free for educational and commercial use.

---

## 👨‍💻 Developer

**HIMATIF UIR** - Universitas Islam Riau
Teknik Informatika

---

## 🆘 Support

Untuk bantuan atau pertanyaan:
- Email: himatif@uir.ac.id
- WhatsApp: +62 812-3456-7890

---

**Happy Coding! 🎉**
