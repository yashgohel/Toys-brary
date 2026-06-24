import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

export default function Cart({ cart, setCart, authToken }) {
  const navigate = useNavigate();

  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px', minHeight: '60vh' }}>
      <h2 style={{ color: 'var(--primary-coral)', marginBottom: '32px' }}>Your Cart</h2>
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <h3>Your cart is empty.</h3>
          <button className="btn btn-primary" onClick={() => navigate('/shop')} style={{ marginTop: '20px' }}>
            Go to Shop
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 60%' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', background: '#fff', padding: '20px', borderRadius: '16px', marginBottom: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                <div style={{ marginLeft: '20px', flexGrow: 1 }}>
                  <h4 style={{ margin: '0 0 8px 0' }}>{item.name}</h4>
                  <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--primary-coral)' }}>${Number(item.price).toFixed(2)}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button onClick={() => handleQuantity(item.id, -1)} style={{ padding: '4px 10px', background: '#f3f4f6', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantity(item.id, 1)} style={{ padding: '4px 10px', background: '#f3f4f6', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                  <button onClick={() => handleRemove(item.id)} style={{ marginLeft: '12px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ flex: '1 1 30%', background: '#fff', padding: '32px', borderRadius: '16px', height: 'fit-content', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <h3 style={{ margin: '0 0 24px 0' }}>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontWeight: 'bold', fontSize: '20px' }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '16px' }}
              onClick={() => navigate(authToken ? '/checkout' : '/login')}
            >
              Proceed to Address & Delivery
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
