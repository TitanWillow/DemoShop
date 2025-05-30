const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true }, 
  productName: { type: String, required: true },
  variantId: { type: String, required: true }, 
  variantName: { type: String, required: true },
  quantity: { type: Number, required: true },
  pricePerItem: { type: Number, required: true }, 
  lineTotal: { type: Number, required: true },
  defaultImageUrl: { type: String }
});

const CustomerDetailsSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
});

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true, index: true },
  items: [OrderItemSchema],
  customerDetails: CustomerDetailsSchema,
  orderTotal: { type: Number, required: true },
  transactionOutcome: {
    type: String,
    enum: ['approved', 'declined', 'gateway_error', 'pending'], 
    required: true,
  },
  paymentDetails: { 
    cardType: String, 
    last4Digits: String,
  },
  status: { 
    type: String,
    enum: ['pending_payment', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded', 'failed_payment'], 
    default: 'pending_payment'
  },
  errorMessage: { type: String }, 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

OrderSchema.pre('save', function(next) { this.updatedAt = Date.now(); next(); });

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema);