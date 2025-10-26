import type {ButtonHTMLAttributes, ReactNode} from 'react';
import { theme } from '../styles/theme.ts';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary';
    isLoading?: boolean;
}

export function Button({
                           children,
                           variant = 'primary',
                           isLoading = false,
                           disabled,
                           className = '',
                           ...props
                       }: ButtonProps) {
    const baseStyles = 'w-full py-3 px-4 font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105';

    const getBackgroundColor = () => {
        if (variant === 'primary') {
            return theme.colors.primary;
        }
        return theme.colors.border;
    };

    const getHoverColor = () => {
        if (variant === 'primary') {
            return theme.colors.primaryHover;
        }
        return '#1e2a6b';
    };

    return (
        <button
            className={`${baseStyles} ${className}`}
            style={{
                background: getBackgroundColor(),
                color: theme.colors.text,
                borderRadius: theme.borderRadius.md,
                opacity: disabled || isLoading ? 0.5 : 1,
                cursor: disabled || isLoading ? 'not-allowed' : 'pointer'
            }}
            disabled={disabled || isLoading}
            onMouseEnter={(e) => {
                if (!disabled && !isLoading) {
                    e.currentTarget.style.background = getHoverColor();
                }
            }}
            onMouseLeave={(e) => {
                if (!disabled && !isLoading) {
                    e.currentTarget.style.background = getBackgroundColor();
                }
            }}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center justify-center gap-2">
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Loading...
        </span>
            ) : children}
        </button>
    );
}