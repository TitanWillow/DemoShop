import { X } from 'lucide-react';
const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;
  const sizeClasses = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", xl: "max-w-xl" };
  return ( <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out" onClick={onClose}> <div className={`bg-white rounded-lg shadow-xl p-6 w-full ${sizeClasses[size]} transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow`} onClick={e => e.stopPropagation()}> <style>{` @keyframes modalShow { to { opacity: 1; transform: scale(1); } } `}</style> <div className="flex justify-between items-center mb-4"> <h3 className="text-xl font-semibold text-gray-800">{title}</h3> <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl leading-none p-1 rounded-full hover:bg-gray-100"><X size={20}/></button> </div> <div>{children}</div> </div> </div> );
};
export default Modal;