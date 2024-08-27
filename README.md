# Marketing API

Ini adalah REST API sederhana yang dibangun dengan Express.js dan Prisma ORM untuk mengelola data `marketing`. API ini menyediakan endpoint untuk membuat, membaca, memperbarui, dan menghapus data marketing.

## Memulai

#
### Instalasi

1. Clone repositori ini:

   ```bash
   git clone https://github.com/Sanjaee/Backend-PT.HCD.git
   cd (nama folder repo)
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





# Penjualan API

Ini adalah REST API yang dibangun dengan Express.js dan Prisma ORM untuk mengelola penjualan (`penjualan`). API ini mencakup fitur untuk membuat catatan penjualan dan secara otomatis menghitung komisi berdasarkan omzet penjualan.

## Memulai


#### 1. Membuat Catatan Penjualan (`Penjualan`)

- **URL:** `/api/penjualan`
- **Metode:** `POST`
- **Body Permintaan:**

  ```json
  {
    "marketingId": "1",
    "cargo_fee": "50000",
    "total_balance": "1000000"
  }
  ```

- **Respon:**

  ```json
  {
    "id": 1,
    "transaction_number": "TRX001",
    "marketingId": 1,
    "date": "2024-08-27T10:00:00.000Z",
    "cargo_fee": 50000,
    "total_balance": 1000000,
    "grand_total": 1050000
  }
  ```

- **Deskripsi:** Membuat catatan penjualan baru. Sistem menghitung `grand_total` (jumlah dari `cargo_fee` dan `total_balance`) dan menghasilkan nomor transaksi unik. Sistem juga menghitung dan menyimpan komisi berdasarkan `grand_total`.

#### 2. Mendapatkan Semua Catatan Penjualan

- **URL:** `/api/penjualan`
- **Metode:** `GET`
- **Respon:**

  ```json
  [
    {
      "id": 1,
      "transaction_number": "TRX001",
      "marketingId": 1,
      "date": "2024-08-27T10:00:00.000Z",
      "cargo_fee": 50000,
      "total_balance": 1000000,
      "grand_total": 1050000,
      "marketing": {
        "id": 1,
        "name": "Nama Marketing"
      }
    }
  ]
  ```

- **Deskripsi:** Mengambil semua catatan penjualan, termasuk detail marketing terkait.

### Cara Kerja

1. **Pembuatan Nomor Transaksi:**
   - Setiap catatan penjualan memiliki nomor transaksi unik yang dihasilkan oleh fungsi `generateTransactionNumber`.
   - Nomor transaksi ditingkatkan berdasarkan transaksi terakhir yang tercatat.

2. **Perhitungan Komisi:**
   - Persentase komisi ditentukan berdasarkan total penjualan (`omzet`), dengan kriteria sebagai berikut:
     - 10% untuk penjualan >= 500.000.000
     - 5% untuk penjualan >= 200.000.000
     - 2,5% untuk penjualan >= 100.000.000
   - Komisi yang dihitung disimpan dalam tabel `hasilPerhitungan`.

3. **Penanganan Tanggal:**
   - Tanggal penjualan dicatat sebagai tanggal saat ini.
   - Nama bulan diekstrak dari tanggal untuk menyimpan komisi.

### Struktur Proyek

- `src/controllers/penjualanController.js`: Berisi logika untuk membuat dan mengambil catatan penjualan.
- `src/routes/penjualanRoutes.js`: Mendefinisikan rute untuk API penjualan.
- `src/utils/generateTransactionNumber.js`: Fungsi utilitas untuk menghasilkan nomor transaksi unik.

### Alat dan Teknologi

- **Express.js**: Framework web untuk Node.js.
- **Prisma**: ORM (Object-Relational Mapping) untuk manajemen database.
- **Node.js**: Runtime JavaScript untuk pemrograman sisi server.

### Menjalankan Proyek

Untuk menjalankan proyek secara lokal:

1. Pastikan database telah diatur dengan benar.
2. Jalankan server:

   ```bash
   npm start
   ```

   API akan dapat diakses di `http://localhost:4000/api/penjualan`.

# Dokumentasi API Hasil Perhitungan

API ini menggunakan Express.js dan Prisma ORM untuk mengelola data `hasilPerhitungan`. Berikut adalah dokumentasi lengkap tentang bagaimana API ini bekerja, termasuk endpoint, cara menjalankan server, dan konfigurasi.

## Struktur Proyek

- **`src/controllers/hasilPerhitunganController.js`**: Mengandung logika untuk mengelola data hasil perhitungan.
- **`src/routes/hasilPerhitunganRoutes.js`**: Mendefinisikan rute untuk API hasil perhitungan.
- **`app.js`**: Titik masuk utama aplikasi, mengatur rute dan middleware.

## Endpoint API

### 1. Ambil Semua Hasil Perhitungan

- **URL:** `/api/hasil`
- **Metode:** `GET`
- **Respon:**

  ```json
  [
    {
      "id": 1,
      "transaction_number": "TRX001",
      "marketingId": 1,
      "date": "2024-08-27T10:00:00.000Z",
      "cargo_fee": 50000,
      "total_balance": 1000000,
      "grand_total": 1050000
    }
  ]
  ```

- **Deskripsi:** Mengambil semua catatan hasil perhitungan dari database.

### 2. Ambil Hasil Perhitungan Berdasarkan ID

- **URL:** `/api/hasil/:id`
- **Metode:** `GET`
- **Respon:**

  ```json
  {
    "id": 1,
    "transaction_number": "TRX001",
    "marketingId": 1,
    "date": "2024-08-27T10:00:00.000Z",
    "cargo_fee": 50000,
    "total_balance": 1000000,
    "grand_total": 1050000
  }
  ```

- **Deskripsi:** Mengambil catatan hasil perhitungan tertentu berdasarkan ID. Jika tidak ditemukan, akan mengembalikan status `404`.

### 3. Hapus Hasil Perhitungan Berdasarkan ID

- **URL:** `/api/hasil/:id`
- **Metode:** `DELETE`
- **Respon:**

  ```json
  {
    "message": "Data berhasil dihapus",
    "hasilPerhitungan": {
      "id": 1,
      "transaction_number": "TRX001",
      "marketingId": 1,
      "date": "2024-08-27T10:00:00.000Z",
      "cargo_fee": 50000,
      "total_balance": 1000000,
      "grand_total": 1050000
    }
  }
  ```

- **Deskripsi:** Menghapus catatan hasil perhitungan tertentu berdasarkan ID.

## Menjalankan Proyek

Untuk menjalankan proyek secara lokal:

1. Pastikan database telah diatur dengan benar.
2. Jalankan server:

   ```bash
   npm start
   ```

   API akan dapat diakses di `http://localhost:4000/api/hasil`.

## Konfigurasi Server

File `app.js` mengatur server Express dan menghubungkan rute API:

```javascript
const express = require("express");
const app = express();
const cors = require("cors");

// Mengaktifkan CORS
app.use(cors());

// Mengimpor rute
const marketingRoutes = require("./src/routes/marketingRoutes");
const penjualanRoutes = require("./src/routes/penjualanRoutes");
const hasilPerhitunganRoutes = require("./src/routes/hasilPerhitunganRoutes");

// Middleware untuk parsing JSON
app.use(express.json());

// Menggunakan rute
app.use("/api/marketing", marketingRoutes);
app.use("/api/penjualan", penjualanRoutes);
app.use("/api/hasil", hasilPerhitunganRoutes);

// Menentukan port dan memulai server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
```

## Struktur File

- **`src/controllers/hasilPerhitunganController.js`**: Berisi logika untuk mengambil, menghapus, dan mengelola hasil perhitungan.
- **`src/routes/hasilPerhitunganRoutes.js`**: Mendefinisikan rute untuk mengakses endpoint hasil perhitungan.
- **`app.js`**: Mengatur server, middleware, dan rute API.

## Alat dan Teknologi

- **Express.js**: Framework web untuk Node.js.
- **Prisma**: ORM (Object-Relational Mapping) untuk manajemen database.
- **Node.js**: Runtime JavaScript untuk pemrograman sisi server.

