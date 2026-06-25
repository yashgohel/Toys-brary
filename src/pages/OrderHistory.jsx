import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Calendar, Truck, CheckCircle } from 'lucide-react';
import { API_URL } from '../config';

export default function OrderHistory({ authToken }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/api/orders/`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          setError('Failed to fetch orders.');
        }
      } catch (err) {
        setError('Network error. Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authToken, navigate]);

  if (loading) return <div style={{ textAlign: 'center', padding: '60px' }}>Loading orders...</div>;

  return (
    <div className="container animate-fade-in" style={{ padding: '60px 20px', minHeight: '60vh', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: 'var(--primary-coral)', marginBottom: '32px' }}>Order History</h2>
      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

      {orders.length === 0 && !error ? (
        <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '16px' }}>
          <Package size={48} color="#ccc" style={{ marginBottom: '16px' }} />
          <h3>No past orders found.</h3>
          <button className="btn btn-primary" onClick={() => navigate('/shop')} style={{ marginTop: '20px' }}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {orders.map(order => (
            <div key={order.id} style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-light)', marginBottom: '4px' }}>
                    <Calendar size={16} />
                    <span>{new Date(order.created_at).toLocaleDateString()}</span>
                  </div>
                  <strong>Order #{order.id}</strong>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'var(--primary-coral)' }}>
                    ₹{Number(order.total_amount).toFixed(2)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', color: 'var(--text-light)', fontSize: '14px', marginTop: '4px' }}>
                    <Truck size={14} />
                    <span>{order.delivery_speed}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: '12px' }}>Items:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', background: '#f9fafb', padding: '12px 16px', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle size={16} color="var(--primary-coral)" />
                        <span>{item.quantity} x {item.product_name}</span>
                      </div>
                      <strong>₹{Number(item.price).toFixed(2)}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
