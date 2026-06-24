import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API request
    setTimeout(() => {
      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 800);
  };

  return (
    <div className="container contact-page-wrapper animate-fade-in">
      <div className="categories-intro">
        <h1 style={{ fontSize: '36px', color: 'var(--primary-coral)' }}>Get In Touch</h1>
        <p>Have questions about toy safety, shipping, or custom orders? Reach out to our customer care team anytime.</p>
      </div>

      <div className="contact-layout">
        {/* Contact info column */}
        <div className="contact-info-column">
          <div className="contact-detail-card">
            <div className="contact-detail-icon">
              <Phone size={24} />
            </div>
            <div className="contact-detail-text">
              <h3 className="contact-detail-title">Call Us</h3>
              <p className="contact-detail-desc">Our toll-free customer hotline is open Mon-Fri from 9 AM to 6 PM EST.</p>
              <a href="tel:1800966337" style={{ fontWeight: '700', color: 'var(--primary-coral)', marginTop: '4px', fontSize: '15px' }}>
                +1 (800) WONDER-TOY
              </a>
            </div>
          </div>

          <div className="contact-detail-card">
            <div className="contact-detail-icon">
              <Mail size={24} />
            </div>
            <div className="contact-detail-text">
              <h3 className="contact-detail-title">Email Inquiry</h3>
              <p className="contact-detail-desc">Drop us a line and our dedicated team will reply within 12-24 business hours.</p>
              <a href="mailto:support@wondertoys.com" style={{ fontWeight: '700', color: 'var(--primary-coral)', marginTop: '4px', fontSize: '15px' }}>
                support@wondertoys.com
              </a>
            </div>
          </div>

          <div className="contact-detail-card">
            <div className="contact-detail-icon">
              <MapPin size={24} />
            </div>
            <div className="contact-detail-text">
              <h3 className="contact-detail-title">Headquarters</h3>
              <p className="contact-detail-desc">
                Toys-brary Flagship Office<br />
                742 Evergreen Terrace, Suite 100<br />
                Springfield, OR 97477
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-card">
          <h2 style={{ fontSize: '24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={22} style={{ color: 'var(--primary-coral)' }} /> Send Us a Message
          </h2>

          {submitted && (
            <div className="form-success" style={{ marginBottom: '20px' }}>
              Your inquiry has been successfully sent! We will get back to you shortly. ✨
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="John"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="john.doe@example.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
                placeholder="How can we help you?"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                className="form-input form-textarea"
                placeholder="Write your details here..."
              ></textarea>
            </div>

            <button type="submit" className="btn form-submit-btn">
              Send Message <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
