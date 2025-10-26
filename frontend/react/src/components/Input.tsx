import type {InputHTMLAttributes} from 'react';
import { theme } from '../styles/theme.ts';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export function Input({ label, error, id, ...props }: InputProps) {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
        <div style={{ marginBottom: theme.spacing.md }}>
            <label
                htmlFor={inputId}
                className="block text-sm font-medium mb-2"
                style={{ color: theme.colors.text }}
            >
                {label}
            </label>
            <input
                id={inputId}
                className={`w-full px-4 py-3 focus:outline-none focus:ring-2 transition-all ${
                    error ? 'border-2' : 'border'
                }`}
                style={{
                    background: theme.colors.cardBackground,
                    borderColor: error ? theme.colors.error : theme.colors.border,
                    borderRadius: theme.borderRadius.md,
                    color: theme.colors.text
                }}
                onFocus={(e) => {
                    if (!error) {
                        e.currentTarget.style.borderColor = theme.colors.primary;
                    }
                }}
                onBlur={(e) => {
                    if (!error) {
                        e.currentTarget.style.borderColor = theme.colors.border;
                    }
                }}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm" style={{ color: theme.colors.error }}>
                    {error}
                </p>
            )}
        </div>
    );
}