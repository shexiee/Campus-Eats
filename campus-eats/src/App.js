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
import AdminIncomingOrder from './components/AdminIncomingOrder';
import AdminOrderHistory from './components/AdminOrderHistory';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import PublicRoute from './components/PublicRoute';
import AddItem from './components/AddItem';
import ShopRoute from './components/ShopRoute';
import Checkout from './components/Checkout';
import ShopManage from './components/ShopManage';
import UpdateItem from './components/UpdateItem';
import UpdateShop from './components/UpdateShop';
import AdminShopList from './components/AdminShopList';
import DasherRoute from './components/DasherRoute';
import DasherIncomingOrder from './components/DasherIncomingOrder';
import DasherHome from './components/DasherHome';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/forgot-password" element={<PublicRoute Component={ForgotPassword} />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/signup" element={<LoginSignUp />} />
          <Route path="/" element={<LandingPage/>} />
          <Route path="/orders" element={<PrivateRoute Component={Order} />} />
          <Route path="/home" element={<PrivateRoute Component={Home} />} />
          <Route path="/profile" element={<PrivateRoute Component={UserProfile} />} />
          <Route path="/shop/:shopId" element={<PrivateRoute Component={Shop} />} />
          
          <Route path="/shop-application" element={<PrivateRoute Component={ShopApplication} />} />
          <Route path="/dasher-application" element={<PrivateRoute Component={DasherApplication} />} />
          <Route path="/checkout/:uid/:shopId" element={<PrivateRoute Component={Checkout} />} />
          
          
        </Routes>

        <Routes>
          <Route path="/admin-dashers" element={<AdminRoute Component={AdminDasherList} />} />
          <Route path="/admin-shops" element={<AdminRoute Component={AdminShopList} />} />
          <Route path="/admin-dashboard" element={<AdminRoute Component={AdminDashboard} />} />
          <Route path="/admin-incoming-order" element={<AdminRoute Component={AdminIncomingOrder} />} />
          <Route path="/admin-order-history" element={<AdminRoute Component={AdminOrderHistory} />} />
        </Routes>

        <Routes>
          <Route path="/shop-add-item" element={<ShopRoute Component={AddItem} />} />
          <Route path="/shop-manage-item" element={<ShopRoute Component={ShopManage} />} />
          <Route path="/edit-shop" element={<ShopRoute Component={UpdateShop} />} />
          <Route path="/edit-item/:itemId" element={<ShopRoute Component={UpdateItem} />} />
        </Routes>

        <Routes>
          <Route path="/dasher-incoming-order" element={<DasherRoute Component={DasherIncomingOrder} />} />
          <Route path="/dasher-orders" element={<DasherRoute Component={DasherHome} />} />
        </Routes>
      </Router>
    </AuthProvider>
      
  );
}

export default App;
