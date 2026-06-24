import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ToyBrick, Rocket, Smile, Brain, Bike } from 'lucide-react';
import { categories } from '../data/products';

export default function Categories() {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryName) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  const handleAgeSelect = (ageKey) => {
    navigate(`/shop?age=${encodeURIComponent(ageKey)}`);
  };

  const ageGroups = [
    { key: 'baby', title: 'Baby Toys (0-2 Years)', desc: 'Soft plushes, sensory rattles, and safety-focused learning toys.', icon: <Smile size={28} /> },
    { key: 'toddler', title: 'Toddler Toys (3-5 Years)', desc: 'Building block sets, drawing boards, and early learning puzzles.', icon: <ToyBrick size={28} /> },
    { key: 'kid', title: 'Kids Toys (6-8 Years)', desc: 'Musical drum sets, interactive robots, and creative playsets.', icon: <Sparkles size={28} /> },
    { key: 'preteen', title: 'Pre-Teens (9-12 Years)', desc: 'High-speed remote control monster trucks, advanced puzzles, and cars.', icon: <Rocket size={28} /> },
    { key: 'teen', title: 'Teens (13+ Years)', desc: 'Complex brain boosters, outdoor sports gear, and strategy games.', icon: <Brain size={28} /> },
    { key: 'outdoor', title: 'Outdoor Play', desc: 'Bicycles, splash pads, active gear, and backyard adventure sets.', icon: <Bike size={28} /> }
  ];

  return (
    <div className="container categories-page-wrapper animate-fade-in">
      <div className="categories-intro">
        <h1 style={{ fontSize: '36px', color: 'var(--primary-coral)' }}>Browse Toy Collections</h1>
        <p>Explore curated worlds designed to inspire development, physical activity, and imaginative storytelling.</p>
      </div>

      {/* Categories by Age */}
      <div className="age-group-section">
        <h2 className="age-group-title">Shop by Age Range</h2>
        <div className="age-group-grid">
          {ageGroups.map((group) => (
            <div 
              key={group.key} 
              className="age-group-card"
              onClick={() => handleAgeSelect(group.key)}
              style={{ cursor: 'pointer' }}
            >
              <div className="age-icon-box">
                {group.icon}
              </div>
              <div className="age-card-info">
                <h3 className="age-card-title">{group.title}</h3>
                <p className="age-card-desc">{group.desc}</p>
                <span className="age-card-btn">
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories by Type */}
      <div>
        <h2 className="age-group-title">Shop by Type of Toy</h2>
        <div className="categories-grid" style={{ marginTop: '24px' }}>
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="category-card"
              onClick={() => handleCategorySelect(cat.name)}
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
    </div>
  );
}
