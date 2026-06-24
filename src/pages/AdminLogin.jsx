import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

export default function AdminLogin({ setAuthToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        setAuthToken(data.access);
        
        // Fetch user profile to check if admin
        const profileRes = await fetch(`${API_URL}/api/user/`, {
          headers: {
            'Authorization': `Bearer ${data.access}`
          }
        });
        const profileData = await profileRes.json();
        
        if (profileData.is_staff) {
          navigate('/admin/dashboard');
        } else {
          // If not an admin, logout and show error
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setAuthToken(null);
          setError('Access denied. You do not have administrator privileges.');
        }
      } else {
        setError(data.detail || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '60px 20px', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ background: '#2c3e50', color: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
        <h2 style={{ color: '#ecf0f1', marginBottom: '24px', textAlign: 'center' }}>Admin Access</h2>
        {error && <div style={{ color: '#e74c3c', marginBottom: '16px', textAlign: 'center', background: 'rgba(231,76,60,0.1)', padding: '10px', borderRadius: '8px' }}>{error}</div>}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#bdc3c7' }}>Admin Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: '#34495e', color: 'white' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#bdc3c7' }}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: '#34495e', color: 'white' }}
            />
          </div>
          <button type="submit" style={{ marginTop: '8px', width: '100%', padding: '12px', background: '#3498db', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            Secure Login
          </button>
        </form>
      </div>
    </div>
  );
}
