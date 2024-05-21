import React, { useEffect, useState } from "react";
import "./css/Shop.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Navbar from "./Navbar";
import AddToCartModal from "./AddToCartModal";

const Shop = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { shopId } = useParams(); // Get shopId from URL parameters
    const [shop, setShop] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchShop = async (shopId) => {
        try {
            const response = await fetch(`/api/shop/${shopId}`); // Assuming this is your endpoint for fetching a single shop
            if (!response.ok) {
                throw new Error('Failed to fetch shop');
            }
            const data = await response.json();
            setShop(data);
        } catch (error) {
            console.error('Error fetching shop:', error);
        }
    };

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        } else {
            fetchShop(shopId); // Fetch shop when component mounts
        }
    }, [currentUser, shopId]);

    const CloseShowModal = () => {
        setShowModal(false);
    }

    if (!shop) {
        return <div>Loading...</div>; // Show a loading state while fetching the shop
    }

    const renderCategories = (categories) => {
        return Object.keys(categories).map((category) => (
            <h4 key={category}>{category}</h4>
        ));
    };

    return (
        <>
            <Navbar />
            <div className="o-body">
                <div className="s-container">
                    <div className="s-title-container">
                        <div className="s-photo">
                            <img src={shop.govId} alt="store" className="s-photo-image" />
                        </div>
                        <div className="s-title">
                            <h2>{shop.shopName}</h2>
                            <p>{shop.shopAddress}</p>
                            <div className="s-title-subtext">
                                <p>Category</p>
                                {renderCategories(shop.categories)}
                                <p>Delivery Fee</p>
                                <h4>${shop.deliveryFee}</h4>
                                <p>Reviews</p>
                                <h4>4.7 (100+)</h4>
                            </div>
                        </div>
                    </div>
                    <div className="s-items-container">
                        <h2>Items</h2>
                        <div className="s-content">
                            <div className="s-card">
                                <div className="s-img">
                                    <img src={'/Assets/Panda.png'} className="s-image-cover" alt="store" />
                                </div>
                                <div className="s-text">
                                    <div className="s-subtext">
                                        <p className="s-h3">Jabe ni Xianna</p>
                                        <p className="s-p">Fried Chicken</p>
                                    </div>
                                    <h3>$10.00</h3>
                                    <div className="s-plus-icon" onClick={() => setShowModal(!showModal)}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showModal && <AddToCartModal showModal={showModal} onClose={CloseShowModal} />}
            </div>
        </>
    );
}

export default Shop;
