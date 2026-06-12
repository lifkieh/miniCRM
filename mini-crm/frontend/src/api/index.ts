import { Customer, Order, OrderItem, ApiResponse } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// ─── Customers ────────────────────────────────────────────────────────────────

export async function fetchCustomers(): Promise<Customer[]> {
  const res = await fetch(`${BASE_URL}/customers`);
  const json: ApiResponse<Customer[]> = await res.json();
  if (!json.success) throw new Error(json.message || 'Gagal mengambil data customer');
  return json.data;
}

export async function addCustomer(payload: {
  name: string;
  email: string;
  phone: string;
}): Promise<Customer> {
  const res = await fetch(`${BASE_URL}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json: ApiResponse<Customer> = await res.json();
  if (!json.success) throw new Error(json.message || 'Gagal menambahkan customer');
  return json.data;
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export async function fetchOrders(customer_id?: string): Promise<Order[]> {
  const url = customer_id
    ? `${BASE_URL}/orders?customer_id=${customer_id}`
    : `${BASE_URL}/orders`;
  const res = await fetch(url);
  const json: ApiResponse<Order[]> = await res.json();
  if (!json.success) throw new Error(json.message || 'Gagal mengambil data order');
  return json.data;
}

export async function addOrder(payload: {
  customer_id: string;
  items: OrderItem[];
  total_price: number;
}): Promise<Order> {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json: ApiResponse<Order> = await res.json();
  if (!json.success) throw new Error(json.message || 'Gagal menambahkan order');
  return json.data;
}
