import { useOrder } from '../../context/OrderContext';
import Button from '../common/Button';
import { Package, Search, ShoppingCart} from 'lucide-react';
const Navbar = ({ onNavigate, searchQuery, onSearchChange }) => { 
  const { totalCartItems } = useOrder(); 
  return ( 
    <header className="bg-white shadow-md sticky top-0 z-40"> 
      <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center"> 
        <div className="text-2xl font-bold text-indigo-600 cursor-pointer flex items-center" onClick={() => onNavigate('landing')}> 
          <Package size={28} className="inline-block mr-2 align-middle" /> DemoShop 
        </div> 
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className="text-gray-400"/>
            </span>
            <input 
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={onSearchChange}
              className="w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
          <div className="relative"> 
            <Button onClick={() => onNavigate('cart')} variant="ghost" className="w-auto p-2" title="View Cart"> 
              <ShoppingCart size={24} className="text-gray-600 hover:text-indigo-600"/> 
              {totalCartItems > 0 && ( 
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center animate-pulse"> 
                  {totalCartItems} 
                </span> 
              )} 
            </Button> 
          </div> 
        </div> 
      </nav> 
    </header> 
  );
};
export default Navbar;