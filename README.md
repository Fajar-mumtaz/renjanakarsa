# Grisik WO - Next.js Full + Supabase

Sistem Informasi Wedding Organizer Gresik - Admin & Client Portal

## 🚀 Deploy 1 Klik ke Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/grisik-wo)

### Langkah Deploy:
1. Upload folder ini ke Github (bikin repo baru > upload files)
2. Buka vercel.com > Add New Project > Import repo kamu
3. Tambahkan Environment Variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
4. Deploy -> Dapat link https://grisik-wo.vercel.app

### Setup Supabase (wajib sebelum login bisa):
- Ikuti file di folder sebelumnya: supabase_schema.sql dan seed_data.sql
- Buat user di Authentication:
  - admin@grisikwo.com / admin123 role admin
  - rina.budi@gmail.com / klien123 role client

### Struktur:
- /app/login - Login page
- /app/admin - Dashboard Admin (konek Supabase)
- /app/client - Portal Klien (countdown H-)
- /lib/supabase.ts - Koneksi DB

### Next Feature:
- Upload bukti transfer ke Supabase Storage
- Midtrans integration
- WA notification via Fonnte

Made with love for Grisik WO ❤️
