import './App.css';
import ForgotPassword from './components/ForgotPassword';
import LoginSignUp from './components/LoginSignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import Order from './components/Order';
import LandingPage from './components/LandingPage';
import UserProfile from './components/UserProfile';
import Shop from './components/Shop';
import ShopApplication from './components/ShopApplication';
import DasherApplication from './components/DasherApplication';
import AdminDasherList from './components/AdminDasherList';
import AdminDashboard from './components/AdminDashboard';
import AdminShopList from './components/AdminShopList';
import AdminIncomingOrder from './components/AdminIncomingOrder';
import AdminOrderHistory from './components/AdminOrderHistory';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import PublicRoute from './components/PublicRoute';
import DeclineOrderModal from './components/AdminDeclineOrderModal';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/forgot-password" element={<PublicRoute Component={ForgotPassword} />} />
          <Route path="/login" element={<PublicRoute Component={LoginSignUp} />} />
          <Route path="/signup" element={<PublicRoute Component={LoginSignUp} />} />
          <Route path="/" element={<PublicRoute Component={LandingPage} />} />
          <Route path="/orders" element={<PrivateRoute Component={Order} />} />
          <Route path="/home" element={<PrivateRoute Component={Home} />} />
          <Route path="/profile" element={<PrivateRoute Component={UserProfile} />} />
          <Route path="/shop" element={<PrivateRoute Component={Shop} />} />
          <Route path="/shop-application" element={<PrivateRoute Component={ShopApplication} />} />
          <Route path="/dasher-application" element={<PrivateRoute Component={DasherApplication} />} />
          
          
        </Routes>

        <Routes>
          <Route path="/admin-dashers" element={<AdminRoute Component={AdminDasherList} />} />
          <Route path="/admin-dashboard" element={<AdminRoute Component={AdminDashboard} />} />
          <Route path="/admin-incoming-order" element={<AdminRoute Component={AdminIncomingOrder} />} />
          <Route path="/admin-order-history" element={<AdminRoute Component={AdminOrderHistory} />} />
          <Route path="/admin-shops" element={<AdminRoute Component={AdminShopList} />} />
        </Routes>
      </Router>
    </AuthProvider>
      
  );
}

export default App;
