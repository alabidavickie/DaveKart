export const initDB = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }
  if (!localStorage.getItem('admin')) {
    localStorage.setItem('admin', JSON.stringify({ email: 'admin@davekart.com', password: 'admin' }));
  }
  if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify([]));
  }
  // Always re-initialize products to ensure new Hexashop/DaveKart data is present
  const dummyProducts = [
    // Men's
    {
      id: 'm1',
      name: 'Premium Slim Fit Suit',
      category: 'MEN',
      price: 65000,
      sizes: ['M', 'L', 'XL'],
      imageUrl: '/assets/images/men_suit.png'
    },
    {
      id: 'm2',
      name: 'Classic Casual Shirt',
      category: 'MEN',
      price: 18500,
      sizes: ['M', 'L', 'XL'],
      imageUrl: '/assets/images/men_casual_shirt.png'
    },
    {
      id: 'm3',
      name: 'Vintage Leather Jacket',
      category: 'MEN',
      price: 45000,
      sizes: ['M', 'L', 'XL'],
      imageUrl: '/assets/images/men_leather_jacket.png'
    },
    {
      id: 'm4',
      name: 'Urban Denim Jacket',
      category: 'MEN',
      price: 25000,
      sizes: ['S', 'M', 'L', 'XL'],
      imageUrl: '/assets/images/men_denim_jacket.png'
    },
    {
      id: 'm5',
      name: 'Essential Cotton T-Shirt',
      category: 'MEN',
      price: 8000,
      sizes: ['S', 'M', 'L', 'XL'],
      imageUrl: '/assets/images/men_cotton_tee.png'
    },
    {
      id: 'm6',
      name: 'Winter Wool Overcoat',
      category: 'MEN',
      price: 55000,
      sizes: ['M', 'L', 'XL'],
      imageUrl: '/assets/images/men_wool_coat.png'
    },
    {
      id: 'm7',
      name: 'Signature Polo Shirt',
      category: 'MEN',
      price: 12000,
      sizes: ['M', 'L', 'XL'],
      imageUrl: '/assets/images/men_polo_shirt.png'
    },
    // Women's
    {
      id: 'w1',
      name: 'Floral Summer Dress',
      category: 'WOMEN',
      price: 22000,
      sizes: ['S', 'M', 'L'],
      imageUrl: '/assets/images/women_floral_dress.png'
    },
    {
      id: 'w2',
      name: 'Elegant Evening Gown',
      category: 'WOMEN',
      price: 48000,
      sizes: ['XS', 'S', 'M', 'L'],
      imageUrl: '/assets/images/women_evening_gown.png'
    },
    {
      id: 'w3',
      name: 'Casual V-Neck Top',
      category: 'WOMEN',
      price: 13500,
      sizes: ['S', 'M', 'L'],
      imageUrl: '/assets/images/women_vneck_top.png'
    },
    {
      id: 'w4',
      name: 'Faux Leather Biker Jacket',
      category: 'WOMEN',
      price: 35000,
      sizes: ['S', 'M', 'L'],
      imageUrl: '/assets/images/women_biker_jacket.png'
    },
    {
      id: 'w5',
      name: 'Professional Business Suit',
      category: 'WOMEN',
      price: 52000,
      sizes: ['S', 'M', 'L'],
      imageUrl: '/assets/images/women_business_suit.png'
    },
    {
      id: 'w6',
      name: 'Classic Trench Coat',
      category: 'WOMEN',
      price: 42000,
      sizes: ['S', 'M', 'L'],
      imageUrl: '/assets/images/women_trench_coat.png'
    },
    {
      id: 'w7',
      name: 'Denim Jumpsuit',
      category: 'WOMEN',
      price: 26000,
      sizes: ['S', 'M', 'L'],
      imageUrl: '/assets/images/women_denim_jumpsuit.png'
    },
    // Kids
    {
      id: 'k1',
      name: 'Cozy Stripe Sweater',
      category: 'KID',
      price: 12500,
      sizes: ['4Y', '6Y', '8Y'],
      imageUrl: '/assets/images/kid_stripe_sweater.png'
    },
    {
      id: 'k2',
      name: 'Autumn Outerwear',
      category: 'KID',
      price: 18000,
      sizes: ['4Y', '6Y', '8Y'],
      imageUrl: '/assets/images/kid_autumn_outerwear.png'
    },
    {
      id: 'k3',
      name: 'Playful Denim Overalls',
      category: 'KID',
      price: 14500,
      sizes: ['2Y', '4Y', '6Y'],
      imageUrl: '/assets/images/kid_denim_overalls.png'
    },
    {
      id: 'k4',
      name: 'Summer Party Dress',
      category: 'KID',
      price: 16000,
      sizes: ['4Y', '6Y', '8Y'],
      imageUrl: '/assets/images/kid_party_dress.png'
    },
    {
      id: 'k5',
      name: 'Warm Winter Puffer',
      category: 'KID',
      price: 22000,
      sizes: ['4Y', '6Y', '8Y'],
      imageUrl: '/assets/images/kid_winter_puffer.png'
    },
    {
      id: 'k6',
      name: 'Lumberjack Plaid Shirt',
      category: 'KID',
      price: 9500,
      sizes: ['4Y', '6Y', '8Y'],
      imageUrl: '/assets/images/kid_plaid_shirt.png'
    },
    {
      id: 'k7',
      name: 'Weekend Casual Outfit',
      category: 'KID',
      price: 15500,
      sizes: ['2Y', '4Y', '6Y'],
      imageUrl: '/assets/images/kid_casual_outfit.png'
    }
  ];
  localStorage.setItem('products', JSON.stringify(dummyProducts));
};

export const getProducts = () => JSON.parse(localStorage.getItem('products') || '[]');
export const setProducts = (products) => localStorage.setItem('products', JSON.stringify(products));

export const getOrders = () => JSON.parse(localStorage.getItem('orders') || '[]');
export const setOrders = (orders) => localStorage.setItem('orders', JSON.stringify(orders));

export const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]');
export const setUsers = (users) => localStorage.setItem('users', JSON.stringify(users));

export const getCurrentUser = () => JSON.parse(localStorage.getItem('currentUser') || 'null');
export const setCurrentUser = (user) => {
  if (user === null) {
      localStorage.removeItem('currentUser');
  } else {
      localStorage.setItem('currentUser', JSON.stringify(user));
  }
};
