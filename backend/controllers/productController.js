const Product = require('../models/Product.js');
const MOCK_PRODUCTS_LIST = require('../utils/mockProductData');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
        return res.status(404).json({ message: 'No products found. Consider seeding the database.' });
    }
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id }); 
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Product not found (invalid ID format)' });
    }
    res.status(500).send('Server Error');
  }
};

exports.seedProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    console.log('Existing products cleared.');
    const productsToInsert = MOCK_PRODUCTS_LIST.map(p => ({
        ...p,
    }));

    const insertedProducts = await Product.insertMany(productsToInsert);
    console.log(`${insertedProducts.length} products inserted.`);
    res.status(201).json({ message: 'Database seeded successfully!', count: insertedProducts.length, data: insertedProducts });
  } catch (err) {
    console.error('Error seeding database:', err.message);
    res.status(500).json({ message: 'Error seeding database', error: err.message });
  }
};