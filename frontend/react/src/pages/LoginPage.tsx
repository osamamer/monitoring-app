import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { theme } from '../styles/theme.ts';

export function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login({ email, password });
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{ background: theme.colors.background }}
        >
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    {/*<div className="text-6xl mb-4">⚛️</div>*/}
                    <h2 className="text-4xl font-bold mb-2" style={{ color: theme.colors.text }}>
                        Quantum Dashboard
                    </h2>
                    <p className="text-lg" style={{ color: theme.colors.textSecondary }}>
                        Sign in to access your quantum systems
                    </p>
                </div>

                <form
                    className="p-8 border border-gray-800"
                    style={{
                        background: theme.colors.backgroundSecondary,
                        borderRadius: theme.borderRadius.lg,
                        boxShadow: theme.shadows.card
                    }}
                    onSubmit={handleSubmit}
                >
                    {error && (
                        <div
                            className="mb-6 px-4 py-3 border"
                            style={{
                                background: `${theme.colors.error}1A`,
                                borderColor: theme.colors.error,
                                color: theme.colors.error,
                                borderRadius: theme.borderRadius.md
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <Input
                        label="Email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />

                    <Button type="submit" isLoading={isLoading}>
                        Sign in
                    </Button>

                    <div className="text-center text-sm mt-6">
                        <span style={{ color: theme.colors.textSecondary }}>Don't have an account? </span>
                        <Link
                            to="/register"
                            className="font-medium transition-colors"
                            style={{ color: theme.colors.primary }}
                            onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.primaryHover}
                            onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.primary}
                        >
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}