# PPM Audio Recording System

Sistem recording kajian untuk PPM Muhammad Khoir, dibangun dengan Next.js dan Supabase.

## Fitur

- 📤 **Admin Upload** - Upload file MP3 dengan drag & drop
- 🎵 **Audio Player** - Player lengkap dengan kontrol playback
- 📊 **Play Count** - Tracking jumlah play per recording
- 📁 **Archive** - Auto-archive recording lama, bisa restore

## Setup

### 1. Supabase Setup

1. Buat project baru di [Supabase](https://supabase.com)
2. Buka SQL Editor dan jalankan `supabase-schema.sql`
3. Buat Storage Bucket:
   - Nama: `recordings`
   - Public: Yes
   - Max file size: 50MB

### 2. Environment Variables

Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Dapatkan credentials dari Supabase Dashboard > Settings > API

### 3. Install & Run

```bash
cd ppm-audio
npm install
npm run dev
```

Buka http://localhost:3000

## Struktur Project

```
src/
├── app/
│   ├── admin/page.tsx      # Halaman upload admin
│   ├── player/page.tsx     # Halaman audio player
│   └── api/recordings/     # API routes
├── components/
│   ├── AudioPlayer.tsx     # Komponen player
│   ├── RecordingUpload.tsx # Komponen upload
│   └── RecordingList.tsx   # List recordings
└── lib/
    ├── supabase.ts         # Supabase client
    └── types.ts            # TypeScript types
```

## Kategori Recording

- Tafsir Al-Qur'an
- Hadits
- Fiqih
- Akhlak & Tasawuf
- Sirah Nabawiyah
- Mutiara Hikmah
