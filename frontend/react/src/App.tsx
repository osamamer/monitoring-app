import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import MainPage from './pages/MainPage';
import ComputerDetailPage from './pages/ComputerDetailPage';
import './index.css';
import {AuthProvider} from "./context/AuthContext.tsx";
import {RegisterPage} from "./pages/RegisterPage.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";

function App() {
    return (
        <Router>
            <AuthProvider>
                    <Routes>
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/" element={
                            <ProtectedRoute>
                                <MainPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/computer/:id" element={<ComputerDetailPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
            </AuthProvider>

        </Router>
    );
}

export default App;