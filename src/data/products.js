// Category data matching the Figma card icons
export const categories = [
  {
    id: 'baby',
    name: 'Baby Toys',
    desc: '0 - 2 Years',
    image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&w=200&q=80', // pink teddy
  },
  {
    id: 'educational',
    name: 'Educational Toys',
    desc: 'Learn & Grow',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=200&q=80', // blocks
  },
  {
    id: 'rc',
    name: 'Remote Control',
    desc: 'Speed & Fun',
    image: 'https://m.media-amazon.com/images/I/71LMTdb2egL._AC_UF1000,1000_QL80_.jpg', // rc truck
  },
  {
    id: 'figures',
    name: 'Action Figures',
    desc: 'Heroes & More',
    image: 'https://www.funcorp.in/cdn/shop/files/619Yd_pSu2L._SL1000.jpg?v=1733491240', // hero/action toy
  },
  {
    id: 'puzzles',
    name: 'Puzzle Games',
    desc: 'Brain Booster',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=200&q=80', // puzzle/drawing
  },
  {
    id: 'outdoor',
    name: 'Outdoor Toys',
    desc: 'Play Outside',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=200&q=80', // bike/outdoor
  }
];

// Top Selling regular products (Grid 1 in Figma)
export const topSellingRegular = [
  {
    id: 1,
    name: 'RC Monster Truck',
    rating: 5,
    reviewsCount: 120,
    price: 29.99,
    category: 'Remote Control',
    ageGroup: '6-8 Years',
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 2,
    name: 'Building Block Set',
    rating: 5,
    reviewsCount: 120,
    price: 29.99,
    category: 'Educational Toys',
    ageGroup: '3-5 Years',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 3,
    name: 'Dancing Robot',
    rating: 5,
    reviewsCount: 120,
    price: 29.99,
    category: 'Action Figures',
    ageGroup: '6-8 Years',
    image: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 4,
    name: 'Teddy Bear Soft Toys',
    rating: 5,
    reviewsCount: 120,
    price: 29.99,
    category: 'Baby Toys',
    ageGroup: '0-2 Years',
    image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 5,
    name: 'Magic Drawing Board',
    rating: 5,
    reviewsCount: 120,
    price: 29.99,
    category: 'Puzzle Games',
    ageGroup: '3-5 Years',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 6,
    name: 'Sport Car (RC)',
    rating: 5,
    reviewsCount: 120,
    price: 29.99,
    category: 'Remote Control',
    ageGroup: '9-12 Years',
    image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=300&q=80'
  }
];

// Top Selling wide-format products (Grid 2 in Figma)
export const topSellingWide = [
  {
    id: 7,
    name: 'Dinosaur World Set',
    price: 27.99,
    category: 'Educational Toys',
    ageGroup: '3-5 Years',
    image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 8,
    name: 'Musical Drum Set',
    price: 21.99,
    category: 'Outdoor Toys',
    ageGroup: '6-8 Years',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 9,
    name: 'Baby Activity Walker',
    price: 27.99,
    category: 'Baby Toys',
    ageGroup: '0-2 Years',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 10,
    name: 'Princess Castle Playset',
    price: 27.99,
    category: 'Puzzle Games',
    ageGroup: '3-5 Years',
    image: 'https://m.media-amazon.com/images/I/71IfOxkxLnL._AC_UF1000,1000_QL80_.jpg'
  }
];

// All products aggregated for the Shop page
export const allProducts = [...topSellingRegular, ...topSellingWide];

// Testimonials data (Figma parents comments)
export const testimonials = [
  {
    id: 1,
    name: 'Sarah J.',
    rating: 5,
    quote: 'Amazing quality toys! My kids love playing with them every day. The safety standards give me total peace of mind.'
  },
  {
    id: 2,
    name: 'Sarah J.',
    rating: 5,
    quote: 'Amazing quality toys! My kids love playing with them every day. The delivery was super fast and packaged beautifully.'
  },
  {
    id: 3,
    name: 'Sarah J.',
    rating: 5,
    quote: 'Amazing quality toys! My kids love playing with them every day. Excellent customer support and great values!'
  }
];
