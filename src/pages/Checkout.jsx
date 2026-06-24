import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

export default function Checkout({ cart, setCart, authToken }) {
  const [address, setAddress] = useState('');
  const [deliverySpeed, setDeliverySpeed] = useState('24 hrs');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authToken) {
      navigate('/login');
      return;
    }
    
    if (cart.length === 0) {
      setError('Cart is empty!');
      return;
    }

    try {
      const orderData = {
        address,
        delivery_speed: deliverySpeed,
        total_amount: total.toFixed(2),
        items: cart.map(item => ({
          product: item.id,
          product_name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      };

      const res = await fetch(`${API_URL}/api/order/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        setCart([]); // Clear cart
        navigate('/confirmation', { state: { deliverySpeed } });
      } else {
        setError('Failed to submit order. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '60px 20px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h2 style={{ color: 'var(--primary-coral)', marginBottom: '24px' }}>Address & Delivery</h2>
        {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Delivery Address</label>
            <textarea 
              required
              rows="4"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full address..."
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'inherit' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Delivery Speed</label>
            <select 
              value={deliverySpeed} 
              onChange={(e) => setDeliverySpeed(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff' }}
            >
              <option value="24 hrs">24 hours (Next Day)</option>
              <option value="48 hrs">48 hours</option>
              <option value="5 days">5 days (Standard)</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Payment Method</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: '#f9fafb', color: 'var(--text-medium)' }}>
              <input type="radio" checked readOnly style={{ accentColor: 'var(--primary-coral)' }} />
              <span>Cash on Delivery (COD)</span>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', marginTop: '10px' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Total: ${total.toFixed(2)}</h3>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
