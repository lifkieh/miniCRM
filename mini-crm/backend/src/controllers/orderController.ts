import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readDB, writeDB } from '../utils/db';
import { createError } from '../middleware/errorHandler';
import { Order, OrderItem } from '../models/types';

export function getOrders(req: Request, res: Response, next: NextFunction): void {
  try {
    const { customer_id } = req.query;
    const db = readDB();

    if (customer_id) {
      // Validate customer exists
      const customer = db.customers.find((c) => c.id === customer_id);
      if (!customer) {
        return next(createError('Customer tidak ditemukan', 404));
      }
      const orders = db.orders.filter((o) => o.customer_id === customer_id);
      res.json({ success: true, data: orders, customer });
    } else {
      res.json({ success: true, data: db.orders });
    }
  } catch (err) {
    next(err);
  }
}

export function createOrder(req: Request, res: Response, next: NextFunction): void {
  try {
    const { customer_id, items, total_price } = req.body;

    // Validation
    if (!customer_id || typeof customer_id !== 'string') {
      return next(createError('Field "customer_id" wajib diisi', 400));
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return next(createError('Field "items" wajib diisi dan harus berupa array yang tidak kosong', 400));
    }
    for (const item of items as OrderItem[]) {
      if (!item.name || typeof item.name !== 'string') {
        return next(createError('Setiap item harus memiliki "name" berupa string', 400));
      }
      if (typeof item.qty !== 'number' || item.qty <= 0) {
        return next(createError('Setiap item harus memiliki "qty" berupa angka positif', 400));
      }
      if (typeof item.price !== 'number' || item.price < 0) {
        return next(createError('Setiap item harus memiliki "price" berupa angka non-negatif', 400));
      }
    }
    if (typeof total_price !== 'number' || total_price < 0) {
      return next(createError('Field "total_price" wajib diisi dan harus berupa angka non-negatif', 400));
    }

    const db = readDB();

    // Check customer exists
    const customer = db.customers.find((c) => c.id === customer_id);
    if (!customer) {
      return next(createError('Customer tidak ditemukan', 404));
    }

    const order: Order = {
      id: uuidv4(),
      customer_id,
      items,
      total_price,
      createdAt: new Date().toISOString(),
    };

    db.orders.push(order);
    writeDB(db);

    res.status(201).json({ success: true, data: order, message: 'Order berhasil ditambahkan' });
  } catch (err) {
    next(err);
  }
}
