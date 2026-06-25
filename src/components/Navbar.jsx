import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingCart, Heart, Menu, X } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { API_URL } from '../config';

export default function Navbar({ cartCount = 0, authToken }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  // Fetch admin status
  useEffect(() => {
    if (authToken) {
      fetch(`${API_URL}/api/user/`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
      .then(res => res.json())
      .then(data => setIsAdmin(data.is_staff || false))
      .catch(() => setIsAdmin(false));
    } else {
      setIsAdmin(false);
    }
  }, [authToken]);

  // Fetch all products for live search
  useEffect(() => {
    fetch(`${API_URL}/api/products/`)
      .then(res => res.json())
      .then(data => setAllProducts(data))
      .catch(err => console.error('Failed to fetch products for search', err));
  }, []);

  // Update suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(query) || 
        (p.category && p.category.toLowerCase().includes(query))
      ).slice(0, 5); // top 5 suggestions
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, allProducts]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const submitSearch = (query) => {
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    submitSearch(searchQuery);
  };

  const handleSuggestionClick = (product) => {
    submitSearch(product.name);
  };
  return (
    <header className="header-wrapper">
      <div className="container header-container">
        {/* Brand Logo */}
        <Link to="/" className="logo-link">
          <img src={logoImg} alt="Toys-brary" className="logo-img" />
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <nav className={`nav-wrapper ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-menu">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/categories" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/shop" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
            {isAdmin && (
              <li>
                <NavLink 
                  to="/admin/dashboard" 
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                  style={{ color: '#e74c3c', fontWeight: 'bold' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        {/* Search Bar */}
        <div className="search-bar-container" ref={searchContainerRef}>
          <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%', margin: 0 }}>
            <button type="submit" style={{ background: 'none', border: 'none', padding: 0 }} aria-label="Search">
              <Search size={18} className="search-icon" style={{ cursor: 'pointer', zIndex: 10 }} />
            </button>
            <input
              type="text"
              placeholder="Search Here"
              className="search-input"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => {
                if (searchQuery.trim().length > 0) setShowSuggestions(true);
              }}
            />
          </form>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions" style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              backgroundColor: 'white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              borderRadius: '12px',
              marginTop: '12px',
              zIndex: 1000,
              overflow: 'hidden',
              border: '1px solid var(--border-color)'
            }}>
              {suggestions.map(product => (
                <div 
                  key={product.id}
                  onClick={() => handleSuggestionClick(product)}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderBottom: '1px solid #f5f5f5',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF8F6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '6px', backgroundColor: '#F8F9FA' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-dark)' }}>{product.name}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-medium)' }}>in {product.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Header Actions */}
        <div className="header-actions">
          <Link to={authToken ? "/wishlist" : "/login"} className="action-btn" aria-label="Wishlist">
            <Heart size={22} />
          </Link>
          <Link to={authToken ? "/user" : "/login"} className="action-btn" aria-label="Profile">
            <User size={22} />
          </Link>
          
          <Link to="/cart" className="action-btn" aria-label="Cart">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="badge-count">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
