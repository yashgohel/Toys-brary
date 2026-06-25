import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

export default function AdminDashboard({ authToken }) {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    ageGroup: '',
    description: '',
    image_file: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/admin/login');
      return;
    }
    // Verify admin status
    fetch(`${API_URL}/api/user/`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    })
    .then(res => res.json())
    .then(data => {
      if (!data.is_staff) navigate('/');
    })
    .catch(() => navigate('/'));

    fetchProducts();
  }, [authToken]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products/`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`${API_URL}/api/products/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category || '',
      ageGroup: product.ageGroup || '',
      description: product.description || '',
      image_file: null // cannot pre-fill file input
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('ageGroup', formData.ageGroup);
    data.append('description', formData.description);
    
    if (formData.image_file) {
      data.append('image_file', formData.image_file);
    }

    const url = editingId ? `${API_URL}/api/products/${editingId}/` : `${API_URL}/api/products/`;
    const method = editingId ? 'PATCH' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: data
      });
      if (res.ok) {
        setShowForm(false);
        setEditingId(null);
        setFormData({ name: '', price: '', category: '', ageGroup: '', description: '', image_file: null });
        fetchProducts();
      } else {
        alert("Failed to save product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#2c3e50' }}>Admin Dashboard</h2>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setEditingId(null);
            setFormData({ name: '', price: '', category: '', ageGroup: '', description: '', image_file: null });
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancel' : 'Add New Product'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #ddd' }}>
          <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
            <input type="text" placeholder="Product Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={inputStyle} />
            <input type="number" step="0.01" placeholder="Price" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={inputStyle} />
            <input type="text" placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={inputStyle} />
            <input type="text" placeholder="Age Group (e.g. 3-5 Years)" value={formData.ageGroup} onChange={e => setFormData({...formData, ageGroup: e.target.value})} style={inputStyle} />
            <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{...inputStyle, minHeight: '80px'}} />
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Product Image:</label>
              <input type="file" accept="image/*" onChange={e => setFormData({...formData, image_file: e.target.files[0]})} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Save Product</button>
          </form>
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <thead>
            <tr style={{ background: '#2c3e50', color: 'white', textAlign: 'left' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Image</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={tdStyle}>{p.id}</td>
                <td style={tdStyle}>
                  <img src={p.image} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                </td>
                <td style={tdStyle}>{p.name}</td>
                <td style={tdStyle}>₹{p.price}</td>
                <td style={tdStyle}>{p.category}</td>
                <td style={tdStyle}>
                  <button onClick={() => handleEdit(p)} style={editBtnStyle}>Edit</button>
                  <button onClick={() => handleDelete(p.id)} style={deleteBtnStyle}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', maxWidth: '400px' };
const thStyle = { padding: '12px 15px' };
const tdStyle = { padding: '12px 15px', verticalAlign: 'middle' };
const editBtnStyle = { background: '#f39c12', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' };
const deleteBtnStyle = { background: '#e74c3c', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' };
