#!/bin/bash

# ============================================================
#  HIMATIF UIR - Laravel Backend Setup Script
#  Jalankan script ini untuk instalasi otomatis
# ============================================================

set -e

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║        HIMATIF UIR - Laravel Backend Setup        ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# --- Cek PHP ---
if ! command -v php &> /dev/null; then
    echo "❌ PHP tidak ditemukan. Install PHP >= 8.2 terlebih dahulu."
    exit 1
fi

PHP_VERSION=$(php -r "echo PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION;")
echo "✅ PHP $PHP_VERSION ditemukan"

# --- Cek Composer ---
if ! command -v composer &> /dev/null; then
    echo "❌ Composer tidak ditemukan. Install Composer dari https://getcomposer.org"
    exit 1
fi
echo "✅ Composer ditemukan"

# --- Cek MySQL ---
if ! command -v mysql &> /dev/null; then
    echo "⚠️  MySQL tidak ditemukan di PATH. Pastikan MySQL sudah berjalan."
fi

echo ""
echo "📂 Membuat project Laravel baru..."
echo ""

read -p "Nama folder project Laravel [himatif-uir-backend]: " PROJECT_NAME
PROJECT_NAME=${PROJECT_NAME:-himatif-uir-backend}

# --- Buat project Laravel ---
composer create-project laravel/laravel "$PROJECT_NAME" --prefer-dist

echo ""
echo "📁 Menyalin file HIMATIF UIR ke project..."

# Copy semua file backend
cp -r app/Http/Controllers "$PROJECT_NAME/app/Http/"
cp -r app/Models/. "$PROJECT_NAME/app/Models/"
cp -r database/migrations/. "$PROJECT_NAME/database/migrations/"
cp -r database/seeders/. "$PROJECT_NAME/database/seeders/"
cp routes/api.php "$PROJECT_NAME/routes/api.php"

echo "✅ File berhasil disalin"

cd "$PROJECT_NAME"

# --- Install Sanctum ---
echo ""
echo "📦 Installing Laravel Sanctum..."
composer require laravel/sanctum

# --- Setup .env ---
echo ""
echo "⚙️  Konfigurasi Environment"
echo "─────────────────────────────"

read -p "DB_HOST [127.0.0.1]: " DB_HOST
DB_HOST=${DB_HOST:-127.0.0.1}

read -p "DB_PORT [3306]: " DB_PORT
DB_PORT=${DB_PORT:-3306}

read -p "DB_DATABASE [himatif_uir]: " DB_DATABASE
DB_DATABASE=${DB_DATABASE:-himatif_uir}

read -p "DB_USERNAME [root]: " DB_USERNAME
DB_USERNAME=${DB_USERNAME:-root}

read -s -p "DB_PASSWORD [kosong]: " DB_PASSWORD
echo ""

# Tulis .env
cat > .env << EOF
APP_NAME="HIMATIF UIR"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=$DB_HOST
DB_PORT=$DB_PORT
DB_DATABASE=$DB_DATABASE
DB_USERNAME=$DB_USERNAME
DB_PASSWORD=$DB_PASSWORD

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000,localhost:5173,127.0.0.1:5173

MAIL_MAILER=log
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@himatif.uir.ac.id"
MAIL_FROM_NAME="HIMATIF UIR"
EOF

# --- Generate App Key ---
php artisan key:generate
echo "✅ App key generated"

# --- Update bootstrap/app.php untuk Sanctum ---
echo ""
echo "⚙️  Mengkonfigurasi middleware Sanctum..."

php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# --- Buat database jika belum ada ---
echo ""
echo "🗄️  Membuat database '$DB_DATABASE'..."
mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USERNAME" ${DB_PASSWORD:+-p"$DB_PASSWORD"} \
    -e "CREATE DATABASE IF NOT EXISTS \`$DB_DATABASE\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null \
    && echo "✅ Database berhasil dibuat/sudah ada" \
    || echo "⚠️  Gagal membuat database otomatis. Buat manual: CREATE DATABASE $DB_DATABASE;"

# --- Migrasi & Seeder ---
echo ""
echo "🔄 Menjalankan migration..."
php artisan migrate

echo ""
echo "🌱 Menjalankan seeder (data awal)..."
php artisan db:seed

# --- CORS Config ---
echo ""
echo "⚙️  Konfigurasi CORS..."
cat > config/cors.php << 'CORSEOF'
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
CORSEOF

echo "✅ CORS dikonfigurasi"

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║              ✅ SETUP BERHASIL!                  ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""
echo "Jalankan server dengan:"
echo "  cd $PROJECT_NAME && php artisan serve"
echo ""
echo "API tersedia di: http://localhost:8000"
echo ""
echo "Default Login:"
echo "  Admin   : sindimaharani@student.uir.ac.id / password"
echo "  Bendahara: siti.rahma@student.uir.ac.id / password"
echo "  Div Head: budi.santoso@student.uir.ac.id / password"
echo "  Anggota : dewi.lestari@student.uir.ac.id / password"
echo "  Prodi   : prodi@uir.ac.id / password"
echo ""
