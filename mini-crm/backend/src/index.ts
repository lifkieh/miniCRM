import express from 'express';
import cors from 'cors';
import customerRoutes from './routes/customerRoutes';
import orderRoutes from './routes/orderRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Mini CRM API is running' });
});

// Welcome message for root
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Backend Mini CRM berjalan dengan baik!',
    hint: 'Akses UI Frontend di http://localhost:3000'
  });
});

// Ignore favicon request
app.get('/favicon.ico', (_req, res) => res.status(204).end());

// Routes
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
});

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Mini CRM API berjalan di http://localhost:${PORT}`);
});

export default app;
