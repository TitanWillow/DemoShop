import { useState, useEffect } from 'react';
import { useOrder } from '../context/OrderContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/common/Button';
import { CheckCircle2, AlertTriangle, ServerCrash, ShoppingCart} from 'lucide-react'; 

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const ThankYouPage = ({ onNavigate }) => {
  const { orderProcessingOutcome, setOrderProcessingOutcome } = useOrder(); 
  const [orderDetails, setOrderDetails] = useState(orderProcessingOutcome);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const doFetchOrder = async (orderNum) => {
      setLoading(true); setError(null);
      try {
          const response = await fetch(`${API_BASE_URL}/orders/${orderNum}`);
          if (!response.ok) { const errData = await response.json(); throw new Error(errData.message || `HTTP error! Status: ${response.status}`); }
          const data = await response.json(); setOrderDetails(data); 
          setOrderProcessingOutcome(null);
      } catch (err) { 
          console.error("Failed to fetch order details:", err); 
          setError(err.message); 
          if (!orderProcessingOutcome) setOrderDetails(null); 
      } 
      finally { setLoading(false); }
  };

  useEffect(() => {
    if (orderProcessingOutcome && orderProcessingOutcome.orderNumber) { 
        doFetchOrder(orderProcessingOutcome.orderNumber); 
    } else if (orderProcessingOutcome) { 
        setOrderDetails(orderProcessingOutcome); 
        setLoading(false); 
        setOrderProcessingOutcome(null);
    } else { 
        setError("No order information available."); 
        setLoading(false); 
    }
  // eslint-disable-next-line
  }, [orderProcessingOutcome, setOrderProcessingOutcome, onNavigate]);

  if (loading) return <LoadingSpinner text="Loading Order Confirmation..."/>;
  if (error && !orderDetails) return <ErrorMessage message={error} onRetry={() => orderProcessingOutcome?.orderNumber && doFetchOrder(orderProcessingOutcome.orderNumber)} />;
  if (!orderDetails) return <div className="text-center p-8">No order information to display. <Button onClick={()=>onNavigate('landing')} className="mt-2">Go Home</Button></div>;

  const { items, customerDetails, transactionOutcome, orderNumber, orderTotal } = orderDetails;
  let statusIcon, statusMessage, statusColor;
  switch (transactionOutcome) { case 'approved': statusIcon = <CheckCircle2 size={64} className="text-green-500" />; statusMessage = "Your order has been successfully placed!"; statusColor = "text-green-600"; break; case 'declined': statusIcon = <AlertTriangle size={64} className="text-red-500" />; statusMessage = "Your transaction was declined."; statusColor = "text-red-600"; break; case 'gateway_error': statusIcon = <ServerCrash size={64} className="text-yellow-500" />; statusMessage = "There was a gateway error with your transaction."; statusColor = "text-yellow-600"; break; default: statusIcon = <AlertTriangle size={64} className="text-gray-500" />; statusMessage = `Order status: ${transactionOutcome || 'Unknown'}.`; statusColor = "text-gray-600"; }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <div className="bg-white shadow-xl rounded-lg p-6 md:p-10 text-center">
        <div className="mb-6 flex justify-center">{statusIcon}</div> <h1 className={`text-3xl font-bold ${statusColor} mb-3`}>{statusMessage}</h1> {transactionOutcome === 'approved' && orderNumber && ( <p className="text-lg text-gray-700 mb-6">Your Order Number: <span className="font-semibold text-indigo-600">{orderNumber}</span></p> )}
        {items && items.length > 0 && ( <div className="text-left bg-gray-50 p-6 rounded-lg mb-8"> <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Order Summary</h2> {items.map(item => ( <div key={item.productId + (item.variantId || '')} className="flex items-center mb-3 text-sm py-2 border-b border-gray-200 last:border-b-0"> <img src={item.product?.defaultImageUrl || item.product?.imageUrls?.[0] || 'https://placehold.co/48x48/CCCCCC/777777?text=Img'} alt={item.productName} className="w-12 h-12 rounded object-cover mr-3" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/48x48/CCCCCC/777777?text=Img"; }}/> <div className="flex-grow"> <h3 className="font-medium text-gray-800">{item.productName}</h3> <p className="text-xs text-gray-500">{item.variantName} &times; {item.quantity}</p> </div> <span className="font-medium text-gray-700">Rs {item.lineTotal?.toFixed(2)}</span> </div> ))} <p className="text-right font-semibold text-lg mt-4">Total: Rs {orderTotal?.toFixed(2)}</p> </div> )}
        {customerDetails && ( <div className="text-left bg-gray-50 p-6 rounded-lg mb-8"> <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Customer Details</h2> <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm"> <p><span className="font-medium">Name:</span> {customerDetails.fullName}</p> <p><span className="font-medium">Email:</span> {customerDetails.email}</p> <p><span className="font-medium">Phone:</span> {customerDetails.phone}</p> <p><span className="font-medium">Address:</span> {customerDetails.address}, {customerDetails.city}, {customerDetails.state} {customerDetails.zipCode}</p> </div> </div> )}
        <p className="text-sm text-gray-500 mb-6"> {transactionOutcome === 'approved' ? "A confirmation email with your order details has been sent (simulated by backend)." : "An email regarding this transaction attempt has been sent (simulated by backend)."} </p>
        <Button onClick={() => onNavigate('landing')} className="w-auto"> <ShoppingCart size={20} className="inline mr-2" /> Continue Shopping </Button>
      </div>
    </div>
  );
};
export default ThankYouPage;