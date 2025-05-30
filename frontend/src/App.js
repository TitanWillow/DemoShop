import React, { useState } from 'react';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckOutPage';
import ThankYouPage from './pages/ThankYouPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); 
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigate = (page, clearSearch = false) => { 
    setCurrentPage(page); 
    if (clearSearch) {
      setSearchQuery('');
    }
  };
  const handleProductSelect = (productId) => { setSelectedProductId(productId); setCurrentPage('productDetail'); };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (currentPage !== 'landing') {
      setCurrentPage('landing');
    }
  };


  const renderPage = () => {
    switch (currentPage) {
      case 'landing': return <ProductListPage onNavigate={handleNavigate} onProductSelect={handleProductSelect} searchQuery={searchQuery} />;
      case 'productDetail': return <ProductDetailPage onNavigate={handleNavigate} productId={selectedProductId} onProductSelect={handleProductSelect} />;
      case 'cart': return <CartPage onNavigate={handleNavigate} />;
      case 'checkout': return <CheckoutPage onNavigate={handleNavigate} />;
      case 'thankyou': return <ThankYouPage onNavigate={handleNavigate} />;
      default: return <ProductListPage onNavigate={handleNavigate} onProductSelect={handleProductSelect} searchQuery={searchQuery} />;
    }
  };

  return (
    <OrderProvider>
      <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
        <Navbar onNavigate={handleNavigate} searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        <main className="py-8 md:py-12 flex-grow"> {renderPage()} </main>
        <Footer />
      </div>
    </OrderProvider>
  );
}
export default App;
