# Mini CRM UMKM Kuliner

Sistem CRM sederhana untuk mencatat data pelanggan dan pesanan warung kuliner.

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Backend | Node.js, Express, TypeScript |
| Frontend | React, TypeScript, Vite, Bootstrap 5 |
| Storage | File-based JSON (`db.json`) |

## Struktur Project

```
mini-crm/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Logic bisnis per resource
│   │   │   ├── customerController.ts
│   │   │   └── orderController.ts
│   │   ├── middleware/
│   │   │   └── errorHandler.ts  # Global error handling
│   │   ├── models/
│   │   │   └── types.ts         # TypeScript interfaces
│   │   ├── routes/
│   │   │   ├── customerRoutes.ts
│   │   │   └── orderRoutes.ts
│   │   ├── utils/
│   │   │   └── db.ts            # Read/write db.json
│   │   └── index.ts             # Entry point Express
│   ├── db.json                  # Database file
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── index.ts         # API service layer
    │   ├── components/
    │   │   ├── CustomerForm.tsx
    │   │   ├── CustomerList.tsx
    │   │   ├── OrderForm.tsx
    │   │   └── OrderList.tsx
    │   ├── context/
    │   │   └── CRMContext.tsx   # Global state (Context API)
    │   ├── types/
    │   │   └── index.ts
    │   ├── App.tsx
    │   └── index.tsx
    ├── index.html               # Main HTML untuk Vite
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts           # Konfigurasi Vite
```

## Cara Menjalankan

### Backend

```bash
cd backend
npm install
npm run dev
# API berjalan di http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# UI berjalan di http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/health` | Health check |
| `POST` | `/customers` | Tambah customer baru |
| `GET` | `/customers` | Ambil semua customer |
| `POST` | `/orders` | Tambah order baru |
| `GET` | `/orders` | Ambil semua order |
| `GET` | `/orders?customer_id=xxx` | Ambil order milik customer tertentu |

### Contoh Request

**POST /customers**
```json
{
  "name": "Budi Santoso",
  "email": "budi@email.com",
  "phone": "08123456789"
}
```

**POST /orders**
```json
{
  "customer_id": "uuid-customer",
  "items": [
    { "name": "Nasi Goreng", "qty": 2, "price": 15000 },
    { "name": "Es Teh", "qty": 2, "price": 5000 }
  ],
  "total_price": 40000
}
```

## Fitur

- ✅ Tambah & lihat daftar customer
- ✅ Tambah & lihat daftar order
- ✅ Filter order per customer (klik customer di daftar)
- ✅ Statistik: total customer, order, pendapatan, pelanggan loyal
- ✅ Context API untuk state management global
- ✅ Validasi input di backend & frontend
- ✅ Error handling terpusat
- ✅ Styling dengan Bootstrap 5
