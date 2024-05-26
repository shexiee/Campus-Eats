import React, { useEffect, useState } from "react";
import "./css/Shop.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Navbar from "./Navbar";
import AddToCartModal from "./AddToCartModal";

const ShopManage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [shop, setShop] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null); // Add state for selected item

    const fetchShop = async () => {
        try {
            const response = await fetch(`/api/shop/${currentUser.uid}`); // Assuming this is your endpoint for fetching a single shop
            if (!response.ok) {
                throw new Error('Failed to fetch shop');
            }
            const data = await response.json();
            setShop(data);
            console.log("shop", data);
        } catch (error) {
            console.error('Error fetching shop:', error);
        }
    };

    const fetchShopItems = async () => {
        try {
            const response = await fetch(`/api/shop/${currentUser.uid}/items`);
            if (!response.ok) {
                throw new Error('Failed to fetch shop items');
            }
            const data = await response.json();
            setItems(data);
            
        } catch (error) {
            console.error('Error fetching shop items:', error);
        }
    };

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        } else {
            fetchShop();
            fetchShopItems();
        }
    }, [currentUser]);

    if (!shop) {
        return <div>Loading...</div>;
    }

    const renderCategories = (categories) => {
        return Object.keys(categories).map((category) => (
            console.log(category),
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
                            <img src={shop.shopImage} alt="store" className="s-photo-image" />
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
                        <div className="sm-plus-icon" onClick={() => navigate(`/edit-shop`)}>
                                <FontAwesomeIcon icon={faPen} />
                        </div>
                    </div>
                    <div className="s-items-container">
                        <h2>Items</h2>
                        <div className="s-content">
                            {items.map(item => (
                                <div key={item.id} className="s-card">
                                    <div className="s-img">
                                        <img src={item.imageUrl || '/Assets/Panda.png'} className="s-image-cover" alt="store" />
                                    </div>
                                    <div className="s-text">
                                        <div className="s-subtext">
                                            <p className="s-h3">{item.name}</p>
                                            <p className="s-p">{item.description}</p>
                                        </div>
                                        <h3>₱{item.price.toFixed(2)}</h3>
                                        <div className="s-plus-icon"  onClick={() => navigate(`/edit-item/${item.id}`)}>
                                            <FontAwesomeIcon icon={faPen} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShopManage;
