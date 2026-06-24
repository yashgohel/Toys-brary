import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

export default function User({ authToken, setAuthToken }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/api/user/`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setAuthToken(null);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          navigate('/login');
        }
      } catch (err) {
        setError('You are not logged in. Please login to view your profile.');
        navigate('/login');
      }
    };

    fetchUser();
  }, [authToken, navigate, setAuthToken]);

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  if (error) return <div style={{ textAlign: 'center', padding: '40px' }}>{error}</div>;
  if (!user) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading profile...</div>;

  return (
    <div className="container animate-fade-in" style={{ padding: '60px 20px', maxWidth: '600px', margin: '0 auto', minHeight: '60vh' }}>
      <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ color: 'var(--primary-coral)', margin: 0 }}>My Profile</h2>
          <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '16px' }}>
          <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
            <span style={{ color: 'var(--text-light)', display: 'block', fontSize: '14px', marginBottom: '4px' }}>Name</span>
            <strong>{user.first_name} {user.last_name}</strong>
          </div>
          <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
            <span style={{ color: 'var(--text-light)', display: 'block', fontSize: '14px', marginBottom: '4px' }}>Email</span>
            <strong>{user.email}</strong>
          </div>
          <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
            <span style={{ color: 'var(--text-light)', display: 'block', fontSize: '14px', marginBottom: '4px' }}>Address</span>
            <strong>{user.address || 'No address saved yet. Make an order to save your address.'}</strong>
          </div>
        </div>

        <div style={{ marginTop: '32px' }}>
          <button onClick={() => navigate('/orders')} className="btn btn-primary" style={{ width: '100%' }}>
            View Order History
          </button>
        </div>
      </div>
    </div>
  );
}
