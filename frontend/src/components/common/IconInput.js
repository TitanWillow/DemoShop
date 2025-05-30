const IconInput = ({ icon, type = "text", placeholder, value, onChange, name, required = false, pattern, title, maxLength, minLength, className = "" }) => (
  <div className="relative">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
      {icon}
    </span>
    <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required={required} pattern={pattern} title={title} maxLength={maxLength} minLength={minLength}
      className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`} />
  </div>
);
export default IconInput;