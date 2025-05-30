const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  color: { type: String },
  size: { type: String },
  stock: { type: Number, required: true, default: 0 },
});

const VariantOptionSchema = new mongoose.Schema({
    type: { type: String, required: true },
    options: [{ type: String, required: true }]
});

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrls: [{ type: String }],
  defaultImageUrl: { type: String },
  variantOptions: [VariantOptionSchema],
  variants: [VariantSchema],
  description: { type: String },
  category: { type: String },
  relatedProductIds: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ProductSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);