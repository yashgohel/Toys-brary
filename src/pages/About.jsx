import React from 'react';
import { Shield, Sparkles, Smile, Heart, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="container about-page-wrapper animate-fade-in">
      {/* Hero Story Section */}
      <section className="about-hero">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary-coral)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Our Story
          </span>
          <h1 style={{ fontSize: '42px', color: 'var(--text-dark)', lineHeight: '1.2' }}>
            Inspiring Creativity & Joy In Every Home
          </h1>
          <p style={{ color: 'var(--text-medium)', fontSize: '16px', lineHeight: '1.7' }}>
            Toys-brary was founded in 2020 by a group of passionate parents and educators. We noticed a gap in the market for toys that seamlessly blended high-quality materials, educational benefits, and pure, engaging fun. 
          </p>
          <p style={{ color: 'var(--text-medium)', fontSize: '16px', lineHeight: '1.7' }}>
            Today, we are proud to serve families worldwide, making playrooms places of wonder, active learning, and safety. Every single toy we create or curate is tested in independent labs to verify that it meets the highest global standards.
          </p>
          <div style={{ marginTop: '12px' }}>
            <Link to="/shop" className="btn btn-primary">
              Browse Our Catalog <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80" 
            alt="Kids playing with blocks" 
            className="about-hero-img"
          />
        </div>
      </section>

      {/* Core Values / Features */}
      <section className="section" style={{ padding: '60px 0' }}>
        <div className="section-title-wrapper">
          <h2 className="section-title">Our Three Pillars</h2>
        </div>

        <div className="about-features">
          <div className="about-feature-card">
            <div className="about-feature-icon">
              <Shield size={28} />
            </div>
            <h3 style={{ fontSize: '20px' }}>100% Uncompromised Safety</h3>
            <p style={{ color: 'var(--text-medium)', fontSize: '14px' }}>
              We use 100% non-toxic, BPA-free plastics, and responsibly sourced organic woods. Zero sharp edges and child-safe organic paints only.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">
              <Sparkles size={28} />
            </div>
            <h3 style={{ fontSize: '20px' }}>Active Cognitive Learning</h3>
            <p style={{ color: 'var(--text-medium)', fontSize: '14px' }}>
              Every toy is structured with child psychologists to support fine motor skills, spatial reasoning, logic, and creative problem solving.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">
              <Smile size={28} />
            </div>
            <h3 style={{ fontSize: '20px' }}>Unbounded Smiles & Fun</h3>
            <p style={{ color: 'var(--text-medium)', fontSize: '14px' }}>
              No boring worksheets! Our toys focus on interactive, immersive play that keeps kids engaged and offline for hours of joy.
            </p>
          </div>
        </div>
      </section>

      {/* Fun Facts/Numbers Section */}
      <section className="about-values-section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '32px', color: 'var(--text-dark)' }}>By the Numbers</h2>
          <p style={{ color: 'var(--text-medium)', fontSize: '15px' }}>
            We've built a reputation for excellence that parents trust. Here's a glance at what makes Toys-brary different.
          </p>
          <div style={{ display: 'flex', gap: '32px', marginTop: '16px' }}>
            <div>
              <strong style={{ fontSize: '36px', color: 'var(--primary-coral)', display: 'block' }}>100k+</strong>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-medium)', textTransform: 'uppercase' }}>Happy Children</span>
            </div>
            <div>
              <strong style={{ fontSize: '36px', color: 'var(--primary-coral)', display: 'block' }}>100%</strong>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-medium)', textTransform: 'uppercase' }}>Non-Toxic Certs</span>
            </div>
            <div>
              <strong style={{ fontSize: '36px', color: 'var(--primary-coral)', display: 'block' }}>24/7</strong>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-medium)', textTransform: 'uppercase' }}>Support Help</span>
            </div>
          </div>
        </div>

        <div className="about-values-content">
          <div className="value-item">
            <span className="value-num">01</span>
            <div className="value-text">
              <h4 className="value-title">Sustainably Crafted</h4>
              <p className="value-desc">We commit to planting one tree for every wooden toy sold, partnering with global reforestation groups.</p>
            </div>
          </div>

          <div className="value-item">
            <span className="value-num">02</span>
            <div className="value-text">
              <h4 className="value-title">Inclusive Designs</h4>
              <p className="value-desc">We structure toys that cater to sensory-sensitive children and support neurodiverse milestones.</p>
            </div>
          </div>

          <div className="value-item">
            <span className="value-num">03</span>
            <div className="value-text">
              <h4 className="value-title">Award-Winning Quality</h4>
              <p className="value-desc">Recipient of the 2025 Toddler Development Award and praised by national parenting magazines.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
