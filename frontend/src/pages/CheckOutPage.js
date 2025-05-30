import { useState, useEffect } from 'react';
import { useOrder } from '../context/OrderContext';
import IconInput from '../components/common/IconInput';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { Mail, User, Phone, MapPin, CreditCard, Calendar, Lock, Loader2} from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const CheckoutPage = ({ onNavigate }) => {
  const { cart, clearCart, setOrderProcessingOutcome } = useOrder(); 
  const [formData, setFormData] = useState({ email: '', fullName: '', phone: '', address: '', city: '', state: '', zipCode: '', cardNumber: '', expiryDate: '', cvv: '', });
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);

  useEffect(() => { if (cart.length === 0 && !isProcessing) { setShowEmptyCartModal(true); } else { setShowEmptyCartModal(false); } }, [cart, isProcessing]);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const validateForm = () => { const errors = {}; if (!formData.email.trim()) errors.email = "Email is required."; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Invalid email format."; if (!formData.fullName.trim()) errors.fullName = "Full name is required."; if (!formData.phone.trim()) errors.phone = "Phone number is required."; else if (!/^\d{10,15}$/.test(formData.phone)) errors.phone = "Invalid phone number (10-15 digits)."; if (!formData.address.trim()) errors.address = "Address is required."; if (!formData.city.trim()) errors.city = "City is required."; if (!formData.state.trim()) errors.state = "State is required."; if (!formData.zipCode.trim()) errors.zipCode = "Zip code is required."; else if (!/^\d{5,6}$/.test(formData.zipCode)) errors.zipCode = "Invalid zip code (5-6 digits)."; if (!formData.cardNumber.trim()) errors.cardNumber = "Card number is required."; else if (!["1", "2", "3"].includes(formData.cardNumber) && !/^\d{16}$/.test(formData.cardNumber)) errors.cardNumber = "Card number must be 16 digits, or '1', '2', '3' for simulation."; if (!formData.expiryDate.trim()) errors.expiryDate = "Expiry date is required."; else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) errors.expiryDate = "Expiry date must be MM/YY."; else { const [month, year] = formData.expiryDate.split('/'); const expiry = new Date(`20${year}`, month - 1); const currentMonth = new Date(); currentMonth.setDate(1); if (expiry < currentMonth) errors.expiryDate = "Expiry date must be in the future.";} if (!formData.cvv.trim()) errors.cvv = "CVV is required."; else if (!/^\d{3}$/.test(formData.cvv)) errors.cvv = "CVV must be 3 digits."; setFormErrors(errors); return Object.keys(errors).length === 0; };
  const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); if (formErrors[name]) { setFormErrors(prev => ({ ...prev, [name]: null })); } };
  const handleSubmit = async (e) => {
    e.preventDefault(); setApiError(null);
    if (!validateForm()) { const firstErrorField = Object.keys(formErrors).find(key => formErrors[key]); if (firstErrorField) document.getElementsByName(firstErrorField)[0]?.focus(); return; }
    setIsProcessing(true);
    const orderPayload = { items: cart.map(item => ({ productId: item.product.id, productName: item.product.name, variantId: item.variant.id, variantName: item.variant.name, quantity: item.quantity, pricePerItem: item.product.price, lineTotal: item.product.price * item.quantity })), customerDetails: { ...formData }, paymentInfo: { cardNumber: formData.cardNumber, } };
    try {
        const response = await fetch(`${API_BASE_URL}/orders/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(orderPayload) });
        const result = await response.json();
        if (!response.ok) { throw new Error(result.message || `HTTP error! status: ${response.status}`); }
        setOrderProcessingOutcome({ orderNumber: result.orderNumber, transactionOutcome: result.orderDetails.transactionOutcome, customerDetails: result.orderDetails.customerDetails, items: result.orderDetails.items, orderTotal: result.orderDetails.orderTotal });
        if (result.orderDetails.transactionOutcome === 'approved') { clearCart(); }
        onNavigate('thankyou');
    } catch (err) { console.error("Checkout API error:", err); setApiError(err.message || "Failed to process order. Please try again."); } 
    finally { setIsProcessing(false); }
  };
  
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Secure Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg shadow h-fit order-last md:order-first">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Your Order ({totalItems} items)</h2>
          {cart.map(item => (
            <div key={item.lineItemId} className="flex items-start justify-between py-3 border-b border-gray-200 last:border-b-0 gap-3 text-sm">
              <div className="flex items-start gap-3">
                <img 
                  src={item.product.defaultImageUrl || item.product.imageUrls?.[0]} 
                  alt={item.product.name} 
                  className="w-12 h-12 rounded object-cover flex-shrink-0" 
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/48x48/CCCCCC/777777?text=Img"; }}
                />
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-gray-800 leading-tight">{item.product.name}</h3>
                  <p className="text-xs text-gray-500">{item.variant.name} &times; {item.quantity}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="font-medium text-gray-700">Rs {(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
          <div className="space-y-2 text-sm mt-4 pt-4 border-t">
            <div className="flex justify-between"><span>Subtotal:</span><span>Rs {cartSubtotal.toFixed(2)}</span></div>
            <div className="flex justify-between font-semibold text-lg text-indigo-600"><span>Total:</span><span>Rs {cartSubtotal.toFixed(2)}</span></div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="md:col-span-2 bg-white p-6 rounded-lg shadow"> {apiError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{apiError}</div>} <section className="mb-8"> <h2 className="text-xl font-semibold text-gray-700 mb-1 border-b pb-2">1. Contact Information</h2> <p className="text-sm text-gray-500 mb-4">We'll use this email for order updates.</p> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label> <IconInput icon={<Mail size={16}/>} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required /> {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>} </div> </section> <section className="mb-8"> <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">2. Shipping Address</h2> <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label> <IconInput icon={<User size={16}/>} name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required /> {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>} </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label> <IconInput icon={<Phone size={16}/>} type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="1234567890" required pattern="\d{10,15}" title="10-15 digit phone number"/> {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>} </div> <div className="sm:col-span-2"> <label className="block text-sm font-medium text-gray-700 mb-1">Address</label> <IconInput icon={<MapPin size={16}/>} name="address" value={formData.address} onChange={handleChange} placeholder="123 Main St, Apt 4B" required /> {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>} </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1">City</label> <input name="city" value={formData.city} onChange={handleChange} placeholder="Anytown" required className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/> {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>} </div> <div className="grid grid-cols-2 gap-4"> <div> <label className="block text-sm font-medium text-gray-700 mb-1">State</label> <input name="state" value={formData.state} onChange={handleChange} placeholder="CA" required className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/> {formErrors.state && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>} </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label> <input name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="90210" required pattern="\d{5,6}" title="5 or 6 digit zip code" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/> {formErrors.zipCode && <p className="text-red-500 text-xs mt-1">{formErrors.zipCode}</p>} </div> </div> </div> </section> <section> <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">3. Payment Details</h2> <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> <div className="sm:col-span-2"> <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label> <IconInput icon={<CreditCard size={16}/>} name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="•••• •••• •••• •••• or 1, 2, 3 for test" required title="16-digit card number or 1, 2, 3 for simulation"/> {formErrors.cardNumber && <p className="text-red-500 text-xs mt-1">{formErrors.cardNumber}</p>} <p className="text-xs text-gray-500 mt-1">Use card number ending in 1 (Approved), 2 (Declined), or 3 (Gateway Error) for simulation.</p> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (MM/YY)</label> <IconInput icon={<Calendar size={16}/>} name="expiryDate" value={formData.expiryDate} onChange={handleChange} placeholder="MM/YY" required pattern="(0[1-9]|1[0-2])\/\d{2}" title="MM/YY format, e.g., 03/25"/> {formErrors.expiryDate && <p className="text-red-500 text-xs mt-1">{formErrors.expiryDate}</p>} </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label> <IconInput icon={<Lock size={16}/>} name="cvv" value={formData.cvv} onChange={handleChange} placeholder="•••" required pattern="\d{3}" title="3-digit CVV" maxLength="3"/> {formErrors.cvv && <p className="text-red-500 text-xs mt-1">{formErrors.cvv}</p>} </div> </div> </section>
          <Button type="submit" disabled={isProcessing || cart.length === 0} className="mt-8 w-full" size="large"> {isProcessing ? ( <span className="flex items-center justify-center"> <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5"/> Processing... </span> ) : ( `Pay Rs ${cartSubtotal.toFixed(2)}` )} </Button>
        </form>
      </div>
      <Modal isOpen={showEmptyCartModal} onClose={() => {setShowEmptyCartModal(false); onNavigate('landing');}} title="Cart Empty"> <p>Your cart is empty. Please add some products before proceeding to checkout.</p> <Button onClick={() => {setShowEmptyCartModal(false); onNavigate('landing');}} className="mt-4 w-full">Back to Products</Button> </Modal>
    </div>
  );
};
export default CheckoutPage;