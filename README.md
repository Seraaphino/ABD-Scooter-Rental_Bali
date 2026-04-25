# 🛵 ABD Scooter Rental — Website

**Bali, but make it freedom.**

Website company rental scooter profesional untuk **ABD Scooter Rental** — dibangun ulang dari referensi https://balibestmotorcycle.com/pricing dengan desain modern, responsif, dan kaya fitur.

---

## ✅ Fitur yang Sudah Diimplementasikan

### 🌍 Multi-Language Interface
- **6 bahasa**: Bahasa Indonesia, English, Русский (Russian), Deutsch (German), Français (French), 中文 (Chinese)
- Toggle bahasa real-time tanpa reload halaman
- Semua konten (nav, hero, pricing, FAQ, modal, footer) tersedia dalam 6 bahasa
- Bahasa tersimpan di localStorage untuk sesi selanjutnya

### 💰 Pricing dengan Toggle Rp / USD
- Toggle **IDR (Rp) ↔ USD ($)** dengan switch yang intuitif
- 3 durasi rental: **Harian / Mingguan / Bulanan**
- Harga otomatis update di seluruh halaman (pricing cards + fleet cards)
- Data harga:
  - Scoopy/Vario: Rp 100K/hari → Rp 450K/minggu → Rp 900K/bulan
  - NMAX/PCX: Rp 150K/hari → Rp 900K/minggu → Rp 1.8Jt/bulan
  - XMAX 300: Rp 300K/hari → Rp 1.4Jt/minggu → Rp 3.7Jt/bulan

### 📏 Kalkulator Tinggi & Berat Badan
- Input slider interaktif untuk **tinggi badan** (140-210 cm) dan **berat badan** (40-150 kg)
- Toggle satuan: **metric (cm/kg)** atau **imperial (ft/lbs)**
- Kalkulasi **BMI otomatis** dengan kategori (Kurus/Normal/Berlebih/Obesitas)
- **Rekomendasi scooter cerdas** berdasarkan postur tubuh:
  - Tinggi < 155cm → Scoopy/Vario (seat height rendah)
  - Tinggi 155-175cm, berat < 85kg → NMAX/PCX (ergonomis optimal)
  - Tinggi 175cm+, atau berat > 85kg → XMAX 300 (stabilitas & power)
- Rekomendasi tersedia dalam semua 6 bahasa

### 🎨 UI/UX Modern
- **Dark mode default** + toggle light mode
- Smooth scroll animasi AOS (Intersection Observer)
- Navbar sticky dengan active section tracking
- Mobile responsive dengan hamburger drawer menu
- Fleet filter (All / City Ride / Maxi Scooter)
- FAQ accordion
- Hero section dengan floating badges animasi
- Trust bar dengan keunggulan layanan
- 6 testimonial cards dari berbagai negara
- Toast notification system

### 📱 Booking Modal + WhatsApp Integration
- Form booking lengkap (nama, WA, scooter, tanggal, lokasi, catatan)
- Auto-format pesan WhatsApp dalam bahasa yang dipilih
- Tombol booking di hero, pricing cards, fleet cards, dan CTA section
- Tombol "Chat via WhatsApp" dan "Request Delivery"

### 🛵 Sections Lengkap
1. **Hero** — dengan stats (500+ riders, 3 models, 24/7, 4.9★)
2. **Trust Bar** — 5 keunggulan layanan
3. **Fleet/Unit** — 3 scooter dengan foto, fitur, dan harga
4. **Pricing** — 3 paket dengan toggle durasi & mata uang
5. **Calculator** — kalkulator BMI + rekomendasi scooter
6. **Delivery** — layanan antar ke hotel/villa
7. **About Us** — profil perusahaan dengan statistik
8. **Testimonials** — 6 ulasan dari berbagai negara
9. **FAQ** — 7 pertanyaan umum + accordion
10. **CTA** — call-to-action dengan WhatsApp button
11. **Footer** — lengkap dengan links, kontak, sosial media

---

## 📁 Struktur File

```
index.html              ← Halaman utama
assets/
  css/
    style.css           ← Semua styling (2800+ baris)
  js/
    app.js              ← Semua JavaScript (1400+ baris)
  img/
    image1.jpeg         ← (ZIP asset placeholder)
README.md
```

---

## 🔧 Konfigurasi

Edit nomor WhatsApp di bagian atas `assets/js/app.js`:

```javascript
const WA_NUMBER = '6281322578318'; // Format: 62xxxxxxxxxx
```

Edit harga di:
```javascript
const PRICING = {
  daily:   { scoopy: 100000, nmax: 150000, xmax: 300000 },
  weekly:  { scoopy: 450000, nmax: 900000, xmax: 1400000 },
  monthly: { scoopy: 900000, nmax: 1800000, xmax: 3700000 }
};
```

Edit kurs USD:
```javascript
const USD_RATE = 16000; // 1 USD = Rp 16.000
```

---

## 🌐 URL Entry Points

| Path | Deskripsi |
|------|-----------|
| `/` atau `/index.html` | Halaman utama |
| `/#fleet` | Section pilihan unit |
| `/#pricing` | Section harga |
| `/#calculator` | Kalkulator BMI + rekomendasi |
| `/#delivery` | Info delivery |
| `/#about` | Tentang perusahaan |
| `/#faq` | FAQ |

---

## 🚀 Deploy

Klik tab **Publish** untuk men-deploy website ini.

---

## 📋 Fitur yang Belum Diimplementasikan / Bisa Ditambahkan

- [ ] Galeri foto dari unit nyata (perlu upload foto dari ZIP file)
- [ ] Integrasi Google Maps untuk area delivery
- [ ] Sistem booking dengan database (perlu backend)
- [ ] Halaman detail unit individual
- [ ] Blog / Bali Travel Tips section
- [ ] Real-time availability calendar
- [ ] Payment gateway (Midtrans/Stripe)
- [ ] Halaman konfirmasi booking

---

## 💡 Rekomendasi Langkah Selanjutnya

1. **Ganti foto** dengan foto asli dari unit ABD Scooter Rental
2. **Update nomor WhatsApp** di `assets/js/app.js`
3. **Update kontak** di footer (email, nomor, alamat)
4. **Tambah foto gallery** untuk tiap unit
5. **Hubungkan ke Google Analytics** untuk tracking
6. **Tambah meta OG tags** untuk sharing di sosial media

---

*Built with ❤️ | ABD Scooter Rental — Bali, but make it freedom 🌴*
