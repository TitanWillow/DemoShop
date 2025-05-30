const Order = require('../models/Order');
const Product = require('../models/Product');
const sendEmail = require('../utils/emailService');

exports.processCheckout = async (req, res, next) => {
  const { items: cartItems, customerDetails, paymentInfo } = req.body;

  if (!cartItems || cartItems.length === 0) return res.status(400).json({ message: 'Cart is empty.' });
  if (!customerDetails || !customerDetails.email || !customerDetails.fullName) return res.status(400).json({ message: 'Customer details are incomplete.' });
  if (!paymentInfo || !paymentInfo.cardNumber) return res.status(400).json({ message: 'Payment information is required.' });

  let transactionOutcome;
  const cardNumber = paymentInfo.cardNumber;
  if (cardNumber.endsWith('1')) transactionOutcome = 'approved';
  else if (cardNumber.endsWith('2')) transactionOutcome = 'declined';
  else if (cardNumber.endsWith('3')) transactionOutcome = 'gateway_error';
  else transactionOutcome = 'approved'; 

  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  let orderTotal = 0;
  cartItems.forEach(item => { 
    const price = parseFloat(item.pricePerItem);
    const qty = parseInt(item.quantity, 10);
    if (!isNaN(price) && !isNaN(qty)) {
        orderTotal += price * qty;
    }
  });

  const orderItemsForSchema = cartItems.map(item => ({
      productId: item.productId,
      productName: item.productName,
      variantId: item.variantId,
      variantName: item.variantName,
      quantity: item.quantity,
      pricePerItem: item.pricePerItem,
      lineTotal: item.lineTotal,
      defaultImageUrl: item.product?.defaultImageUrl || item.product?.imageUrls?.[0] || ''
  }));

  if (transactionOutcome === 'approved') {
    try {
      for (const item of orderItemsForSchema) { 
        const product = await Product.findOne({ id: item.productId });
        if (!product) { console.error(`Product ${item.productId} not found.`); continue; }
        const variant = product.variants.find(v => v.id === item.variantId);
        if (!variant) { console.error(`Variant ${item.variantId} for product ${item.productId} not found.`); continue; }
        if (variant.stock < item.quantity) { throw new Error(`Insufficient stock for ${product.name} - ${variant.name}. Requested: ${item.quantity}, Available: ${variant.stock}`); }
        variant.stock -= item.quantity;
        await product.save();
      }

      const newOrder = new Order({
        orderNumber, items: orderItemsForSchema, customerDetails, orderTotal, transactionOutcome, 
        status: 'processing',
        paymentDetails: { cardType: paymentInfo.cardType || "Simulated Card", last4Digits: cardNumber.slice(-4) }
      });
      const savedOrder = await newOrder.save();

      const emailDataSuccess = {
        customerName: customerDetails.fullName,
        orderNumber: savedOrder.orderNumber,
        orderTotal: savedOrder.orderTotal.toFixed(2),
        items: savedOrder.items.map(item => ({
            name: item.productName,
            variant: item.variantName,
            quantity: item.quantity,
            price: (item.pricePerItem * item.quantity).toFixed(2),
            image: item.defaultImageUrl || 'https://placehold.co/64x64/EFEFEF/AAAAAA?text=Product'
        }))
      };

      try {
        await sendEmail({
          to: customerDetails.email, 
          subject: `Order Confirmation - #${savedOrder.orderNumber} - DemoShop`,
          template: 'orderConfirmation',
          data: emailDataSuccess
        });
      } catch (emailError) { console.error("Failed to send confirmation email:", emailError); }

      res.status(201).json({ message: 'Order processed successfully!', orderNumber: savedOrder.orderNumber, orderDetails: savedOrder });
    } catch (dbError) {
      console.error('Error processing approved order:', dbError);
      dbError.status = dbError.message.includes("Insufficient stock") ? 400 : 500; 
      next(dbError);
    }
  } else { 
    let failureMessageForUser = `Transaction ${transactionOutcome}. Please try again or contact support.`;
    let failureReasonForEmail = "your transaction was declined.";
    if(transactionOutcome === 'gateway_error') failureReasonForEmail = "there was a gateway error with your transaction.";
    
    try {
        const failedOrder = new Order({
            orderNumber, items: orderItemsForSchema, customerDetails, orderTotal,
            transactionOutcome, status: 'failed_payment', 
            paymentDetails: { cardType: paymentInfo.cardType || "Simulated Card", last4Digits: cardNumber.slice(-4) },
            errorMessage: `Transaction ${transactionOutcome}`
        });
        await failedOrder.save();
        console.log(`Failed order attempt ${orderNumber} (Status: ${transactionOutcome}) logged to database.`);
    } catch (logError) {
        console.error(`Error logging failed order attempt ${orderNumber}:`, logError);
    }

    const emailDataFailure = {
        customerName: customerDetails.fullName,
        orderNumberRef: orderNumber,
        reason: failureReasonForEmail,
        retryInstruction: "Please double-check your payment details and try placing a new order. If the issue persists, contact our support team."
    };

    try {
        await sendEmail({
            to: customerDetails.email, 
            subject: `Order Attempt Failed - Ref #${orderNumber} - DemoShop`,
            template: 'orderFailure',
            data: emailDataFailure
        });
    } catch (emailError) { console.error("Failed to send failure email:", emailError); }
    
    res.status(400).json({ message: failureMessageForUser, orderNumber, transactionOutcome });
  }
};

exports.getOrderDetails = async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) {
      const err = new Error('Order not found');
      err.status = 404;
      return next(err); 
    }
    res.json(order);
  } catch (err) {
    console.error(`Error in getOrderDetails for ${req.params.orderNumber}:`, err.message);
    next(err);
  }
};