# Marketing API

Ini adalah REST API sederhana yang dibangun dengan Express.js dan Prisma ORM untuk mengelola data `marketing`. API ini menyediakan endpoint untuk membuat, membaca, memperbarui, dan menghapus data marketing.

## Memulai

### Prasyarat

- Node.js (v14 atau lebih baru)
- npm (v6 atau lebih baru) atau Yarn
- Prisma CLI (`npm install @prisma/cli`)

### Instalasi

1. Clone repositori ini:

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. Instal dependensi:

   ```bash
   npm install
   ```

3. Siapkan database Prisma:

   ```bash
   npx prisma migrate dev --name init
   ```

4. Jalankan server:

   ```bash
   npm start
   ```

   Server akan berjalan di `http://localhost:4000`.

### Endpoint API

#### 1. Membuat Data Marketing

- **URL:** `/api/marketing`
- **Metode:** `POST`
- **Body Permintaan:**

  ```json
  {
    "name": "Nama Marketing"
  }
  ```

- **Respon:**

  ```json
  {
    "id": 1,
    "name": "Nama Marketing"
  }
  ```

- **Deskripsi:** Membuat data marketing baru dalam database.

#### 2. Mendapatkan Semua Data Marketing

- **URL:** `/api/marketing`
- **Metode:** `GET`
- **Respon:**

  ```json
  [
    {
      "id": 1,
      "name": "Nama Marketing"
    }
  ]
  ```

- **Deskripsi:** Mengambil semua data marketing dari database.

#### 3. Mendapatkan Data Marketing Berdasarkan ID

- **URL:** `/api/marketing/:id`
- **Metode:** `GET`
- **Respon:**

  ```json
  {
    "id": 1,
    "name": "Nama Marketing"
  }
  ```

- **Deskripsi:** Mengambil data marketing spesifik berdasarkan ID. Jika data tidak ditemukan, akan mengembalikan error `404`.

#### 4. Memperbarui Data Marketing

- **URL:** `/api/marketing/:id`
- **Metode:** `PUT`
- **Body Permintaan:**

  ```json
  {
    "name": "Nama Marketing yang Diperbarui"
  }
  ```

- **Respon:**

  ```json
  {
    "id": 1,
    "name": "Nama Marketing yang Diperbarui"
  }
  ```

- **Deskripsi:** Memperbarui nama data marketing spesifik berdasarkan ID.

#### 5. Menghapus Data Marketing

- **URL:** `/api/marketing/:id`
- **Metode:** `DELETE`
- **Respon:**

  ```json
  {
    "message": "Marketing berhasil dihapus"
  }
  ```

- **Deskripsi:** Menghapus data marketing spesifik berdasarkan ID.

### Menjalankan Proyek

Untuk menjalankan proyek secara lokal:

1. Pastikan database telah diatur dengan benar.
2. Jalankan server:

   ```bash
   npm start
   ```

   API akan dapat diakses di `http://localhost:4000/api/marketing`.

### Struktur Proyek

- `src/controllers/marketingController.js`: Berisi logika untuk menangani data marketing.
- `src/routes/marketingRoutes.js`: Mendefinisikan rute untuk API marketing.
- `app.js`: Titik masuk utama untuk aplikasi, mengatur rute dan middleware.

### Alat dan Teknologi

- **Express.js**: Framework web untuk Node.js.
- **Prisma**: ORM (Object-Relational Mapping) untuk manajemen database.
- **Node.js**: Runtime JavaScript untuk pemrograman sisi server.

