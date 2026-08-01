
# GRISIK WO - PANDUAN SETUP DATABASE & HOSTING

## LANGKAH 1: SETUP SUPABASE (GRATIS - 5 MENIT)

1. Buka supabase.com > Sign Up > New Project
   Nama: grisik-wo
   Password DB: buat yang kuat

2. Masuk ke SQL Editor > New Query > Paste isi file `supabase_schema.sql` > RUN
3. Paste lagi `seed_data.sql` > RUN
4. Buka Authentication > Users > Add User:
   - admin@grisikwo.com / admin123 (centang Auto Confirm)
   - rina.budi@gmail.com / klien123
   - budi.sinta@gmail.com / klien123

5. Buka Table Editor > users > isi manual:
   - admin@grisikwo.com role = admin
   - rina.budi@gmail.com role = client

6. Catat di Settings > API:
   - Project URL
   - anon key
   - service_role key

## LANGKAH 2: FILE SIAP HOSTING

File yang kamu butuhkan ada di folder ini:

### Opsi A - Paling Gampang (Tanpa Coding):
Upload file `index.html` (file artifact yang sudah kamu coba) ke:
- Netlify: drag & drop file html ke netlify.com/drop
- Atau Hostinger: File Manager > public_html > upload index.html
-> Langsung online! Tapi data masih local.

### Opsi B - Full Next.js + Supabase (Rekomendasi):
Struktur project sudah aku siapkan di /project-full/

1. Install Node.js di laptop
2. Buka terminal di folder project:
```
npm install
npm run dev
```
3. Buat file .env.local isi:
```
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

4. Deploy ke Vercel (gratis):
- Push ke Github
- Import di vercel.com
- Jadi online dengan domain gratis

## LANGKAH 3: HUBUNGKAN DOMAIN

Beli domain grisikwo.com di Niagahoster/Domainesia (150rb/thn)
-> Arahkan nameserver ke Vercel/Netlify

## FITUR NEXT YANG BISA DITAMBAH

- [ ] Midtrans Payment (DP otomatis)
- [ ] WA Gateway (Fonnte/Wablas) untuk notif otomatis
- [ ] Upload bukti transfer ke Supabase Storage
- [ ] Cetak Kontrak PDF otomatis

Butuh aku bikinin project Next.js full nya juga?
