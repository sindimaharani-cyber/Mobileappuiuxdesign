-- ====================================================================
-- HIMATIF UIR - Database Schema
-- Complete SQL for MySQL 8.0+
-- ====================================================================

-- Create Database
CREATE DATABASE IF NOT EXISTS himatif_uir CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE himatif_uir;

-- Drop tables if exists (for clean installation)
DROP TABLE IF EXISTS forum_messages;
DROP TABLE IF EXISTS forum_channels;
DROP TABLE IF EXISTS letter_templates;
DROP TABLE IF EXISTS letters;
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS recruitment_applications;
DROP TABLE IF EXISTS recruitments;
DROP TABLE IF EXISTS certificates;
DROP TABLE IF EXISTS event_registrations;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS jobdesk_user;
DROP TABLE IF EXISTS jobdesks;
DROP TABLE IF EXISTS financial_transactions;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS announcements;
DROP TABLE IF EXISTS users;

-- ====================================================================
-- TABLE: users
-- ====================================================================
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nim VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'bendahara', 'ketua_divisi', 'anggota', 'prodi') NOT NULL DEFAULT 'anggota',
    division VARCHAR(255),
    position VARCHAR(255),
    angkatan VARCHAR(255),
    phone VARCHAR(255),
    status ENUM('aktif', 'non_aktif', 'alumni') NOT NULL DEFAULT 'aktif',
    remember_token VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_role (role),
    INDEX idx_status (status),
    INDEX idx_division (division)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- TABLE: announcements
-- ====================================================================
CREATE TABLE announcements (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    archived BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_category (category),
    INDEX idx_archived (archived)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- TABLE: activities
-- ====================================================================
CREATE TABLE activities (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status ENUM('perencanaan', 'persiapan', 'pelaksanaan', 'selesai') NOT NULL DEFAULT 'perencanaan',
    reminder BOOLEAN NOT NULL DEFAULT FALSE,
    documentation JSON,
    quota INT,
    created_by BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- TABLE: financial_transactions
-- ====================================================================
CREATE TABLE financial_transactions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    type ENUM('pemasukan', 'pengeluaran') NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    activity_id BIGINT UNSIGNED,
    created_by BIGINT UNSIGNED NOT NULL,
    receipt_file VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_type (type),
    INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- TABLE: jobdesks
-- ====================================================================
CREATE TABLE jobdesks (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    division VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('belum_dikerjakan', 'dalam_proses', 'selesai') NOT NULL DEFAULT 'belum_dikerjakan',
    due_date DATE NOT NULL,
    created_by BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_division (division)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- TABLE: jobdesk_user (Pivot Table)
-- ====================================================================
CREATE TABLE jobdesk_user (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    jobdesk_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (jobdesk_id) REFERENCES jobdesks(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_jobdesk_user (jobdesk_id, user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- TABLE: notifications
-- ====================================================================
CREATE TABLE notifications (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    type ENUM('rapat', 'deadline', 'reminder', 'info', 'achievement') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority ENUM('high', 'medium', 'low') NOT NULL DEFAULT 'medium',
    `read` BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_read (`read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- TABLE: event_registrations
-- ====================================================================
CREATE TABLE event_registrations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    activity_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    status ENUM('registered', 'attended', 'absent') NOT NULL DEFAULT 'registered',
    registered_at TIMESTAMP NOT NULL,
    attended_at TIMESTAMP NULL,
    qr_code VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    UNIQUE KEY unique_activity_user (activity_id, user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- TABLE: certificates
-- ====================================================================
CREATE TABLE certificates (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    activity_id BIGINT UNSIGNED NOT NULL,
    certificate_number VARCHAR(255) UNIQUE NOT NULL,
    category ENUM('peserta', 'panitia', 'pemateri') NOT NULL,
    role VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    issued_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- TABLE: recruitments
-- ====================================================================
CREATE TABLE recruitments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    period VARCHAR(255) NOT NULL,
    status ENUM('open', 'closed', 'selection') NOT NULL DEFAULT 'open',
    quota INT NOT NULL,
    deadline DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- TABLE: recruitment_applications
-- ====================================================================
CREATE TABLE recruitment_applications (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    recruitment_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    nim VARCHAR(255) NOT NULL,
    angkatan VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    division VARCHAR(255) NOT NULL,
    motivation TEXT NOT NULL,
    status ENUM('pending', 'accepted', 'rejected') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (recruitment_id) REFERENCES recruitments(id) ON DELETE CASCADE,
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- TABLE: documents
-- ====================================================================
CREATE TABLE documents (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type ENUM('lpj', 'proposal', 'notulen', 'photo', 'video') NOT NULL,
    category VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_size VARCHAR(255) NOT NULL,
    activity_id BIGINT UNSIGNED,
    uploaded_by BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE SET NULL,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_type (type),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- TABLE: letters
-- ====================================================================
CREATE TABLE letters (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    number VARCHAR(255) UNIQUE NOT NULL,
    subject VARCHAR(255) NOT NULL,
    type ENUM('incoming', 'outgoing') NOT NULL,
    `from` VARCHAR(255),
    `to` VARCHAR(255),
    date DATE NOT NULL,
    status ENUM('pending', 'approved', 'sent') NOT NULL DEFAULT 'pending',
    category VARCHAR(255) NOT NULL,
    content TEXT,
    file_path VARCHAR(255),
    created_by BIGINT UNSIGNED NOT NULL,
    approved_by BIGINT UNSIGNED,
    approved_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_type (type),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- TABLE: letter_templates
-- ====================================================================
CREATE TABLE letter_templates (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- TABLE: forum_channels
-- ====================================================================
CREATE TABLE forum_channels (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM('all', 'division') NOT NULL,
    division VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- TABLE: forum_messages
-- ====================================================================
CREATE TABLE forum_messages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    channel_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (channel_id) REFERENCES forum_channels(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_channel_id (channel_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- END OF SCHEMA
-- ====================================================================
