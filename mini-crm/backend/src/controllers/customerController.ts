import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readDB, writeDB } from '../utils/db';
import { createError } from '../middleware/errorHandler';
import { Customer } from '../models/types';

export function getAllCustomers(req: Request, res: Response, next: NextFunction): void {
  try {
    const db = readDB();
    res.json({ success: true, data: db.customers });
  } catch (err) {
    next(err);
  }
}

export function createCustomer(req: Request, res: Response, next: NextFunction): void {
  try {
    const { name, email, phone } = req.body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return next(createError('Field "name" wajib diisi dan harus berupa string', 400));
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return next(createError('Field "email" wajib diisi dan harus berupa email yang valid', 400));
    }
    if (!phone || typeof phone !== 'string' || !/^[0-9+\-() ]{7,20}$/.test(phone)) {
      return next(createError('Field "phone" wajib diisi dan harus berupa nomor telepon yang valid', 400));
    }

    const db = readDB();

    // Check duplicate email
    const exists = db.customers.find((c) => c.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return next(createError('Email sudah terdaftar', 409));
    }

    const customer: Customer = {
      id: uuidv4(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      createdAt: new Date().toISOString(),
    };

    db.customers.push(customer);
    writeDB(db);

    res.status(201).json({ success: true, data: customer, message: 'Customer berhasil ditambahkan' });
  } catch (err) {
    next(err);
  }
}
