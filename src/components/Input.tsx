import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
        <input
          ref={ref}
          className={cn(
            'w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 transition-all focus:border-clinical-blue focus:outline-none focus:ring-2 focus:ring-clinical-blue/20 disabled:opacity-50',
            error && 'border-clinical-danger focus:ring-clinical-danger/20',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-clinical-danger">{error}</p>}
      </div>
    );
  }
);
