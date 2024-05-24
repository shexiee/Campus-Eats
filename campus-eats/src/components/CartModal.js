import React, { useState, useEffect } from "react";
import "./css/CartModal.css";
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../context/AuthContext";
import { set } from "firebase/database";

const CartModal = ({ showModal, onClose }) => {
    const { currentUser } = useAuth();
    const [cartData, setCartData] = useState(null);
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await fetch(`/api/cart?uid=${currentUser.uid}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch cart data');
                }
                const data = await response.json();
                setCartData(data);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        if (showModal && currentUser) {
            fetchCartData();
            
        }
    }, [showModal, currentUser]);
    const handleItemDecrease = (item) => {
        
        const updatedItems = [...cartData.items];
        const itemIndex = updatedItems.findIndex((i) => i.id === item.id);
    
        if (itemIndex !== -1) {
            if (updatedItems[itemIndex].quantity > 1) {
                updatedItems[itemIndex].quantity--;
                updatedItems[itemIndex].price -= updatedItems[itemIndex].unitPrice;
                const updatedTotalPrice = cartData.totalPrice - updatedItems[itemIndex].unitPrice;
                setCartData({
                    ...cartData,
                    items: updatedItems,
                    totalPrice: updatedTotalPrice,
                });
            } else {
                handleItemRemove(item);
            }
        }
    };
    
    const handleItemIncrease = (item) => {
        const updatedItems = [...cartData.items];
        const itemIndex = updatedItems.findIndex((i) => i.id === item.id);
    
        if (itemIndex !== -1) {
            if (updatedItems[itemIndex].quantity < item.itemQuantity) { // Check if quantity is less than the limit
                updatedItems[itemIndex].quantity++;
                updatedItems[itemIndex].price += updatedItems[itemIndex].unitPrice;
                const updatedTotalPrice = cartData.totalPrice + updatedItems[itemIndex].unitPrice;
                setCartData({
                    ...cartData,
                    items: updatedItems,
                    totalPrice: updatedTotalPrice,
                });
            } else {
                // Handle case where the limit is reached
                // You can show a message to the user or disable the increase button
                alert(`Quantity limit reached for item: ${item.name}`);
            }
        }
    };
    
    const handleItemRemove = (item) => {
        if(window.confirm(`Are you sure you want to remove ${item.name} from your cart?`)) {
            const updatedItems = cartData.items.filter((i) => i.id !== item.id);
            const updatedTotalPrice = cartData.totalPrice - item.price * item.quantity;
            setCartData({
                ...cartData,
                items: updatedItems,
                totalPrice: updatedTotalPrice,
            });
        }
    };

    return (
        <div className={`cart-modal ${showModal ? 'show' : ''}`}>
            <div className="cm-modal">
                <div className="cm-modal-divider">
                    <div className="cm-modal-header">
                        {!cartData || cartData.items.length === 0 ? (
                            <>
                            <h3 className="cm-modal-title">Your cart is empty...</h3>
                            </>
                        ) : (
                            <>
                            <div className="cm-items">
                                <div className="cm-store-item">
                                    <div className="cm-item-left">
                                        <img src={'/Assets/store-location-icon.png'} alt="store loc" className="cm-image-store" />
                                        <div className="cm-store-title">
                                            <h4>{cartData ? cartData.shopName : 'Store Name'}</h4>
                                            <p>{cartData ? cartData.shopAddress : 'Store Address'}</p>
                                        </div>
                                    </div>
                                    <div className="cm-item-right">
                                        <div className="cm-store-button">
                                            <Button className="cm-store-btn">Remove</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="cm-modal-title">Your Items</h3>
                            </>
                        )}
                        
                        
                    </div>

                    <div className="cm-modal-body">
                        <div className="cm-items">
                            {cartData && cartData.items.map(item => (
                                <div className="cm-item" key={item.id}>
                                    <div className="cm-item-left">
                                        <div className="cm-item-buttons">
                                            <button className="cm-button" onClick={() => item.quantity > 1 ? handleItemDecrease(item) : handleItemRemove(item)}>
                                                {item.quantity > 1 && <FontAwesomeIcon icon={faMinus} />}
                                                {item.quantity <= 1 && <img src={'/Assets/remove-icon.png'} alt="remove" className="cm-image-remove" />}
                                            </button>
                                            <span className="cm-item-count">{item.quantity}</span>
                                            <button className="cm-button" onClick={() => handleItemIncrease(item)}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </div>
                                        <div className="cm-item-title">
                                            <h4>{item.name}</h4>
                                            <p>More Description</p>
                                        </div>
                                    </div>
                                    <div className="cm-item-right">
                                        <p>₱{item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="cm-modal-footer">
                    <div className="cm-subtotal">
                        <h5>Subtotal</h5>
                        <h4>₱{cartData ? cartData.totalPrice.toFixed(2) : '0.00'}</h4>
                    </div>
                    <div className="cm-subtotal">
                        <h5>Delivery Fee</h5>
                        <h4>₱{cartData ? cartData.shopDeliveryFee.toFixed(2) : '0.00'}</h4>
                    </div>
                    <div className="cm-total">
                        <h5>Total</h5>
                        <h4>₱{cartData ? (cartData.totalPrice+cartData.shopDeliveryFee).toFixed(2) : '0.00'}</h4>
                    </div>
                    <button disabled={!cartData || cartData.items.length === 0} className="cm-proceed-button">Proceed to Checkout</button>

                </div>
            </div>
        </div>
    );
}

export default CartModal;
