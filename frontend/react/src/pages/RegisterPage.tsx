import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { theme } from '../styles/theme.ts';

export function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        try {
            await register({ name, email, password, username });
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed');
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
                        Create your account to get started
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
                        label="Full Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete="name"
                    />

                    <Input
                        label="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                    />

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
                        autoComplete="new-password"
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />

                    <Button type="submit" isLoading={isLoading}>
                        Create Account
                    </Button>

                    <div className="text-center text-sm mt-6">
                        <span style={{ color: theme.colors.textSecondary }}>Already have an account? </span>
                        <Link
                            to="/login"
                            className="font-medium transition-colors"
                            style={{ color: theme.colors.primary }}
                            onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.primaryHover}
                            onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.primary}
                        >
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}