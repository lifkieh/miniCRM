
import { CRMProvider, useCRM } from './context/CRMContext';
import CustomerForm from './components/CustomerForm';
import OrderForm from './components/OrderForm';
import CustomerList from './components/CustomerList';
import OrderList from './components/OrderList';

function Dashboard() {
  const { customers, orders, selectedCustomerId, dispatch, refreshAll } = useCRM();

  const totalRevenue = orders.reduce((s, o) => s + o.total_price, 0);
  const loyalCustomers = customers.filter(
    c => orders.filter(o => o.customer_id === c.id).length > 3
  ).length;

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary mb-4">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">MiniCRM</span>
          <div className="d-flex align-items-center gap-2">
            {selectedCustomerId && (
              <button className="btn btn-sm btn-outline-light" onClick={() => dispatch({ type: 'SELECT_CUSTOMER', payload: null })}>
                Lihat Semua Order
              </button>
            )}
            <button className="btn btn-sm btn-outline-light" onClick={refreshAll}>🔄 Refresh</button>
          </div>
        </div>
      </nav>

      <div className="container-fluid px-4">
        {/* Stats */}
        <div className="row g-3 mb-4">
          {[
            { label: 'Total Customer', value: customers.length, icon: '👥', color: 'primary' },
            { label: 'Total Order', value: orders.length, icon: '🛒', color: 'success' },
            { label: 'Total Pendapatan', value: `Rp ${totalRevenue.toLocaleString('id-ID')}`, icon: '$', color: 'warning' },
            { label: 'Pelanggan Loyal', value: loyalCustomers, icon: '⭐', color: 'danger' },
          ].map((stat, i) => (
            <div key={i} className="col-6 col-md-3">
              <div className={`card border-${stat.color} border-2`}>
                <div className="card-body py-3">
                  <div className="fs-4">{stat.icon}</div>
                  <div className={`fw-bold fs-5 text-${stat.color}`}>{stat.value}</div>
                  <small className="text-muted">{stat.label}</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="row g-4">
          <div className="col-md-4">
            <div className="d-flex flex-column gap-4">
              <CustomerForm />
              <OrderForm />
            </div>
          </div>
          <div className="col-md-4">
            <CustomerList />
          </div>
          <div className="col-md-4">
            <OrderList />
          </div>
        </div>

        <footer className="text-center text-muted py-4 mt-4 border-top">
          <small>MiniCRM · Dibuat dengan React + TypeScript + Node.js</small>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CRMProvider>
      <Dashboard />
    </CRMProvider>
  );
}
