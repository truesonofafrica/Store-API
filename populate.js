require('dotenv').config();
const mongoose = require('mongoose');
const productsJson = require('./products.json');
const Products = require('./models/product');
const connectDB = require('./db/connect');

const connectingDB = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    console.log('Connected to DB');
    await Products.deleteMany();
    console.log('Products deleted');
    await Products.create(productsJson);
    console.log('Products persisted to database');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectingDB();
