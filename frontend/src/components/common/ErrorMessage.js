import Button from './Button';
import { AlertTriangle } from 'lucide-react';
const ErrorMessage = ({ message = "An error occurred.", onRetry }) => (
    <div className="flex flex-col items-center justify-center min-h-[200px] text-red-600 bg-red-50 p-6 rounded-lg">
        <AlertTriangle size={48} className="mb-4" />
        <p className="text-lg font-semibold mb-2">Oops! Something went wrong.</p>
        <p className="text-center mb-4">{message}</p>
        {onRetry && <Button onClick={onRetry} variant="danger" className="w-auto">Try Again</Button>}
    </div>
);
export default ErrorMessage;