import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoginSignUp from "./LoginSignUp";
import Home from "./Home";
import axios from 'axios';
import LandingPage from "./LandingPage";
import AdminDashboard from "./AdminDashboard";

const ShopRoute = ({ Component }) => {
  const { currentUser } = useAuth();
  const [accountType, setAccountType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const fetchUserRole = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/user-role/${currentUser.uid}`);
          setAccountType(response.data.accountType);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user role:', error);
          setLoading(false);
        }
      };
      
      fetchUserRole();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) {
    return <div>Checking permissions...</div>; // Or a loading spinner
  }

  if (!currentUser) {
    return <LoginSignUp />;
  }

  if (accountType === 'shop') {
    return <Component />;
  }

  if (accountType === 'regular') {
    return <Home />;
  }

  if (accountType === 'dasher') {
    // return <AdminDashboard />;
  }

  if (accountType === 'admin') {
    return <AdminDashboard />;
  }

  return <Home />;
};

export default ShopRoute;