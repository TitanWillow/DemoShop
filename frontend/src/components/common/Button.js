
const Button = ({ children, onClick, type = "button", variant = "primary", disabled = false, className = "", size = "normal" }) => {
  const baseStyle = "font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out flex items-center justify-center";
  const sizeStyles = { normal: "py-2 px-4", small: "py-1 px-3 text-sm", large: "py-3 px-6 text-lg" };
  const variants = { 
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500", 
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-400", 
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500", 
    ghost: "bg-transparent hover:bg-gray-100 text-indigo-600 focus:ring-indigo-500", 
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-400", 
    success: "bg-green-500 hover:bg-green-600 text-white focus:ring-green-400"
  };
  const disabledStyle = "opacity-50 cursor-not-allowed";
  return ( <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${sizeStyles[size]} ${variants[variant]} ${disabled ? disabledStyle : ''} ${className}`}> {children} </button> );
};
export default Button;