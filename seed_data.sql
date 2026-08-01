
-- ============================================
-- SEED DATA - GRISIK WO
-- ============================================

-- Packages
INSERT INTO packages (nama_paket, harga, deskripsi, detail_layanan) VALUES
('Akad Intimate', 15000000, 'Untuk akad sederhana 50-100 pax', '["Dekor Akad Minimalis", "MUA Akad", "Foto + Video Akad", "MC Akad", "Catering 100 pax"]'),
('Silver', 35000000, 'Paket favorit Gresik 200 pax', '["Dekor Pelaminan 6m", "Catering 200 pax", "MUA + Attire", "Foto Video + Drone", "MC + Hiburan Akustik", "Souvenir"]'),
('Gold', 75000000, 'Best Seller, all-in 400 pax', '["Dekor Premium 8m + Lighting", "Catering 400 pax + Gubukan", "MUA Premium + 2 Attire", "Foto Video Cinematic", "MC Pro + Entertainment", "Undangan + Souvenir"]'),
('Platinum', 125000000, 'Luxury Wedding Gedung', '["Dekor Luxury + Full Lighting", "Catering 600 pax + Stall", "MUA Celebrity + 3 Attire", "Foto Video + Same Day Edit", "MC + Band", "WO Full Day + Crew"]');

-- Vendors
INSERT INTO vendors (kategori, nama_vendor, no_wa, harga_standar, rating) VALUES
('catering', 'Bu Mamik Catering Gresik', '0812-3456-7890', 45000, 4.8),
('dekorasi', 'Dekor Aesthetic Gresik', '0821-1111-2222', 15000000, 4.9),
('mua', 'MUA Lita Surabaya', '0813-9999-8888', 5000000, 4.9),
('fotografi', 'Lensacinta Photo', '0857-7777-6666', 7000000, 4.7),
('gedung', 'Gedung Wahana Ekspresi Gresik', '031-123456', 12000000, 4.6),
('mc', 'MC Andhika Pro', '0812-3333-4444', 2500000, 4.8);

-- Demo Users (password akan di-handle Supabase Auth, ini placeholder)
-- Email: admin@grisikwo.com / rina.budi@gmail.com / budi.sinta@gmail.com
