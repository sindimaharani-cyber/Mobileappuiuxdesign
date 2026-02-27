# HIMATIF UIR - Laravel Backend

Backend API untuk aplikasi HIMATIF UIR menggunakan Laravel 11 dengan Laravel Sanctum untuk authentication.

## Requirements

- PHP >= 8.2
- Composer
- MySQL >= 8.0 atau PostgreSQL
- Node.js & NPM (untuk frontend)

## Installation

### 1. Install Laravel

```bash
composer create-project laravel/laravel himatif-uir-backend
cd himatif-uir-backend
```

### 2. Copy Backend Files

Salin semua file dari folder `laravel-backend/` ke project Laravel Anda:

```
laravel-backend/
├── app/
│   ├── Http/Controllers/API/
│   └── Models/
├── database/
│   ├── migrations/
│   └── seeders/
└── routes/
    └── api.php
```

### 3. Environment Setup

Edit file `.env`:

```env
APP_NAME="HIMATIF UIR"
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=himatif_uir
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
```

### 4. Install Laravel Sanctum

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### 5. Update Kernel

Edit `bootstrap/app.php`, tambahkan middleware:

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->api(prepend: [
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    ]);
})
```

### 6. Run Migrations

```bash
php artisan migrate
php artisan db:seed
```

### 7. Start Server

```bash
php artisan serve
```

API akan berjalan di: `http://localhost:8000`

## API Endpoints

### Authentication

```
POST   /api/login              - Login user
POST   /api/register           - Register user (development only)
POST   /api/logout             - Logout user
GET    /api/me                 - Get authenticated user
```

### Announcements

```
GET    /api/announcements              - Get all announcements
POST   /api/announcements              - Create announcement (admin only)
GET    /api/announcements/{id}         - Get single announcement
PUT    /api/announcements/{id}         - Update announcement (admin only)
DELETE /api/announcements/{id}         - Delete announcement (admin only)
POST   /api/announcements/{id}/toggle-archive - Archive/Unarchive
```

### Activities

```
GET    /api/activities            - Get all activities
POST   /api/activities            - Create activity
GET    /api/activities/{id}       - Get single activity
PUT    /api/activities/{id}       - Update activity
DELETE /api/activities/{id}       - Delete activity
GET    /api/activities-statistics - Get activity statistics
```

### Financial Transactions

```
GET    /api/financial-transactions    - Get all transactions
POST   /api/financial-transactions    - Create transaction (bendahara only)
GET    /api/financial-transactions/{id} - Get single transaction
PUT    /api/financial-transactions/{id} - Update transaction
DELETE /api/financial-transactions/{id} - Delete transaction
GET    /api/financial-summary         - Get financial summary
```

### Members

```
GET    /api/members               - Get all members
POST   /api/members               - Create member (admin only)
GET    /api/members/{id}          - Get single member
PUT    /api/members/{id}          - Update member (admin only)
DELETE /api/members/{id}          - Delete member (admin only)
GET    /api/members-statistics    - Get member statistics
```

## Default User Credentials

```
Admin/Ketua:
Email: sindimaharani@student.uir.ac.id
Password: password

Bendahara:
Email: siti.rahma@student.uir.ac.id
Password: password

Ketua Divisi:
Email: budi.santoso@student.uir.ac.id
Password: password

Anggota:
Email: dewi.lestari@student.uir.ac.id
Password: password

Prodi:
Email: prodi@uir.ac.id
Password: password
```

## Database Schema

### Tables

- `users` - User accounts and member data
- `announcements` - Announcements/pengumuman
- `activities` - Activities/kegiatan
- `financial_transactions` - Financial records
- `jobdesks` - Task assignments per division
- `notifications` - User notifications
- `event_registrations` - Event registration & attendance
- `certificates` - Digital certificates
- `recruitments` - Recruitment periods
- `recruitment_applications` - Recruitment applications
- `documents` - Document repository (LPJ, Proposal, etc)
- `letters` - Letter management
- `letter_templates` - Letter templates
- `forum_channels` - Discussion channels
- `forum_messages` - Forum messages

## Testing API

### Using Postman or Insomnia

1. **Login:**
```json
POST http://localhost:8000/api/login
Content-Type: application/json

{
  "email": "sindimaharani@student.uir.ac.id",
  "password": "password"
}
```

Response:
```json
{
  "access_token": "1|abc123...",
  "token_type": "Bearer",
  "user": { ... }
}
```

2. **Get Announcements:**
```
GET http://localhost:8000/api/announcements
Authorization: Bearer {your_token_here}
```

## Connecting Frontend

Update React frontend untuk menggunakan Laravel API:

1. Install Axios:
```bash
npm install axios
```

2. Create API client (`src/lib/api.ts`):
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

3. Replace mock data dengan API calls.

## Production Deployment

1. Set environment to production
2. Configure proper database credentials
3. Set up CORS properly
4. Use HTTPS
5. Enable API rate limiting
6. Configure file storage (S3, DigitalOcean Spaces, etc)

## License

MIT License
