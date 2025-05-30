import { useState } from 'react';
import Button from '../common/Button';
import { Eye, ShoppingCart } from 'lucide-react';
const ProductCard = ({ product, onNavigateToDetails, onQuickAddToCart }) => {
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    const firstAvailableVariant = product.variants.find(v => v.stock > 0);
    if (firstAvailableVariant) {
        onQuickAddToCart(product, firstAvailableVariant, () => {
            setShowAddedMessage(true);
            setTimeout(() => setShowAddedMessage(false), 2000);
        });
    } else {
        alert("This product is currently out of stock or requires option selection.");
    }
  };
  
  const hasComplexVariants = product.variantOptions && product.variantOptions.length > 0;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl group">
      <div className="relative overflow-hidden cursor-pointer h-48 flex justify-center items-center bg-gray-100" onClick={() => onNavigateToDetails(product.id)}>
        <img 
          src={product.defaultImageUrl || product.imageUrls?.[0] || 'https://placehold.co/400x300/CCCCCC/777777?text=No+Image'} 
          alt={product.name} 
          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/CCCCCC/777777?text=Error"; }}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate cursor-pointer" title={product.name} onClick={() => onNavigateToDetails(product.id)}>{product.name}</h3>
        <p className="text-indigo-600 font-bold text-xl mb-3">Rs {product.price?.toFixed(2)}</p>
        <p className="text-xs text-gray-500 mb-3">{product.category}</p>
        <div className="mt-auto space-y-2">
          {hasComplexVariants ? (
            <Button 
              onClick={() => onNavigateToDetails(product.id)} 
              variant="ghost"
              size="small" 
              className="w-full border border-indigo-500 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 focus:ring-indigo-300"
            > 
              <Eye size={16} className="mr-2"/> Choose Options 
            </Button>
          ) : (
            <Button onClick={handleQuickAdd} size="small" className="w-full"
              disabled={!product.variants || !product.variants.some(v => v.stock > 0) || showAddedMessage} >
              <ShoppingCart size={16} className="mr-2"/> {showAddedMessage ? "Added!" : "Add to Cart"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductCard;