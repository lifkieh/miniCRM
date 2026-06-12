## Tech Stack
Backend: Node.js, Express, TypeScript 
Frontend: React, TypeScript, Vite, Bootstrap 5 
Storage: File-based JSON (`db.json`)


## Struktur Project
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
    │   │   └── CRMContext.tsx   # Global state 
    │   ├── types/
    │   │   └── index.ts
    │   ├── App.tsx
    │   └── index.tsx
    ├── index.html               # Main HTML untuk Vite
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts           # Konfigurasi Vite


## Cara Menjalankan

### Backend

cd mini-crm
cd backend
npm install
npm run dev
# API berjalan di http://localhost:3001

### Frontend

cd mini-crm
cd frontend
npm install
npm run dev
# UI berjalan di http://localhost:3000


## Penjelasan

- jika mau lihat semua order satu customer, klik button [Tampilkan 2 order ->]
- 
