import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type {AuthContextType, User, LoginCredentials, RegisterCredentials} from '../types/auth.types.ts';
import { authService } from '../services/auth.service.ts';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const savedToken = authService.getToken();

            if (savedToken) {
                try {
                    const response = await authService.getCurrentUser(savedToken);
                    setUser(response.user);
                    setToken(savedToken);
                } catch (error) {
                    authService.removeToken();
                }
            }

            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        const response = await authService.login(credentials);
        setUser(response.user);
        setToken(response.token);
        authService.saveToken(response.token);
    };

    const register = async (credentials: RegisterCredentials) => {
        const response = await authService.register(credentials);
        setUser(response.user);
        setToken(response.token);
        authService.saveToken(response.token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        authService.removeToken();
    };

    const value: AuthContextType = {
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}