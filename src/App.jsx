import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import { PWAInstallPrompt } from './components/PWAInstallPrompt/PWAInstallPrompt';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <PWAInstallPrompt />
    </Router>
  );
}

export default App;
