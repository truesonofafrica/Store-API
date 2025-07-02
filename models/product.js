const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product must have a name'],
  },

  price: { type: Number, required: [true, 'Product must have a price'] },

  featured: { type: Boolean, default: false },

  ratings: { type: Number, default: 3.0 },

  createdAt: { type: Date, default: Date.now() },

  company: {
    type: String,
    enum: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'],
      messgae: '{VALUE} Not suported.',
    },
  },
  // enum: ['ikea', 'liddy', 'caressa', 'macros'] },
});

module.exports = mongoose.model('Product', productSchema);
