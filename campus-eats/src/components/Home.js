import React, { useState, useEffect } from "react";
import "./css/Home.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faClock, faStar } from '@fortawesome/free-regular-svg-icons';
import Navbar from "./Navbar";
 
const Home = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [shops, setShops] = useState([]);
 
    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        } else {
            fetchShops(); // Fetch shops when component mounts
        }
    }, [currentUser]);
 
    const fetchShops = async () => {
        console.log('Fetching shops...');
        try {
            const response = await fetch('/api/shops'); // Assuming this is your endpoint
            if (!response.ok) {
                throw new Error('Failed to fetch shops');
            }
            const data = await response.json();
            setShops(data);
            console.log('Shops fetched:', data);
        } catch (error) {
            console.error('Error fetching shops:', error);
        }
    };
 
    const getGreeting = () => {
        const hour = new Date().getHours();
        if(hour < 6){
            return "Good Midnight";
        }else if (hour < 12) {
            return "Good Morning";
        } else if (hour < 18) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    };
 
    const handleCardClick = (shopId) => {
        navigate(`/shop/${shopId}`);
    };
 
    return (
        <>
            <Navbar />
            <div className="h-body">
                <div className="h-title">
                    <h2>{getGreeting()}, {currentUser?.displayName}!</h2>
                    <p>Start Simplifying Your Campus Cravings!</p>
                </div>
                <div className="h-content">
                    {shops.map((shop, index) => (
                        console.log(shop),
                        <div key={index} className="h-card" onClick={() => handleCardClick(shop.shopId)}>
                            <div className="h-img">
                            <img src={shop.govId} className="h-image-cover" alt="store" />
                            </div>
                            <div className="h-text">
                                <p className="h-h3">{shop.shopName}</p>
                                <div className="h-subtext">
                                    <p className="h-p">{shop.category}</p>
                                </div>
                                <div className="h-subtext h-details">
                                    <FontAwesomeIcon className="h-svg2" icon={faClock} />
                                    <p className="h-p">{shop.deliveryFee}</p>
                                    <FontAwesomeIcon className="h-svg2" icon={faStar} />
                                    <p className="h-p">{shop.shopOpen}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
 
export default Home;