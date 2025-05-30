import ProductCard from './ProductCard';
import { useOrder } from '../../context/OrderContext';
const RelatedProducts = ({ currentProductId, productIds, onProductSelect, allProducts }) => {
    const relatedProductsData = allProducts.filter(p => productIds?.includes(p.id) && p.id !== currentProductId);
    const { addToCart } = useOrder();


    if (!relatedProductsData || relatedProductsData.length === 0) return null;

    const handleQuickAddToCartForRelated = (product, variant, callback) => {
        addToCart(product, variant, 1);
        if (callback) callback();
    };

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {relatedProductsData.map(relProd => (
                    <ProductCard
                        key={relProd.id}
                        product={relProd}
                        onNavigateToDetails={onProductSelect}
                        onQuickAddToCart={handleQuickAddToCartForRelated}
                    />
                ))}
            </div>
        </div>
    );
};
export default RelatedProducts;