import { AlertTriangle } from 'lucide-react';
export default function ErrorState({ message, onRetry }) { return <div className="error-state"><AlertTriangle size={22}/><p>{message}</p>{onRetry && <button className="button button-secondary" onClick={onRetry}>Try again</button>}</div>; }
