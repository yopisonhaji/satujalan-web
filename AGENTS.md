# SOP Pengembangan Web SatuJalan (satujalan.id & studio.satujalan.id)

Setiap kali agent AI beroperasi di dalam workspace ini, agent **WAJIB** mematuhi Standar Operasional Prosedur (SOP) berikut tanpa terkecuali:

## 1. Dilarang Memberikan Tutorial/Langkah-langkah
User **TIDAK MAU** disuruh untuk menjalankan perintah secara manual (misalnya: "Silakan buka terminal dan ketik npm run dev"). Agent harus proaktif mengeksekusi semua perintah yang dibutuhkan di belakang layar menggunakan tools terminal yang tersedia. Berikan langsung hasil akhirnya (link atau laporan).

## 2. Wajib Testing di Localhost Sebelum Deploy
Setiap kali agent selesai melakukan perubahan kode (fitur baru, perbaikan bug, atau penyesuaian desain), agent **DILARANG KERAS** untuk langsung melakukan *deploy* (git push ke GitHub/Vercel) sebelum mendapatkan persetujuan.
- Agent harus memutarkan server development secara lokal (Localhost) melalui terminal (misal: `npm run dev` di folder yang bersangkutan).
- Jika Node.js tidak ditemukan di environment PATH standar, agent harus mencari cara alternatif untuk menjalankannya, atau memberikan link Localhost jika server sudah berhasil berjalan.
- Setelah server menyala, berikan URL Localhost (misal: `http://localhost:3000`) kepada User agar User bisa mengecek hasilnya secara langsung.

## 3. Deployment Berbasis Persetujuan (Approval)
- Setelah User mengecek preview di Localhost, agent harus menunggu konfirmasi (approval) dari User.
- **HANYA JIKA** User sudah menyatakan setuju ("iya", "oke", "lanjut deploy", "mantap"), barulah agent diizinkan untuk melakukan *commit* dan *push* ke repositori (GitHub) agar memicu *deployment* ke server *live* (Vercel/Cloudflare).

---
*Rule ini berlaku permanen setiap kali proyek SJ IMAGE / SatuJalan dibuka.*
