import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const deliverySpeed = location.state?.deliverySpeed || 'standard time';

  return (
    <div className="container animate-fade-in" style={{ padding: '80px 20px', textAlign: 'center', minHeight: '60vh' }}>
      <CheckCircle size={80} color="var(--primary-teal)" style={{ marginBottom: '24px' }} />
      <h1 style={{ color: 'var(--primary-coral)', marginBottom: '16px' }}>Order Confirmed!</h1>
      <p style={{ fontSize: '18px', color: 'var(--text-medium)', marginBottom: '32px' }}>
        Thank you for your purchase. Your order is confirmed and will be delivered in <strong>{deliverySpeed}</strong>.
      </p>
      <button className="btn btn-primary" onClick={() => navigate('/')} style={{ padding: '12px 32px' }}>
        Back to Home
      </button>
    </div>
  );
}
