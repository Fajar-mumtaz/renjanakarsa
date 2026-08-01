
-- ============================================
-- GRISIK WEDDING ORGANIZER - DATABASE SCHEMA
-- Supabase / PostgreSQL
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabel Users (Auth + Role)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- akan diganti Supabase Auth
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'client')),
    nama_lengkap VARCHAR(255),
    no_wa VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Tabel Clients (Data Pasangan)
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    nama_pasangan VARCHAR(255) NOT NULL, -- ex: Rina & Budi
    nama_pria VARCHAR(255),
    nama_wanita VARCHAR(255),
    tanggal_nikah DATE NOT NULL,
    alamat TEXT,
    no_wa VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    status VARCHAR(20) DEFAULT 'lead' CHECK (status IN ('lead', 'konsultasi', 'booking', 'persiapan', 'selesai', 'batal')),
    catatan TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Tabel Packages (Paket Wedding)
CREATE TABLE packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama_paket VARCHAR(100) NOT NULL,
    harga BIGINT NOT NULL,
    deskripsi TEXT,
    detail_layanan JSONB, -- ["Dekor Pelaminan", "Catering 200pax", ...]
    durasi_hari INT DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Tabel Vendors
CREATE TABLE vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kategori VARCHAR(50) NOT NULL CHECK (kategori IN ('catering', 'dekorasi', 'mua', 'fotografi', 'videografi', 'mc', 'gedung', 'hiburan', 'souvenir', 'lainnya')),
    nama_vendor VARCHAR(255) NOT NULL,
    kontak VARCHAR(255),
    no_wa VARCHAR(20),
    alamat TEXT,
    harga_standar BIGINT,
    rating DECIMAL(2,1) DEFAULT 5.0,
    catatan TEXT,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 5. Tabel Events / Bookings (Inti)
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
    package_id UUID REFERENCES packages(id),
    venue VARCHAR(255),
    alamat_venue TEXT,
    tanggal_event DATE NOT NULL,
    jam_akad TIME,
    jam_resepsi TIME,
    total_biaya BIGINT NOT NULL,
    dp BIGINT DEFAULT 0,
    sisa_tagihan BIGINT GENERATED ALWAYS AS (total_biaya - dp) STORED,
    status_bayar VARCHAR(20) DEFAULT 'belum_dp' CHECK (status_bayar IN ('belum_dp', 'dp', 'cicil', 'lunas', 'batal')),
    status_event VARCHAR(20) DEFAULT 'persiapan' CHECK (status_event IN ('persiapan', 'gladi', 'hari_h', 'selesai', 'batal')),
    progress INT DEFAULT 0 CHECK (progress >=0 AND progress <=100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 6. Junction Event Vendors
CREATE TABLE event_vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    vendor_id UUID REFERENCES vendors(id) ON DELETE SET NULL,
    harga_deal BIGINT,
    status VARCHAR(20) DEFAULT 'booked',
    catatan TEXT,
    UNIQUE(event_id, vendor_id)
);

-- 7. Tabel Payments (Riwayat Pembayaran)
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
    jumlah BIGINT NOT NULL,
    metode VARCHAR(50) CHECK (metode IN ('transfer', 'cash', 'midtrans', 'qris')),
    bukti_transfer TEXT, -- URL supabase storage
    tanggal_bayar TIMESTAMP DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
    created_by UUID REFERENCES users(id)
);

-- 8. Tabel Tasks / Checklist
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    judul VARCHAR(255) NOT NULL, -- "Fitting Baju Pengantin"
    deskripsi TEXT,
    deadline_label VARCHAR(50), -- H-30, H-7
    deadline_date DATE,
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP,
    assigned_to VARCHAR(50) DEFAULT 'admin' CHECK (assigned_to IN ('admin', 'client', 'vendor')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 9. Tabel Files / Galeri Progress
CREATE TABLE event_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    file_name VARCHAR(255),
    file_url TEXT NOT NULL,
    file_type VARCHAR(20) CHECK (file_type IN ('foto', 'dokumen', 'invoice', 'kontrak')),
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_clients_tanggal ON clients(tanggal_nikah);
CREATE INDEX idx_events_tanggal ON events(tanggal_event);
CREATE INDEX idx_payments_event ON payments(event_id);
CREATE INDEX idx_tasks_event ON tasks(event_id);

-- Row Level Security (Supabase)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policy: Admin bisa lihat semua, Client hanya miliknya
-- (Aktifkan setelah setup Supabase Auth)
