import { useState, useEffect } from 'react';
import { useOrder } from '../context/OrderContext';
import ProductCard from '../components/products/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/common/Button';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const ProductListPage = ({ onNavigate, onProductSelect, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useOrder(); 

  const fetchProducts = async () => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) { const errorData = await response.json(); throw new Error(errorData.message || `HTTP error! status: ${response.status}`); }
      const data = await response.json(); setProducts(data);
    } catch (e) { console.error("Failed to fetch products:", e); setError(e.message); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleQuickAddToCart = (product, variant, callback) => {
    addToCart(product, variant, 1);
    if (callback) callback();
  };

  const filteredProducts = products.filter(product => {
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query))
    );
  });

  if (loading) return <LoadingSpinner text="Fetching Products..."/>;
  if (error) return <ErrorMessage message={`Failed to load products: ${error}`} onRetry={fetchProducts} />;
  
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Explore Our Products</h1>
      {searchQuery && <p className="text-center text-gray-600 mb-6">Showing results for: "<strong>{searchQuery}</strong>"</p>}
      
      {filteredProducts.length === 0 && !loading && (
        <div className="text-center p-8">
            <p className="text-xl text-gray-500">
                {searchQuery ? `No products found matching "${searchQuery}".` : "No products available at the moment."}
            </p>
            {searchQuery && <Button onClick={() => onNavigate('landing', true)} variant="secondary" className="mt-4">Clear Search</Button>}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onNavigateToDetails={onProductSelect} onQuickAddToCart={handleQuickAddToCart} />
        ))}
      </div>
    </div>
  );
};
export default ProductListPage;