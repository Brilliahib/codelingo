<img src="/frontend/public/images/logo.png" alt="Codelingo" width="200">

# Codelingo

CodeLingo adalah program pembelajaran coding yang dirancang khusus untuk anak-anak, mulai dari pemula hingga level intermediate. Proyek ini dibuat menggunakan Next.Js sebagai frontend dan Laravel sebagai backendnya.

---

## Teknologi yang Digunakan

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [Laravel](https://laravel.com/)
- **Package Manager**: pnpm/npm/yarn

---

## Prasyarat

Sebelum menjalankan proyek ini, pastikan Anda sudah menginstal:

1. **Node.js** & **npm/pnpm/yarn** (untuk frontend)
2. **Composer** (untuk backend Laravel)
3. **PHP** (minimal versi 8.x)
4. **Database** seperti MySQL atau PostgreSQL

---

## Cara Menjalankan Proyek

### 1. Clone Repository

```bash
git clone https://github.com/Brilliahib/codelingo.git
cd codelingo
```

### 2. Menjalankan Backend (Laravel)

1. **Masuk ke folder backend**
   ```bash
   cd backend
   ```

2. **Install dependensi Laravel**
   ```bash
   composer install
   ```

3. **Salin file konfigurasi .env**
   ```bash
   cp .env.example .env
   ```

4. **Generate Application Key**
   ```bash
   php artisan key:generate
   ```

5. **Konfigurasi database**
   - Buka file `.env` di direktori backend
   - Atur konfigurasi `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD`

6. **Jalankan migrasi database**
   ```bash
   php artisan migrate
   ```

7. **Jalankan server Laravel**
   ```bash
   php artisan serve
   ```
   Backend akan berjalan di `http://localhost:8000`.

---

### 3. Menjalankan Frontend (Next.js)

1. **Masuk ke folder frontend**
   ```bash
   cd frontend
   ```

2. **Install dependensi Next.js**
   ```bash
   pnpm install
   ```
   > Jika menggunakan npm/yarn:
   > ```bash
   > npm install
   > # atau
   > yarn install
   > ```

3. **Jalankan server development**
   ```bash
   pnpm dev
   ```
   > Atau gunakan npm/yarn:
   > ```bash
   > npm run dev
   > # atau
   > yarn dev
   > ```

4. **Akses frontend**
   Frontend akan berjalan di `http://localhost:3000`.

---

## Struktur Proyek

```
.
├── backend/        # Folder untuk Laravel backend
├── frontend/       # Folder untuk Next.js frontend
└── README.md       # Dokumentasi proyek
```

---

## Konfigurasi Tambahan

- **API Endpoint**: Pastikan endpoint API Laravel sudah dikonfigurasi di frontend Next.js, biasanya di file `.env.local`:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:8000/api
  ```

---

## Troubleshooting

1. **Error Migrasi Database**:
   - Pastikan konfigurasi database di `.env` sudah benar.
   - Pastikan database sudah dibuat di MySQL/PostgreSQL.

2. **Port Bentrok**:
   - Jika port `3000` atau `8000` sudah digunakan, jalankan dengan port lain:
     ```bash
     php artisan serve --port=8001
     pnpm dev -- -p 3001
     ```

---
