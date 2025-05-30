import { useState, createContext, useContext } from 'react';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderProcessingOutcome, setOrderProcessingOutcome] = useState(null);

  const addToCart = (product, variant, quantity) => {
    const productToAdd = {
        id: product.id, name: product.name, price: product.price,
        defaultImageUrl: product.defaultImageUrl, imageUrls: product.imageUrls,
    };
    const variantToAdd = {
        id: variant.id, name: variant.name, stock: variant.stock,
        color: variant.color, size: variant.size,
    };
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.product.id === productToAdd.id && item.variant.id === variantToAdd.id);
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        const newQuantity = updatedCart[existingItemIndex].quantity + quantity;
        if (newQuantity > variantToAdd.stock) {
            alert(`Cannot add more. Only ${variantToAdd.stock} of ${productToAdd.name} (${variantToAdd.name}) in stock. You have ${updatedCart[existingItemIndex].quantity} in cart.`);
            return prevCart;
        }
        updatedCart[existingItemIndex].quantity = newQuantity;
        return updatedCart;
      } else {
        return [...prevCart, { lineItemId: `${productToAdd.id}-${variantToAdd.id}-${Date.now()}`, product: productToAdd, variant: variantToAdd, quantity }];
      }
    });
  };

  const removeFromCart = (lineItemId) => setCart(prevCart => prevCart.filter(item => item.lineItemId !== lineItemId));
  const updateCartQuantity = (lineItemId, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.lineItemId === lineItemId) {
          if (newQuantity > item.variant.stock) {
            alert(`Cannot update. Only ${item.variant.stock} of ${item.product.name} (${item.variant.name}) in stock.`);
            return item;
          }
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      })
    );
  };
  const clearCart = () => { setCart([]); };
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <OrderContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateCartQuantity, clearCart, totalCartItems, 
      orderProcessingOutcome, setOrderProcessingOutcome 
    }}>
      {children}
    </OrderContext.Provider>
  );
};
export default OrderProvider;