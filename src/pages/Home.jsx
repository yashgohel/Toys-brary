import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Shield, Award, Smile, Heart, Star,
  ShoppingCart, Truck, CreditCard, RefreshCw, Headphones
} from 'lucide-react';
import { categories } from '../data/products';
import bearImg from '../assets/bear.PNG';
import { API_URL } from '../config';

export default function Home({ onAddToCart, authToken }) {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/products/`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (authToken) {
      fetch(`${API_URL}/api/wishlist/`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
        .then(res => res.json())
        .then(data => {
          const wishlistObj = {};
          data.forEach(item => {
            wishlistObj[item.id] = true;
          });
          setWishlist(wishlistObj);
        })
        .catch(err => console.error(err));
    } else {
      setWishlist({});
    }
  }, [authToken]);

  const topSellingRegular = products.slice(0, 6);
  const topSellingWide = products.slice(6, 10);

  const toggleWishlist = async (id) => {
    if (!authToken) {
      navigate('/login');
      return;
    }

    // Optimistic UI update
    setWishlist(prev => ({
      ...prev,
      [id]: !prev[id]
    }));

    try {
      await fetch(`${API_URL}/api/wishlist/toggle/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ product_id: id })
      });
    } catch (err) {
      console.error('Failed to toggle wishlist', err);
      // Revert on failure
      setWishlist(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    }
  };

  const handleCategoryClick = (catName) => {
    navigate(`/shop?category=${encodeURIComponent(catName)}`);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="hero-wrapper">
        <div className="container hero-container">
          {/* Content Left */}
          <div className="hero-content">
            <h1 className="hero-title">
              Fun Toys for
              <span>Every Child</span>
            </h1>
            <p className="hero-description">
              Discover toys that inspire creativity, learning and endless fun! We curate and build items designed to match every milestone.
            </p>

            <div style={{ marginBottom: '40px' }}>
              <Link to="/shop" className="btn-hero-shop">
                Shop Now
                <span className="arrow-circle">
                  <ArrowRight size={20} />
                </span>
              </Link>
            </div>
          </div>

          {/* Graphic Right */}
          <div className="hero-graphic-area">
            <div className="hero-circle-bg"></div>
            {/* Collage image that fits the figma collage theme */}
            <img
              src={bearImg}
              alt="Toys collection collage"
              className="hero-image"
            />
          </div>

          {/* Feature Badges list matching Figma icons */}
          <div className="hero-features-list">
            <div className="hero-feature-item">
              <div className="feature-icon-wrapper">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="feature-title">Safe Materials</h4>
              </div>
            </div>
            <div className="hero-feature-item">
              <div className="feature-icon-wrapper">
                <Award size={20} />
              </div>
              <div>
                <h4 className="feature-title">Quality Assured</h4>
              </div>
            </div>
            <div className="hero-feature-item">
              <div className="feature-icon-wrapper">
                <Smile size={20} />
              </div>
              <div>
                <h4 className="feature-title">For All Ages</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="section" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Shop by Category</h2>
          </div>

          <div className="categories-grid">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="category-card"
                onClick={() => handleCategoryClick(cat.name)}
                style={{ cursor: 'pointer' }}
              >
                <div className="category-img-container">
                  <img src={cat.image} alt={cat.name} className="category-img" />
                </div>
                <h3 className="category-name">{cat.name}</h3>
                <span className="category-desc">{cat.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Selling Toys - Grid 1 */}
      <section className="section" style={{ backgroundColor: 'white', paddingTop: 0 }}>
        <div className="container">
          <div className="product-section-header">
            <div className="product-section-title-wrapper">
              <h2 className="section-title" style={{ fontSize: '28px' }}>Top Selling Toys</h2>
            </div>
            <Link to="/shop" className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '14px' }}>
              View All
            </Link>
          </div>

          <div className="products-grid">
            {loading ? <div style={{ padding: '20px' }}>Loading...</div> : topSellingRegular.map((product) => (
              <div key={product.id} className="product-card">
                {/* Wishlist toggle */}
                <button
                  className={`wishlist-btn ${wishlist[product.id] ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Add to Wishlist"
                >
                  <Heart size={16} fill={wishlist[product.id] ? "currentColor" : "none"} />
                </button>

                <div className="product-img-container">
                  <img src={product.image} alt={product.name} className="product-img" />
                </div>

                <div className="product-info">
                  <h3 className="product-title" title={product.name}>{product.name}</h3>

                  {/* Star rating */}
                  <div className="product-rating">
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" style={{ color: i < (product.rating || 5) ? 'var(--star-color)' : '#E5E7EB' }} />
                      ))}
                      <span className="rating-count">({product.reviewsCount || 85})</span>
                    </div>
                  </div>

                  <span className="product-price">₹{Number(product.price).toFixed(2)}</span>

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
        </div>
      </section>

      {/* Top Selling Toys - Grid 2 (Wide Cards) */}
      <section className="section" style={{ backgroundColor: 'white', paddingTop: 0 }}>
        <div className="container">
          <div className="product-section-header">
            <div className="product-section-title-wrapper">
              <h2 className="section-title" style={{ fontSize: '28px' }}>Top Selling Toys</h2>
            </div>
            <Link to="/shop" className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '14px' }}>
              View All
            </Link>
          </div>

          <div className="products-wide-grid">
            {loading ? <div style={{ padding: '20px' }}>Loading...</div> : topSellingWide.map((product) => (
              <div key={product.id} className="product-wide-card">
                {/* Wishlist toggle */}
                <button
                  className={`wishlist-btn ${wishlist[product.id] ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Add to Wishlist"
                  style={{ top: '16px', right: '16px' }}
                >
                  <Heart size={16} fill={wishlist[product.id] ? "currentColor" : "none"} />
                </button>

                <div className="product-wide-img-container" onClick={() => navigate('/shop')} style={{ cursor: 'pointer' }}>
                  <img src={product.image} alt={product.name} className="product-wide-img" />
                </div>

                <h3 className="product-wide-title">{product.name}</h3>
                <span className="product-wide-price">₹{Number(product.price).toFixed(2)}</span>

                <button
                  onClick={() => onAddToCart(product)}
                  className="add-cart-btn"
                  style={{ marginTop: '16px', maxWidth: '160px' }}
                >
                  <ShoppingCart size={14} /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust elements (features bar) */}
      <section className="section" style={{ backgroundColor: 'white', paddingTop: 0 }}>
        <div className="container">
          <div className="trust-bar">
            <div className="trust-item">
              <div className="trust-icon-container">
                <Truck size={24} />
              </div>
              <div className="trust-content">
                <h4 className="trust-title">Free Delivery</h4>
                <span className="trust-desc">On Orders Over ₹499</span>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon-container">
                <CreditCard size={24} />
              </div>
              <div className="trust-content">
                <h4 className="trust-title">Secure Payment</h4>
                <span className="trust-desc">100% secure checkout</span>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon-container">
                <RefreshCw size={22} />
              </div>
              <div className="trust-content">
                <h4 className="trust-title">Easy Returns</h4>
                <span className="trust-desc">30-day return policy</span>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon-container">
                <Headphones size={24} />
              </div>
              <div className="trust-content">
                <h4 className="trust-title">24/7 Support</h4>
                <span className="trust-desc">We're here to help</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="section" style={{ backgroundColor: 'white', paddingTop: 0 }}>
        <div className="container">
          <div className="offer-banner">
            <div className="offer-content-left">
              <img
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=300&q=80"
                alt="Gift Box"
                className="offer-gift-img"
              />
            </div>
            <div className="offer-info">
              <h2 className="offer-title">Special Offer!</h2>
              <p className="offer-desc">Get up to 20% OFF on selected toys</p>
              <div style={{ marginTop: '8px', display: 'contents' }}>
                <Link to="/shop" className="btn btn-primary" style={{ padding: '10px 24px' }}>
                  Shop Now
                </Link>
              </div>
            </div>

            <div className="offer-badge">
              <span>UP TO</span>
              <strong>20%</strong>
              <span>OFF</span>
            </div>
          </div>
        </div>
      </section >

      {/* Testimonials (What Parents Say) */}
      < section className="section" style={{ backgroundColor: 'white', paddingTop: 0, paddingBottom: '100px' }
      }>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">What Parents Say</h2>
          </div>

          <div className="testimonials-grid">
            {[1, 2, 3].map((id) => (
              <div key={id} className="testimonial-card">
                <div className="testimonial-user-row">
                  <div className="user-avatar-placeholder"></div>
                  <div className="user-review-info">
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '700', marginTop: '4px' }}>Sarah J.</span>
                  </div>
                </div>
                <p className="testimonial-quote">
                  "Amazing quality toys! My kids love playing with them every day, and they have proved incredibly durable."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section >
    </div >
  );
}
