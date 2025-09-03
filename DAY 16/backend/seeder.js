const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Cart = require('./models/Cart');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'password123',
  },
];

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    image: '/images/headphones.jpg',
    description:
      'Experience premium sound quality with these comfortable over-ear headphones featuring active noise cancellation and long battery life.',
    brand: 'Sony',
    category: 'Electronics',
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'iPhone 13 Pro',
    image: '/images/phone.jpg',
    description:
      'The latest iPhone with a stunning Super Retina XDR display, A15 Bionic chip, and pro camera system.',
    brand: 'Apple',
    category: 'Electronics',
    price: 999.99,
    countInStock: 7,
    rating: 4.8,
    numReviews: 8,
  },
  {
    name: 'Canon EOS R5',
    image: '/images/camera.jpg',
    description:
      'Professional-grade mirrorless camera with 45MP full-frame sensor and 8K video recording capabilities.',
    brand: 'Canon',
    category: 'Electronics',
    price: 3899.99,
    countInStock: 5,
    rating: 4.7,
    numReviews: 12,
  },
  {
    name: 'Ultra HD 4K Smart TV',
    image: '/images/tv.jpg',
    description:
      '65-inch 4K Ultra HD Smart LED TV with HDR and built-in streaming apps.',
    brand: 'Samsung',
    category: 'Electronics',
    price: 799.99,
    countInStock: 11,
    rating: 4.3,
    numReviews: 15,
  },
  {
    name: 'Gaming Laptop',
    image: '/images/laptop.jpg',
    description:
      'High-performance gaming laptop with NVIDIA RTX graphics, fast refresh rate display, and RGB keyboard.',
    brand: 'MSI',
    category: 'Electronics',
    price: 1499.99,
    countInStock: 7,
    rating: 4.6,
    numReviews: 10,
  },
  {
    name: 'Wireless Charging Pad',
    image: '/images/charger.jpg',
    description:
      'Fast wireless charging pad compatible with all Qi-enabled devices.',
    brand: 'Anker',
    category: 'Electronics',
    price: 29.99,
    countInStock: 25,
    rating: 4.2,
    numReviews: 18,
  },
  {
    name: 'Smart Watch Series 7',
    image: '/images/watch.jpg',
    description:
      'Advanced smartwatch with health monitoring, GPS, and always-on display.',
    brand: 'Apple',
    category: 'Electronics',
    price: 399.99,
    countInStock: 15,
    rating: 4.9,
    numReviews: 14,
  },
  {
    name: 'Portable Bluetooth Speaker',
    image: '/images/speaker.jpg',
    description:
      'Waterproof portable speaker with 360° sound and 24-hour battery life.',
    brand: 'JBL',
    category: 'Electronics',
    price: 129.99,
    countInStock: 18,
    rating: 4.4,
    numReviews: 22,
  },
];

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // Create users
    const createdUsers = await User.create(users);

    // Get admin user id
    const adminUser = createdUsers[0]._id;

    // Add user reference to products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Create products
    await Product.create(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Destroy data
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Check command line argument to determine action
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}