import React, { useState } from 'react';
import { addOrder } from '../api';
import { useCRM } from '../context/CRMContext';
import { OrderItem } from '../types';

export default function OrderForm() {
  const { customers, dispatch } = useCRM();
  const [customerId, setCustomerId] = useState('');
  const [items, setItems] = useState<OrderItem[]>([{ name: '', qty: 1, price: 0 }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  const updateItem = (index: number, field: keyof OrderItem, value: string | number) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
    setError(null);
  };

  const addItem = () => setItems([...items, { name: '', qty: 1, price: 0 }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId) { setError('Pilih customer terlebih dahulu'); return; }
    if (items.some(i => !i.name || i.qty <= 0 || i.price < 0)) {
      setError('Pastikan semua item terisi dengan benar'); return;
    }
    setLoading(true);
    setError(null);
    try {
      const order = await addOrder({ customer_id: customerId, items, total_price: totalPrice });
      dispatch({ type: 'ADD_ORDER', payload: order });
      setCustomerId('');
      setItems([{ name: '', qty: 1, price: 0 }]);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">🛒 Tambah Order</h5>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger py-2">{error}</div>}
        {success && <div className="alert alert-success py-2">Order berhasil ditambahkan!</div>}

        <div className="mb-3">
          <label className="form-label fw-semibold">Pilih Customer</label>
          <select
            className="form-select"
            value={customerId}
            onChange={e => { setCustomerId(e.target.value); setError(null); setSuccess(false); }}
          >
            <option value="">-- Pilih Customer --</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
            ))}
          </select>
        </div>

        <label className="form-label fw-semibold mb-1">Item Pesanan</label>
        <div className="border rounded p-2 mb-3 bg-light">
          <div className="row g-1 mb-2 text-muted fw-semibold" style={{ fontSize: '0.75rem' }}>
            <div className="col-4">nama menu</div>
            <div className="col-2 text-center">banyaknya</div>
            <div className="col-3 text-end">harga</div>
            <div className="col-2 text-end">jumlah</div>
            <div className="col-1"></div>
          </div>
          {items.map((item, i) => (
            <div key={i} className="row g-1 mb-2 align-items-center">
              <div className="col-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="nama menu"
                  value={item.name}
                  onChange={e => updateItem(i, 'name', e.target.value)}
                />
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control form-control-sm text-center px-1"
                  placeholder="1"
                  min={1}
                  value={item.qty}
                  onChange={e => updateItem(i, 'qty', parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="col-3">
                <input
                  type="number"
                  className="form-control form-control-sm text-end px-1"
                  placeholder="0"
                  min={0}
                  value={item.price}
                  onChange={e => updateItem(i, 'price', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="col-2">
                <input
                  type="text"
                  className="form-control form-control-sm text-end px-1 bg-white text-dark"
                  value={(item.qty * item.price).toLocaleString('id-ID')}
                  readOnly
                />
              </div>
              <div className="col-1 text-end">
                {items.length > 1 && (
                  <button className="btn btn-sm btn-outline-danger p-0" style={{ width: '20px', height: '20px', lineHeight: '1' }} onClick={() => removeItem(i)}>✕</button>
                )}
              </div>
            </div>
          ))}
          <button className="btn btn-sm btn-outline-secondary mt-1 w-100" onClick={addItem}>
            + Tambah Item
          </button>
        </div>

        <div className="alert alert-light py-2 mb-3">
          <strong>Total: </strong>Rp {totalPrice.toLocaleString('id-ID')}
        </div>

        <button className="btn btn-success w-100" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan Order'}
        </button>
      </div>
    </div>
  );
}
