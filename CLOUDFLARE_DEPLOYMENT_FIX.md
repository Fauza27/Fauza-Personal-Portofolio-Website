# 🔧 Panduan Deploy ke Cloudflare Pages - FIXED

## ✅ Masalah Sudah Diperbaiki

File `wrangler.toml` sudah ditambahkan ke repository untuk konfigurasi Cloudflare Pages.

---

## 🚀 Cara Deploy (2 Metode)

### Metode 1: Git Integration (RECOMMENDED)

Ini cara paling mudah dan otomatis:

#### Langkah-langkah:

1. **Login ke Cloudflare Dashboard**
   - Buka: https://dash.cloudflare.com/
   - Pilih account kamu

2. **Buat Pages Project Baru**
   - Klik: **Workers & Pages** → **Create** → **Pages**
   - Pilih: **Connect to Git**

3. **Connect GitHub Repository**
   - Authorize Cloudflare untuk akses GitHub
   - Pilih repository: `Fauza27/Fauza-Personal-Portofolio-Website`

4. **Konfigurasi Build Settings**
   ```
   Project name: fauza-portfolio
   Production branch: master
   Framework preset: Next.js (Static HTML Export)
   Build command: npm run build
   Build output directory: out
   Root directory: / (atau kosong)
   ```

5. **Environment Variables** (opsional)
   - Tidak perlu untuk sekarang
   - Bisa ditambahkan nanti kalau butuh

6. **Deploy!**
   - Klik **Save and Deploy**
   - Tunggu proses build (sekitar 1-2 menit)
   - Selesai! 🎉

#### Keuntungan Metode Ini:
- ✅ Auto-deploy setiap kali push ke GitHub
- ✅ Preview deployment untuk setiap PR
- ✅ Rollback mudah ke versi sebelumnya
- ✅ Build logs lengkap di dashboard

---

### Metode 2: Direct Upload via Wrangler

Kalau mau deploy manual dari komputer lokal:

#### Langkah-langkah:

1. **Install Wrangler** (kalau belum)
   ```bash
   npm install -g wrangler
   ```

2. **Login ke Cloudflare**
   ```bash
   wrangler login
   ```

3. **Build Project**
   ```bash
   npm run build
   ```

4. **Deploy ke Cloudflare Pages**
   ```bash
   wrangler pages deploy out --project-name=fauza-portfolio
   ```

5. **Selesai!**
   - Wrangler akan upload semua file dari folder `out/`
   - Kamu akan dapat URL deployment

---

## 📋 Konfigurasi yang Sudah Dibuat

### File: `wrangler.toml`
```toml
name = "fauza-portfolio"
compatibility_date = "2026-02-11"
pages_build_output_dir = "out"

[site]
bucket = "./out"
```

**Penjelasan:**
- `name`: Nama project di Cloudflare
- `compatibility_date`: Tanggal kompatibilitas Cloudflare Workers
- `pages_build_output_dir`: Folder output dari Next.js build
- `[site].bucket`: Lokasi file static yang akan di-upload

---

## 🔍 Troubleshooting

### Error: "Missing entry-point to Worker script"

**Penyebab:** Wrangler mencoba deploy sebagai Worker, bukan Pages

**Solusi:** 
- Pastikan menggunakan command: `wrangler pages deploy out`
- BUKAN: `wrangler deploy` (ini untuk Workers)

### Error: "Build failed"

**Cek:**
1. Apakah `npm run build` berhasil di lokal?
2. Apakah folder `out/` ter-generate?
3. Apakah ada error di build logs Cloudflare?

**Solusi:**
```bash
# Test build di lokal dulu
npm run build

# Cek apakah folder out/ ada
dir out

# Kalau berhasil, baru deploy
```

### Error: "Authentication required"

**Solusi:**
```bash
# Login ulang ke Cloudflare
wrangler login

# Atau set API token manual
wrangler whoami
```

---

## 🎯 Rekomendasi

**Gunakan Metode 1 (Git Integration)** karena:
- Lebih mudah dan otomatis
- Tidak perlu install Wrangler di lokal
- Auto-deploy setiap push
- Preview untuk setiap branch/PR
- Rollback mudah kalau ada masalah

**Gunakan Metode 2 (Direct Upload)** kalau:
- Mau deploy cepat tanpa push ke Git
- Testing deployment sebelum push
- Deploy dari CI/CD pipeline custom

---

## 📊 Setelah Deploy Berhasil

Kamu akan dapat:
- **Production URL**: `https://fauza-portfolio.pages.dev`
- **Custom domain**: Bisa tambahkan domain sendiri di Settings
- **Analytics**: Lihat traffic dan performance
- **Build history**: Semua deployment history tersimpan

---

## 🔗 Resources

- **Cloudflare Pages Docs**: https://developers.cloudflare.com/pages/
- **Next.js Static Export**: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- **Wrangler CLI**: https://developers.cloudflare.com/workers/wrangler/

---

## ✨ Next Steps Setelah Deploy

1. **Custom Domain**
   - Tambahkan domain sendiri (gratis)
   - Settings → Custom domains → Add domain

2. **Environment Variables**
   - Kalau butuh API keys atau secrets
   - Settings → Environment variables

3. **Build Optimization**
   - Enable build cache untuk build lebih cepat
   - Settings → Builds & deployments → Build cache

4. **Analytics**
   - Monitor traffic dan performance
   - Analytics tab di dashboard

---

**Status:** ✅ READY TO DEPLOY  
**Last Updated:** February 11, 2026

Selamat mencoba! 🚀
