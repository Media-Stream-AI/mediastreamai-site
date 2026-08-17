// components/ui/Input.tsx
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm text-muted mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full rounded-xl bg-white/5 border border-hair px-4 py-3 text-mist placeholder:text-muted focus:outline-none focus:border-cyan/50 ${error ? 'border-error-red' : ''} ${className}`}
          {...props}
        />
        {error && (
          <p className="text-error-red text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
