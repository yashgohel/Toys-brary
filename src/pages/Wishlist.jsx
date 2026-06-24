import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { API_URL } from '../config';

export default function Wishlist({ authToken, onAddToCart }) {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await fetch(`${API_URL}/api/wishlist/`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setWishlistProducts(data);
        } else {
          setError('Failed to fetch wishlist.');
        }
      } catch (err) {
        setError('Network error. Failed to fetch wishlist.');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [authToken, navigate]);

  const handleRemove = async (productId) => {
    try {
      const res = await fetch(`${API_URL}/api/wishlist/toggle/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ product_id: productId })
      });
      if (res.ok) {
        setWishlistProducts(prev => prev.filter(p => p.id !== productId));
      }
    } catch (err) {
      console.error('Failed to remove from wishlist', err);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '60px' }}>Loading wishlist...</div>;

  return (
    <div className="container animate-fade-in" style={{ padding: '60px 20px', minHeight: '60vh' }}>
      <h2 style={{ color: 'var(--primary-coral)', marginBottom: '32px' }}>My Wishlist</h2>
      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

      {wishlistProducts.length === 0 && !error ? (
        <div style={{ textAlign: 'center', padding: '60px 0', background: '#fff', borderRadius: '16px' }}>
          <Heart size={48} color="#ccc" style={{ marginBottom: '16px' }} />
          <h3>Your wishlist is empty.</h3>
          <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>Add items you love to your wishlist to review them later.</p>
          <Link to="/shop" className="btn btn-primary">
            Explore Toys
          </Link>
        </div>
      ) : (
        <div className="shop-grid">
          {wishlistProducts.map(product => (
            <div key={product.id} className="product-card">
              <button 
                className="wishlist-btn active"
                onClick={() => handleRemove(product.id)}
                aria-label="Remove from Wishlist"
              >
                <Heart size={16} fill="currentColor" />
              </button>

              <div className="product-img-container" onClick={() => navigate('/shop')} style={{ cursor: 'pointer' }}>
                <img src={product.image} alt={product.name} className="product-img" />
              </div>

              <div className="product-info">
                <h3 className="product-title" title={product.name}>{product.name}</h3>

                <div className="product-rating">
                  <div className="rating-stars">
                    {[...Array(Math.round(product.rating || 5))].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                    <span className="rating-count">({product.reviews || 0})</span>
                  </div>
                </div>

                <span className="product-price">${Number(product.price).toFixed(2)}</span>

                <button 
                  onClick={() => onAddToCart(product)}
                  className="add-cart-btn"
                >
                  <ShoppingCart size={14} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
