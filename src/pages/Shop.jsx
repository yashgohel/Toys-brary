import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingCart, SlidersHorizontal, Search } from 'lucide-react';
import { categories } from '../data/products';
import { API_URL } from '../config';

export default function Shop({ onAddToCart, authToken }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // States
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAge, setSelectedAge] = useState('All');
  const [priceRange, setPriceRange] = useState(40);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [wishlist, setWishlist] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    fetch(`${API_URL}/api/products/`)
      .then(res => res.json())
      .then(data => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products', err);
        setLoading(false);
      });
  }, []);

  // Fetch wishlist
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

  // Sync state with URL search parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }

    const ageParam = searchParams.get('age');
    if (ageParam) {
      // Map short URL parameters to display text
      const ageMap = {
        'baby': '0-2 Years',
        'toddler': '3-5 Years',
        'kid': '6-8 Years',
        'preteen': '9-12 Years',
        'teen': '13+ Years'
      };
      setSelectedAge(ageMap[ageParam] || ageParam);
    } else {
      setSelectedAge('All');
    }

    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery('');
    }
  }, [searchParams]);

  const toggleWishlist = async (id) => {
    if (!authToken) {
      navigate('/login');
      return;
    }

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
      setWishlist(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Update Search Params
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    setSearchParams(params);
  };

  const handleAgeSelect = (ageGroup) => {
    setSelectedAge(ageGroup);
    const params = new URLSearchParams(searchParams);
    if (ageGroup === 'All') {
      params.delete('age');
    } else {
      // Map display text back to short param
      const ageReverseMap = {
        '0-2 Years': 'baby',
        '3-5 Years': 'toddler',
        '6-8 Years': 'kid',
        '9-12 Years': 'preteen',
        '13+ Years': 'teen'
      };
      params.set('age', ageReverseMap[ageGroup] || ageGroup);
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedAge('All');
    setPriceRange(40);
    setSearchQuery('');
    setSortBy('default');
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = allProducts
    .filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesAge = selectedAge === 'All' || product.ageGroup === selectedAge;
      const matchesPrice = Number(product.price) <= priceRange;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesAge && matchesPrice && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return Number(a.price) - Number(b.price);
      if (sortBy === 'price-high') return Number(b.price) - Number(a.price);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // default order
    });

  const ageFilterOptions = ['All', '0-2 Years', '3-5 Years', '6-8 Years', '9-12 Years', '13+ Years'];

  return (
    <div className="container shop-page-wrapper animate-fade-in">
      <div className="categories-intro" style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '36px', color: 'var(--primary-coral)' }}>Toy Marketplace</h1>
        <p>Browse our complete safety-assured collection. Find the perfect match for playtime.</p>
      </div>

      <div className="shop-layout">
        {/* Sidebar Filters */}
        <aside className="shop-sidebar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px' }}>
              <SlidersHorizontal size={18} /> Filters
            </h3>
            <button
              onClick={clearFilters}
              style={{ fontSize: '12px', color: 'var(--primary-coral)', background: 'none', fontWeight: '600' }}
            >
              Clear All
            </button>
          </div>

          {/* Search bar inside sidebar */}
          <div className="filter-group">
            <h4 className="filter-title">Search</h4>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input
                type="text"
                placeholder="Find toys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '75%',
                  padding: '10px 12px 10px 36px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  fontFamily: 'inherit',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <h4 className="filter-title">Categories</h4>
            <ul className="filter-list">
              <li>
                <button
                  onClick={() => handleCategorySelect('All')}
                  className={`filter-item-btn ${selectedCategory === 'All' ? 'active' : ''}`}
                >
                  All Categories
                </button>
              </li>
              {categories.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategorySelect(cat.name)}
                    className={`filter-item-btn ${selectedCategory === cat.name ? 'active' : ''}`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Age Bracket Filter */}
          <div className="filter-group">
            <h4 className="filter-title">Age Brackets</h4>
            <ul className="filter-list">
              {ageFilterOptions.map(age => (
                <li key={age}>
                  <button
                    onClick={() => handleAgeSelect(age)}
                    className={`filter-item-btn ${selectedAge === age ? 'active' : ''}`}
                  >
                    {age}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <h4 className="filter-title">Max Price</h4>
            <input
              type="range"
              min="10"
              max="60"
              step="1"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="price-range-slider"
            />
            <div className="price-range-labels">
              <span>$10</span>
              <strong style={{ color: 'var(--primary-coral)' }}>${priceRange}</strong>
              <span>$60</span>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="shop-content-area">
          {/* Toolbar */}
          <div className="shop-toolbar">
            <span className="results-count">
              Showing <strong>{filteredProducts.length}</strong> toys
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: 'var(--text-medium)' }}>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="default">Best Match</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>Loading products...</div>
          ) : filteredProducts.length > 0 ? (
            <div className="shop-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
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

                    <div className="product-rating">
                      <div className="rating-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill="currentColor" style={{ color: i < (product.rating || 5) ? 'var(--star-color)' : '#E5E7EB' }} />
                        ))}
                        <span className="rating-count">({product.reviewsCount || 85})</span>
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
          ) : (
            <div className="no-results">
              <h3>No toys found matching filters.</h3>
              <p style={{ marginTop: '8px', color: 'var(--text-light)' }}>Try clearing your filters or widening your search terms.</p>
              <button
                onClick={clearFilters}
                className="btn btn-secondary"
                style={{ marginTop: '20px', padding: '10px 24px' }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
