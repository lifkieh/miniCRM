
import { useCRM } from '../context/CRMContext';

export default function OrderList() {
  const { orders, customers, selectedCustomerId } = useCRM();

  const filteredOrders = selectedCustomerId
    ? orders.filter(o => o.customer_id === selectedCustomerId)
    : orders;

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  const getCustomerName = (id: string) =>
    customers.find(c => c.id === id)?.name || 'Unknown';

  const expandAll = () => {
    const buttons = document.querySelectorAll('#ordersAccordion .accordion-button.collapsed');
    buttons.forEach((btn: any) => btn.click());
  };

  const collapseAll = () => {
    const buttons = document.querySelectorAll('#ordersAccordion .accordion-button:not(.collapsed)');
    buttons.forEach((btn: any) => btn.click());
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          📋 {selectedCustomer ? `Order milik ${selectedCustomer.name}` : 'Semua Order'}
        </h5>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success">{filteredOrders.length} order</span>
          {filteredOrders.length > 0 && (
            <div className="btn-group">
              <button className="btn btn-sm btn-outline-secondary py-0 px-2" onClick={expandAll} title="Buka Semua">
                &#9660;
              </button>
              <button className="btn btn-sm btn-outline-secondary py-0 px-2" onClick={collapseAll} title="Tutup Semua">
                &#9650;
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="card-body p-0">
        {filteredOrders.length === 0 ? (
          <div className="p-4 text-center text-muted">
            {selectedCustomerId ? 'Customer ini belum memiliki order.' : 'Belum ada order. Tambahkan order baru!'}
          </div>
        ) : (
          <div className="accordion accordion-flush" id="ordersAccordion">
            {filteredOrders.map((order, i) => (
              <div key={order.id} className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed py-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#order-${i}`}
                  >
                    <div className="d-flex justify-content-between w-100 me-3">
                      <span>
                        <strong>{getCustomerName(order.customer_id)}</strong>
                        {' · '}
                        <small className="text-muted">{order.items.length} item</small>
                      </span>
                      <span className="text-success fw-semibold">
                        Rp {order.total_price.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </button>
                </h2>
                <div id={`order-${i}`} className="accordion-collapse collapse">
                  <div className="accordion-body py-2">
                    <small className="text-muted">
                      {new Date(order.createdAt).toLocaleString('id-ID')}
                    </small>
                    <table className="table table-sm mt-2 mb-0">
                      <thead>
                        <tr>
                          <th>nama menu</th>
                          <th className="text-center">banyaknya</th>
                          <th className="text-end">harga</th>
                          <th className="text-end">jumlah</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, j) => (
                          <tr key={j}>
                            <td>{item.name}</td>
                            <td className="text-center">{item.qty}</td>
                            <td className="text-end">Rp {item.price.toLocaleString('id-ID')}</td>
                            <td className="text-end">Rp {(item.qty * item.price).toLocaleString('id-ID')}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={3} className="text-end fw-bold">Total</td>
                          <td className="text-end fw-bold text-success">
                            Rp {order.total_price.toLocaleString('id-ID')}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
