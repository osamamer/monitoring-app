import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ComputerDetailPage from './pages/ComputerDetailPage';
import './index.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/computer/:id" element={<ComputerDetailPage />} />
            </Routes>
        </Router>
    );
}

export default App;