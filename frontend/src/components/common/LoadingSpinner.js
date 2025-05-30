import { Loader2 } from 'lucide-react'; 
const LoadingSpinner = ({ text = "Loading..." }) => (
    <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-500">
        <Loader2 size={48} className="animate-spin text-indigo-600 mb-4" />
        <p className="text-lg">{text}</p>
    </div>
);
export default LoadingSpinner;