import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand">
            <img src={logoImg} alt="Toys-brary" className="footer-logo" />
            <p className="footer-desc">
              Discover toys that inspire creativity, active play, and learning. We craft and curate premium quality toys that ensure endless fun and safety for children of all ages.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/categories" className="footer-link">Categories</Link></li>
              <li><Link to="/shop" className="footer-link">Shop All</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
            </ul>
          </div>

          {/* Age Groups Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Shop by Age</h4>
            <ul className="footer-links">
              <li><Link to="/shop?age=baby" className="footer-link">Baby Toys (0-2 Years)</Link></li>
              <li><Link to="/shop?age=toddler" className="footer-link">Toddler Toys (3-5 Years)</Link></li>
              <li><Link to="/shop?age=kid" className="footer-link">Kids Toys (6-8 Years)</Link></li>
              <li><Link to="/shop?age=preteen" className="footer-link">Pre-Teens (9-12 Years)</Link></li>
              <li><Link to="/shop?age=teen" className="footer-link">Teens (13+ Years)</Link></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="footer-col">
            <h4 className="footer-heading">Newsletter</h4>
            <div className="footer-subscribe">
              <p className="footer-desc">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
              
              {subscribed ? (
                <div style={{ color: 'var(--primary-coral)', fontSize: '14px', fontWeight: '600' }}>
                  Thank you for subscribing! 🎉
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="subscribe-form">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="subscribe-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="subscribe-btn" aria-label="Subscribe">
                    <Send size={16} />
                  </button>
                </form>
              )}

              <div className="footer-socials">
                {/* Facebook SVG */}
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                
                {/* Twitter SVG */}
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                
                {/* Instagram SVG */}
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                
                {/* Youtube SVG */}
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Youtube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="footer-bottom">
          <p>© 2026 Toys-brary. All rights reserved. Designed with ❤️ for kids everywhere.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link to="/about" className="footer-link">Privacy Policy</Link>
            <Link to="/about" className="footer-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
