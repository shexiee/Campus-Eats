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
        try {
            const response = await fetch('/api/shops'); // Assuming this is your endpoint
            if (!response.ok) {
                throw new Error('Failed to fetch shops');
            }
            const data = await response.json();
            setShops(data);
            console.log("shops", data.shopImage);

        } catch (error) {
            console.error('Error fetching shops:', error);
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 6) {
            return "Good Midnight";
        } else if (hour < 12) {
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

    const renderCategories = (categories) => {
        return categories.map((category, index) => (
            <p className="h-p" key={index}>{category}</p>
        ));
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
                        <div key={index} className="h-card" onClick={() => handleCardClick(shop.shopId)}>
                            <div className="h-img">
                                <img src={shop.shopImage} className="h-image-cover" alt="store" />
                            </div>
                            <div className="h-text">
                                <p className="h-h3">{shop.shopName}</p>
                                <p className="h-desc">{shop.shopDesc}</p>
                                <div className="h-category">
                                    {renderCategories(shop.categories)}
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