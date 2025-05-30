import { useState, useEffect } from 'react';
import { useOrder } from '../context/OrderContext';
import ImageGallery from '../components/products/ImageGallery';
import RelatedProducts from '../components/products/RelatedProducts';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { AlertTriangle, ChevronLeft, ShoppingCart } from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ProductDetailPage = ({ onNavigate, productId, onProductSelect }) => {
  const { addToCart } = useOrder(); 
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [addError, setAddError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchProductDetails = async (id) => {
    setLoading(true); setError(null); setProduct(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) { const errorData = await response.json(); throw new Error(errorData.message || `HTTP error! status: ${response.status}`); }
      const data = await response.json(); 
      setProduct(data);
      if (data) {
        if (data.variantOptions && data.variantOptions.length > 0) {
          const initialOptions = {}; 
          data.variantOptions.forEach(optGroup => { 
            let foundInitial = false; 
            for (const opt of optGroup.options) { 
              if (data.variants.some(v => v[optGroup.type.toLowerCase()] === opt && v.stock > 0)) { 
                initialOptions[optGroup.type] = opt; 
                foundInitial = true; break; 
              } 
            } 
            if (!foundInitial && optGroup.options.length > 0) initialOptions[optGroup.type] = optGroup.options[0]; 
          }); 
          setSelectedOptions(initialOptions);
        } else if ((!data.variantOptions || data.variantOptions.length === 0) && data.variants && data.variants.length > 0) {
            setSelectedOptions({ simpleVariant: data.variants.find(v => v.stock > 0)?.id || data.variants[0]?.id });
        }
      }
      setQuantity(1); setAddError(''); setSuccessMessage('');
    } catch (e) { console.error("Failed to fetch product details:", e); setError(e.message); } 
    finally { setLoading(false); }
  };
  
  useEffect(() => {
      const fetchAll = async () => {
          try { const res = await fetch(`${API_BASE_URL}/products`); if(res.ok) setAllProducts(await res.json()); } 
          catch (e) { console.error("Failed to fetch all products for related items:", e); }
      };
      fetchAll();
  }, []);

  useEffect(() => { if (productId) { fetchProductDetails(productId); } window.scrollTo(0,0); }, [productId]);

  const findSelectedVariant = () => { 
    if (!product || !product.variants) return null; 
    if (product.variantOptions && product.variantOptions.length > 0) { 
      return product.variants.find(v => Object.entries(selectedOptions).every(([type, value]) => v[type.toLowerCase()] === value)); 
    } else if ((!product.variantOptions || product.variantOptions.length === 0) && product.variants.length > 0) {
      return product.variants.find(v => v.id === selectedOptions.simpleVariant); 
    } 
    return null; 
  };
  const selectedVariant = findSelectedVariant();
  const handleOptionChange = (optionType, value) => { setSelectedOptions(prev => ({ ...prev, [optionType]: value })); setAddError(''); setSuccessMessage(''); setQuantity(1); };
  
  const validateSelection = () => {
    setAddError(''); setSuccessMessage('');
    if (!product) { setAddError("Product data not loaded."); return false; }
    if (!selectedVariant) { setAddError("This combination of options is not available or not selected. Please try another selection."); return false; }
    if (quantity <= 0) { setAddError("Quantity must be at least 1."); return false; }
    if (selectedVariant.stock === 0) { setAddError(`${selectedVariant.name} is out of stock.`); return false; }
    if (selectedVariant.stock < quantity) { setAddError(`Only ${selectedVariant.stock} items in stock for ${selectedVariant.name}.`); return false; }
    return true;
  }

  const handleAddToCartClick = () => {
    if (!validateSelection()) return;
    addToCart(product, selectedVariant, quantity);
    setSuccessMessage(`${quantity} x ${product.name} (${selectedVariant.name}) added to cart!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleBuyNowClick = () => {
    if (!validateSelection()) return;
    addToCart(product, selectedVariant, quantity);
    onNavigate('checkout'); 
  };

  if (loading) return <LoadingSpinner text="Fetching Product Details..."/>;
  if (error) return <ErrorMessage message={`Failed to load product: ${error}`} onRetry={() => fetchProductDetails(productId)} />;
  if (!product) return <div className="text-center p-8">Product not found or an error occurred. <AlertTriangle className="inline-block ml-2" /></div>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Button onClick={() => onNavigate('landing')} variant="secondary" size="small" className="mb-6 w-auto inline-flex items-center"> <ChevronLeft size={18} className="mr-1"/> Back to Products </Button>
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="md:flex"> 
          <ImageGallery imageUrls={product.imageUrls} productName={product.name} /> 
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col"> 
            <h1 className="text-3xl font-bold text-gray-800 mb-1">{product.name}</h1> 
            <p className="text-gray-500 text-sm mb-4">{product.category}</p> 
            <p className="text-4xl font-semibold text-indigo-600 mb-6">Rs {product.price.toFixed(2)}</p> 
            
            {product.variantOptions && product.variantOptions.length > 0 && product.variantOptions.map(optGroup => ( <div key={optGroup.type} className="mb-4"> <label htmlFor={optGroup.type} className="block text-sm font-medium text-gray-700 mb-1">{optGroup.type}:</label> <select id={optGroup.type} value={selectedOptions[optGroup.type] || ''} onChange={(e) => handleOptionChange(optGroup.type, e.target.value)} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"> <option value="" disabled>Select {optGroup.type}</option> {optGroup.options.map(optValue => { const isGenerallyInStockForThisOption = product.variants.some(v => v[optGroup.type.toLowerCase()] === optValue && v.stock > 0); return ( <option key={optValue} value={optValue} disabled={!isGenerallyInStockForThisOption}> {optValue} {!isGenerallyInStockForThisOption ? ' (N/A or out of stock)' : ''} </option> ); })} </select> </div> ))} 
            {(!product.variantOptions || product.variantOptions.length === 0) && product.variants && product.variants.length > 0 && ( <div className="mb-4"> <label htmlFor="simpleVariant" className="block text-sm font-medium text-gray-700 mb-1">Style:</label> <select id="simpleVariant" value={selectedOptions.simpleVariant || ''} onChange={(e) => handleOptionChange('simpleVariant', e.target.value)} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"> <option value="" disabled>Select Style</option> {product.variants.map(v => (<option key={v.id} value={v.id} disabled={v.stock === 0}>{v.name} {v.stock === 0 ? '(Out of stock)' : ''}</option>))} </select> </div> )} 
            
            {selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock < 10 && (
              <p className="text-orange-600 text-sm mb-2 font-semibold">Hurry! Only {selectedVariant.stock} left in stock.</p>
            )}
            {selectedVariant && selectedVariant.stock === 0 && (
              <p className="text-red-600 text-sm mb-2 font-semibold">Out of stock for this selection.</p>
            )}

            <div className="mb-6"> <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label> <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value,10) || 1))} min="1" max={selectedVariant?.stock || 1} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" disabled={!selectedVariant || selectedVariant.stock === 0} /> </div> 
            
            {addError && <p className="text-red-500 text-sm mb-4 bg-red-100 p-3 rounded-md">{addError}</p>} 
            {successMessage && <p className="text-green-600 text-sm mb-4 bg-green-100 p-3 rounded-md">{successMessage}</p>} 
            
            <div className="mt-auto space-y-3">
              <Button onClick={handleAddToCartClick} disabled={!selectedVariant || selectedVariant.stock === 0 || quantity > (selectedVariant?.stock || 0)} className="w-full"> <ShoppingCart size={20} className="inline mr-2" /> Add to Cart </Button>
              <Button onClick={handleBuyNowClick} variant="success" disabled={!selectedVariant || selectedVariant.stock === 0 || quantity > (selectedVariant?.stock || 0)} className="w-full"> Buy Now </Button>
            </div>
          </div> 
        </div>
        <div className="p-6 md:p-8 border-t border-gray-200"> <h2 className="text-xl font-semibold text-gray-800 mb-3">Product Description</h2> <p className="text-gray-700 text-base leading-relaxed">{product.description}</p> </div>
      </div>
      {product.relatedProductIds && product.relatedProductIds.length > 0 && allProducts.length > 0 && <RelatedProducts currentProductId={product.id} productIds={product.relatedProductIds} onProductSelect={onProductSelect} allProducts={allProducts} /> }
    </div>
  );
};
export default ProductDetailPage;