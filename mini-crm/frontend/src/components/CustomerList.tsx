
import { useCRM } from '../context/CRMContext';

export default function CustomerList() {
  const { customers, orders, selectedCustomerId, dispatch, loading } = useCRM();

  const getOrderCount = (customerId: string) =>
    orders.filter(o => o.customer_id === customerId).length;

  const getTotalSpend = (customerId: string) =>
    orders.filter(o => o.customer_id === customerId).reduce((s, o) => s + o.total_price, 0);

  if (loading) return <div className="card card-body text-center text-muted">Memuat data...</div>;

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">👥 Daftar Customer</h5>
        <span className="badge bg-primary">{customers.length} customer</span>
      </div>
      <div className="card-body p-0">
        {customers.length === 0 ? (
          <div className="p-4 text-center text-muted">Belum ada customer. Tambahkan customer baru!</div>
        ) : (
          <div className="list-group list-group-flush">
            {customers.map(c => (
              <div
                key={c.id}
                className={`list-group-item d-flex justify-content-between align-items-start ${selectedCustomerId === c.id ? 'bg-light' : ''}`}
              >
                <div>
                  <div className="fw-semibold text-dark">{c.name}</div>
                  <small className="text-muted">
                    {c.email} · {c.phone}
                  </small>
                </div>
                <div className="text-end">
                  <button
                    onClick={() => dispatch({ type: 'SELECT_CUSTOMER', payload: selectedCustomerId === c.id ? null : c.id })}
                    className={`btn btn-sm ${selectedCustomerId === c.id ? 'btn-primary' : 'btn-outline-secondary'} rounded-pill py-0 px-2 mb-1 fw-bold`}
                    style={{ fontSize: '0.75rem' }}
                  >
                    Tampilkan {getOrderCount(c.id)} order &rarr;
                  </button>
                  <br />
                  <small className="text-muted fw-semibold">
                    Rp {getTotalSpend(c.id).toLocaleString('id-ID')}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
