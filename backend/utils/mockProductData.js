const MOCK_PRODUCTS_LIST = [
  {
    id: 'prod_123',
    name: 'Converse Chuck Taylor All Star II Hi',
    price: 75.00,
    imageUrls: [ 
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/514aT4wXswL._SY695_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/51kALiBAHBL._SY695_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/51X3L7bo0kL._SY695_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/51iAAtQigYL._SY695_.jpg',
    ],
    defaultImageUrl: 'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/514aT4wXswL._SY695_.jpg',
    variantOptions: [
        { type: 'Color', options: ['Black', 'White', 'Red'] },
        { type: 'Size', options: ['7', '8', '9', '10'] }
    ],
    variants: [
      { id: 'var_b_s7_p123', name: 'Black / Size 7', color: 'Black', size: '7', stock: 10 },
      { id: 'var_w_s8_p123', name: 'White / Size 8', color: 'White', size: '8', stock: 5 },
      { id: 'var_r_s9_p123', name: 'Red / Size 9', color: 'Red', size: '9', stock: 0 },
      { id: 'var_b_s8_p123', name: 'Black / Size 8', color: 'Black', size: '8', stock: 3 },
    ],
    description: 'The iconic Chuck Taylor All Star II, built for more. Features a Nike Lunarlon insole for cushioning and a padded non-slip tongue for 360-degree comfort. Multiple colors and sizes available.',
    category: 'Footwear',
    relatedProductIds: ['prod_456', 'prod_101']
  },
  {
    id: 'prod_456',
    name: 'Classic Cotton T-Shirt',
    price: 25.00,
    imageUrls: [
        'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/51gGY-4g0BL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/51ust7qiLiL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/518MqTJenKL._SX679_.jpg',
        'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/51udz8xlt8L._SX679_.jpg'
    ],
    defaultImageUrl: 'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/51gGY-4g0BL._SX679_.jpg',
    variantOptions: [
        { type: 'Color', options: ['Black', 'Gray'] },
        { type: 'Size', options: ['S', 'M', 'L', 'XL'] }
    ],
    variants: [
      { id: 'var_blue_s_p456', name: 'Black / S', color: 'Black', size: 'S', stock: 20 },
      { id: 'var_gray_m_p456', name: 'Gray / M', color: 'Gray', size: 'M', stock: 30 },
      { id: 'var_blue_l_p456', name: 'Black / L', color: 'Black', size: 'L', stock: 15 },
    ],
    description: 'A comfortable and durable 100% cotton t-shirt, perfect for everyday wear. Available in various sizes and colors.',
    category: 'Apparel',
    relatedProductIds: ['prod_123', 'prod_789']
  },
   {
    id: 'prod_101',
    name: 'Leather Wallet',
    price: 45.00,
    imageUrls: [
        'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/41D83gOKr4L._SY300_SX300_.jpg'
    ],
    defaultImageUrl: 'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/41D83gOKr4L._SY300_SX300_.jpg',
    variantOptions: [
        { type: 'Color', options: ['Black', 'Gray'] },
    ],
    variants: [
      { id: 'var_brown_p101', name: 'Brown', stock: 18 }, 
      { id: 'var_black_p101', name: 'Black', stock: 22 },
    ],
    description: 'A stylish and durable genuine leather wallet with multiple card slots and a cash compartment.',
    category: 'Accessories',
    relatedProductIds: ['prod_789', 'prod_456']
  },
  {
    id: 'prod_amz_001',
    name: 'OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)',
    price: 19999.00,
    imageUrls: [
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/61LB+d0vheL._SL1500_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/51g5AuSsiYL._SL1500_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/51DwtdEhPIL._SL1500_.jpg'
    ],
    defaultImageUrl: 'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/61LB+d0vheL._SL1500_.jpg',
    variantOptions: [
        { 'type': 'Color', 'options': ['Pastel Lime', 'Chromatic Gray'] },
        { 'type': 'Storage', 'options': ['128GB', '256GB'] }
    ],
    variants: [
      { id: 'var_lime_128_p_amz001', name: 'Pastel Lime / 128GB', 'color': 'Pastel Lime', 'storage': '128GB', 'stock': 15 },
      { id: 'var_gray_128_p_amz001', name: 'Chromatic Gray / 128GB', 'color': 'Chromatic Gray', 'storage': '128GB', 'stock': 10 },
      { id: 'var_lime_256_p_amz001', name: 'Pastel Lime / 256GB', 'color': 'Pastel Lime', 'storage': '256GB', 'stock': 5 }
    ],
    description: '108 MP Main Camera with EIS; 6.72` 120Hz AMOLED FHD+ Display; Snapdragon® 695 5G; 5000 mAh Battery with 67W SUPERVOOC Charging.',
    category: 'Electronics - Mobile',
    relatedProductIds: ['prod_789', 'prod_amz_004']
  },
  {
    id: 'prod_amz_002',
    name: 'HP Laptop 15s, 12th Gen Intel Core i5-1235U',
    price: 53990.00,
    imageUrls: [
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/71TQcA5nf3L._SL1500_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/81F++NQdRcL._SL1500_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/81ubeK7O2JL._SL1500_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/71daMGjntwL._SL1500_.jpg'
    ],
    defaultImageUrl: 'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/71TQcA5nf3L._SL1500_.jpg',
    variantOptions: [
        { 'type': 'RAM', 'options': ['8GB', '16GB'] },
        { 'type': 'SSD', 'options': ['512GB', '1TB'] }
    ],
    variants: [
      { id: 'var_8gb_512gb_p_amz002', name: '8GB RAM / 512GB SSD', 'ram': '8GB', 'ssd': '512GB', 'stock': 12 },
      { id: 'var_16gb_512gb_p_amz002', name: '16GB RAM / 512GB SSD', 'ram': '16GB', 'ssd': '512GB', 'stock': 8 },
      { id: 'var_16gb_1tb_p_amz002', name: '16GB RAM / 1TB SSD', 'ram': '16GB', 'ssd': '1TB', 'stock': 3 }
    ],
    description: '15.6-inch (39.6 cm) FHD, Micro-Edge Display, Intel Iris Xe Graphics, Thin & Light, Dual Speakers, Backlit Keyboard (Win 11, MSO 2021).',
    category: 'Electronics - Laptops',
    relatedProductIds: ['prod_amz_009', 'prod_123']
  },
  {
    id: 'prod_amz_003',
    name: 'Sony WH-1000XM4 Wireless Noise Cancelling Headphones',
    price: 22990.00,
    imageUrls: [
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/61oqO1AMbdL._SL1500_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/71PwmYvgPgL._SL1500_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/71xsREqXS+L._SL1500_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/81rVZu5JHUL._SL1500_.jpg'
    ],
    defaultImageUrl: 'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/61oqO1AMbdL._SL1500_.jpg',
    variantOptions: [
        { 'type': 'Color', 'options': ['Black', 'Silver', 'Blue'] }
    ],
    variants: [
      { id: 'var_black_p_amz003', name: 'Black', 'color': 'Black', 'stock': 20 },
      { id: 'var_silver_p_amz003', name: 'Silver', 'color': 'Silver', 'stock': 15 },
      { id: 'var_blue_p_amz003', name: 'Blue', 'color': 'Blue', 'stock': 0 }
    ],
    description: 'Industry Leading Noise Cancellation with DSEE Extreme, 30 Hr Battery, Alexa/Google Assistant, Mic for Phone Calls, Quick Attention Mode.',
    category: 'Electronics - Headphones',
    relatedProductIds: ['prod_789', 'prod_amz_001']
  },
  {
    id: 'prod_amz_004',
    name: 'Amazfit GTS 4 Mini Smart Watch',
    price: 7999.00,
    imageUrls: [
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/61vyWLAQjnL._SL1500_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/61IDRLz423L._SL1500_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/71hTC6DHgZL._SL1500_.jpg'
    ],
    defaultImageUrl: 'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/61vyWLAQjnL._SL1500_.jpg',
    variantOptions: [
        { 'type': 'Color', 'options': ['Midnight Black', 'Flamingo Pink', 'Mint Blue'] }
    ],
    variants: [
      { id: 'var_black_p_amz004', name: 'Midnight Black', 'color': 'Midnight Black', 'stock': 25 },
      { id: 'var_pink_p_amz004', name: 'Flamingo Pink', 'color': 'Flamingo Pink', 'stock': 18 },
      { id: 'var_blue_p_amz004', name: 'Mint Blue', 'color': 'Mint Blue', 'stock': 10 }
    ],
    description: '1.65\' HD AMOLED Display, 120+ Sports Modes, 5 Satellite Positioning Systems, 24H Heart Rate, SpO2 & Stress Monitoring, 5 ATM Water Resistance.',
    category: 'Electronics - Wearables',
    relatedProductIds: ['prod_amz_001', 'prod_101']
  },
  {
    id: 'prod_amz_005',
    name: 'Atomic Habits by James Clear',
    price: 499.00,
    imageUrls: [
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/81F90H7hnML._SL1500_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/61Bhf8CdaML._SL1200_.jpg'
    ],
    defaultImageUrl: 'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/61Bhf8CdaML._SL1200_.jpg',
    variants: [
      { id: 'var_paperback_p_amz005', name: 'Paperback', 'stock': 50 },
      { id: 'var_hardcover_p_amz005', name: 'Hardcover', 'stock': 20 }
    ],
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones. Tiny Changes, Remarkable Results.',
    category: 'Books - Self Help',
    relatedProductIds: ['prod_amz_008']
  },
  {
    id: 'prod_amz_006',
    name: 'Allen Solly Men`s Regular Fit Polo T-Shirt',
    price: 749.00,
    imageUrls: [
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/31WT3X-vk8L._SX342_SY445_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/71mh8ZJZFuL._SX569_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/71J8pbcn8WL._SX569_.jpg'
    ],
    defaultImageUrl: 'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/31WT3X-vk8L._SX342_SY445_.jpg',
    variantOptions: [
        { 'type': 'Color', 'options': ['Navy', 'Black', 'Red', 'White'] },
        { 'type': 'Size', 'options': ['S', 'M', 'L', 'XL', 'XXL'] }
    ],
    variants: [
      { id: 'var_navy_m_p_amz006', name: 'Navy / M', 'color': 'Navy', 'size': 'M', 'stock': 30 },
      { id: 'var_black_l_p_amz006', name: 'Black / L', 'color': 'Black', 'size': 'L', 'stock': 25 },
      { id: 'var_red_xl_p_amz006', name: 'Red / XL', 'color': 'Red', 'size': 'XL', 'stock': 10 }
    ],
    description: 'Classic regular fit polo t-shirt made from comfortable cotton blend fabric. Perfect for casual and semi-formal occasions.',
    category: 'Apparel - Men',
    relatedProductIds: ['prod_456', 'prod_123']
  },
  {
    id: 'prod_amz_007',
    name: 'Janasya Women`s Pure Cotton Straight Kurta',
    price: 489.00,
    imageUrls: [
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/81DVJUV7L7L._SY741_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/81M-PbxpyJL._SY741_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/81si7LLh+-L._SY741_.jpg'
    ],
    defaultImageUrl: 'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/81DVJUV7L7L._SY741_.jpg',
    variantOptions: [
        { 'type': 'Color', 'options': ['Pink', 'Yellow', 'Green'] },
        { 'type': 'Size', 'options': ['S', 'M', 'L', 'XL'] }
    ],
    variants: [
      { id: 'var_pink_m_p_amz007', name: 'Pink / M', 'color': 'Pink', 'size': 'M', 'stock': 22 },
      { id: 'var_yellow_l_p_amz007', name: 'Yellow / L', 'color': 'Yellow', 'size': 'L', 'stock': 17 },
      { id: 'var_green_s_p_amz007', name: 'Green / S', 'color': 'Green', 'size': 'S', 'stock': 5 }
    ],
    description: 'Elegant pure cotton straight kurta for women. Features beautiful prints and comfortable fit for daily wear or festive occasions.',
    category: 'Apparel - Women',
    relatedProductIds: ['prod_amz_006']
  },
  {
    id: 'prod_amz_009',
    name: 'Wesley Milestone 2.0 Casual Waterproof Laptop Backpack',
    price: 565.00,
    imageUrls: [
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/41zaQIbMRCL._SY445_SX342_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/81swreKYU+L._SY741_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/91sriwU7EpL._SX679_.jpg'
    ],
    defaultImageUrl: 'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/41zaQIbMRCL._SY445_SX342_.jpg',
    variantOptions: [
        { 'type': 'Color', 'options': ['Charcoal Black', 'Blue & Black', 'Grey & Black'] }
    ],
    variants: [
      { id: 'var_charcoal_p_amz009', name: 'Charcoal Black', 'color': 'Charcoal Black', 'stock': 40 },
      { id: 'var_blueblack_p_amz009', name: 'Blue & Black', 'color': 'Blue & Black', 'stock': 0 },
      { id: 'var_greyblack_p_amz009', name: 'Grey & Black', 'color': 'Grey & Black', 'stock': 20 }
    ],
    description: '30L capacity, fits up to 15.6 inch laptops. Durable, water-resistant material with multiple compartments for organization.',
    category: 'Bags & Luggage',
    relatedProductIds: ['prod_amz_002', 'prod_101']
  },
  {
    id: 'prod_amz_010',
    name: 'boAt Stone 180 5W Bluetooth Speaker',
    price: 999.00,
    imageUrls: [
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/61HxZuw48vL._SL1500_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/61jY-B1NP+L._SL1500_.jpg',
      'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/61wS+msvTEL._SL1000_.jpg'
    ],
    defaultImageUrl: 'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/61HxZuw48vL._SL1500_.jpg',
    variantOptions: [
        { 'type': 'Color', 'options': ['Black', 'Blue', 'Red'] }
    ],
    variants: [
      { id: 'var_black_p_amz010', name: 'Black', 'color': 'Black', 'stock': 35 },
      { id: 'var_blue_p_amz010', name: 'Blue', 'color': 'Blue', 'stock': 28 },
      { id: 'var_red_p_amz010', name: 'Red', 'color': 'Red', 'stock': 12 }
    ],
    description: 'Portable wireless speaker with 5W RMS sound, IPX7 water resistance, up to 10 hours playtime, TWS feature, and built-in mic.',
    category: 'Electronics - Audio',
    relatedProductIds: ['prod_789', 'prod_amz_003']
  }
];

module.exports = MOCK_PRODUCTS_LIST;
