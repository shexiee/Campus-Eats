import './App.css';
import ForgotPassword from './components/ForgotPassword';
import LoginSignUp from './components/LoginSignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import Order from './components/Order';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/signup" element={<LoginSignUp />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
      
  );
}

export default App;
