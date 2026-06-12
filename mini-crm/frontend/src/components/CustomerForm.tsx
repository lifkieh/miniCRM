import React, { useState } from 'react';
import { addCustomer } from '../api';
import { useCRM } from '../context/CRMContext';

export default function CustomerForm() {
  const { dispatch } = useCRM();
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setError('Semua field wajib diisi');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const customer = await addCustomer(form);
      dispatch({ type: 'ADD_CUSTOMER', payload: customer });
      setForm({ name: '', email: '', phone: '' });
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
        <h5 className="mb-0">➕ Tambah Customer</h5>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger py-2">{error}</div>}
        {success && <div className="alert alert-success py-2">Customer berhasil ditambahkan!</div>}
        <div className="mb-3">
          <label className="form-label fw-semibold">Nama</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Contoh: Budi Santoso"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Contoh: budi@email.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Nomor HP</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            placeholder="Contoh: 08123456789"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <button
          className="btn btn-primary w-100"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : 'Simpan Customer'}
        </button>
      </div>
    </div>
  );
}
