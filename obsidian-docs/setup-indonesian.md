---
tags: [localization, indonesian, bahasa, i18n, setup, southeast-asia]
aliases: [setup-indonesian, indonesian-setup, bahasa-guide, panduan-bahasa-indonesia]
---

# 🌍 Panduan Lokalisasi Multibahasa: Konfigurasi Bahasa Indonesia (Indonesian)

[[DOCUMENTATION_INDEX|Back to Home]] | [[quick-start|Quick Start]] | [[setup-french|French Setup]] | [[setup-hindi|Hindi Setup]] | [[setup-bengali|Bengali Setup]] | [[ENV_GUIDE|Env Customization Guide]] | [[architecture-env|Env Architecture]]

Birthday Bloom menyediakan **lokalisasi Bahasa Indonesia yang komprehensif**, dirancang dengan bahasa yang hangat, penuh ketulusan, puitis, dan disesuaikan secara mendalam untuk setiap arketipe hubungan keluarga maupun sahabat.

---

## 🚀 Konfigurasi Cepat (Mengaktifkan Bahasa Indonesia)

Untuk mengubah bahasa seluruh situs ke Bahasa Indonesia, atur `VITE_LANGUAGE` (atau `VITE_LANG`) di file `.env` / `.env.local` Anda:

```env
VITE_LANGUAGE=id
```

### Alias yang Diterima
Store reaktif Zustand dan sistem i18n secara otomatis menormalisasi variasi berikut ke kode `'id'`:
- `id`
- `indonesian`
- `bahasa`
- `indonesia`

*(Tidak sensitif huruf besar/kecil dan spasi dihapus secara otomatis)*

### ⚡ Uji Langsung via Parameter URL (Tanpa Konfigurasi)

Coba langsung perayaan berkesan dalam Bahasa Indonesia melalui tautan browser:
👉 [https://birthday-bloom.vercel.app/?name=Dewi&rel=partner&lang=id&color=%23FF2A6D&sender=Rian](https://birthday-bloom.vercel.app/?name=Dewi&rel=partner&lang=id&color=%23FF2A6D&sender=Rian)

---

## 💎 Fitur Lokalisasi Bahasa Indonesia

### 1. Surat Emosional Khusus (`indonesianTemplates.ts`)
Setiap hubungan memiliki surat emosional yang dirancang khusus:
- **Pasangan (Pria/Wanita)**: Mengungkapkan rasa syukur, cinta tanpa syarat, dan janji kebersamaan abadi.
- **Sahabat (Friendly / Legend)**: Apresiasi tawa lepas, cerita larut malam, kesetiaan, dan semangat hidup.
- **Keluarga Inti**: Ayah, Ibu, Saudara Kandung, Kakak/Adik, Kakek, Nenek, Om, Tante, Sepupu, Anak.
- **Profesional & Mentor**: Rekan kerja dan guru/pembimbing terhormat.

### 2. Harapan Besar Dinamis (Big Wishes)
Menghasilkan pesan ulang tahun dinamis berdasarkan minat:
- 🏎️ **Otomotif/Mobil**: *"Semoga hidupmu melesat kencang dari 0 ke 100 dalam kebahagiaan murni tahun ini!"*
- 💻 **Coding/Teknologi**: *"Semoga hidupmu bebas dari bug dan dipenuhi fitur kebahagiaan tanpa batas!"*
- ❤️ **Pasangan**: *"Setiap detak jantungku adalah doa tulus untuk kebahagiaanmu."*
- 🔥 **Sahabat**: *"Tetaplah menjadi legenda, berjiwa bebas, dan terus menginspirasi!"*

### 3. Pohon Hati Cinta (`HeartTree.tsx`)
12 daun hati interaktif mengungkap kutipan kasih sayang dalam Bahasa Indonesia saat diklik, dilengkapi efek animasi dan suara interaktif.

### 4. SEO & OpenGraph Dinamis
- Tag judul otomatis: `Selamat Ulang Tahun {Nama}! | Birthday Bloom`
- Deskripsi meta dan OpenGraph disesuaikan dengan bahasa lokal (`id_ID`).
- Tag schema JSON-LD terstruktur secara otomatis disinkronkan.
