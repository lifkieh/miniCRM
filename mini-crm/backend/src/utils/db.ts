import fs from 'fs';
import path from 'path';
import { Database } from '../models/types';

const DB_PATH = path.join(__dirname, '../../db.json');

const defaultDB: Database = {
  customers: [],
  orders: [],
};

export function readDB(): Database {
  if (!fs.existsSync(DB_PATH)) {
    writeDB(defaultDB);
    return defaultDB;
  }
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw) as Database;
}

export function writeDB(data: Database): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
