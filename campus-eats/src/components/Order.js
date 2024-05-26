import React from "react";
import { useState, useEffect } from "react";
import "./css/Order.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faClock, faStar } from '@fortawesome/free-regular-svg-icons';
import Navbar from "./Navbar";
import ShopDetails from "./ShopDetails";

const Order = () => {
    const { currentUser } = useAuth();
    const [activeOrder, setActiveOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shop, setShop] = useState(null);
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersResponse = await fetch(`/api/orders/${currentUser.uid}`);
                
                if (!ordersResponse.ok) {
                    throw new Error("Failed to fetch orders");
                }
                
                const ordersData = await ordersResponse.json();
                
                const activeOrder = ordersData.activeOrders.length > 0 ? ordersData.activeOrders[0] : null;
                setActiveOrder(activeOrder);
                setOrders(ordersData.orders);
                
                if(activeOrder.status === 'active_waiting_for_admin' || activeOrder.status === 'active_waiting_for_dasher'){
                    setStatus('Order is being verified');
                } else if(activeOrder.status === 'active_preparing'){
                    setStatus('Order is being prepared');
                } else if(activeOrder.status === 'active_on_the_way'){
                    setStatus('Order is on the way');
                } else if(activeOrder.status === 'active_delivered'){
                    setStatus('Order has been delivered');
                }
                console.log("Active orders:", ordersData.activeOrders);
                console.log("All orders:", ordersData.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchOrders();
    }, [currentUser.uid]);

    useEffect(() => {
        setLoading(true);
        console.log('Active orasdfasdfder:', activeOrder);
        if(activeOrder){
            const fetchShopData = async () => {
                if (activeOrder.shopID) {
                    try {
                        const response = await fetch(`/api/shop/${activeOrder.shopID}`);
                        if (!response.ok) {
                            throw new Error('Failed to fetch shop data');
                        }
                        const data = await response.json();
                        setShop(data);
                        console.log('Shop data:', data);
                    } catch (error) {
                        console.error('Error fetching shop data:', error);
                    }
                }
            };
    
            fetchShopData();
        }
        
        setLoading(false);
    }, [activeOrder]);

    return (
        <>
         <Navbar />
        
         <div className="o-body">
            
            <div className="o-title">
                <h2>Active Order</h2>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : activeOrder ? (
            <div className="o-content-current">
                <div className="o-card-current o-card-large">
                    <div className="o-text">
                        <h2>Order Details</h2>

                        <div className="o-order-content">
                            <div className="o-order-img-holder">
                                <img src={shop? shop.shopImage: '/Assets/Panda.png'} alt="food" className="o-order-img"/>
                            </div>
                            <div className="o-order-details">

                                <div className="o-order-text">
                                        <h3>{shop ? shop.shopName: ''}</h3>
                                        <p>{shop ? shop.shopAddress: ''}</p>
                                    <div className="o-order-subtext">
                                        
                                        <p>Delivery Location</p> 
                                        <h4>{activeOrder ? activeOrder.deliverTo: ''}</h4>
                                        <p>Order number</p> 
                                        <h4>#{activeOrder ? activeOrder.id: ''}</h4>
                                        <p>Payment Method</p> 
                                        <h4>{activeOrder ? activeOrder.paymentMethod: ''}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="o-order-summary">
                            <h3>Order Summary</h3>
                            {activeOrder.items.map((item, index) => (
                                <div className="o-order-summary-item" key={index}>
                                    <div className="o-order-summary-item-header">
                                        <p>{item.quantity}x</p>
                                        <p>{item.name}</p>
                                    </div>
                                    <p>₱{item.price}</p>
                                </div>
                            ))}
                            <div className="o-order-summary-total-container">
                                <div className="o-order-summary-subtotal">
                                    <h4>Subtotal</h4>
                                    <h4>₱{activeOrder.totalPrice.toFixed(2)}</h4>
                                </div>
                                <div className="o-order-summary-subtotal">
                                    <h4>Delivery Fee</h4>
                                    <h4>₱{shop ? shop.deliveryFee.toFixed(2): ''}</h4>
                                </div>
                                <div className="o-order-summary-total">
                                    <h4>Total</h4>
                                    <h4>
                                    ₱{activeOrder.totalPrice && shop ? (activeOrder.totalPrice + shop.deliveryFee).toFixed(2) : ''}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="o-card-current o-card-small">
                    <div className="o-text">
                        <div className="loader">
                            <div className="circle">
                                <div className="dot"></div>
                                <div className="outline"></div>
                            </div>
                            <div className="circle">
                                <div className="dot"></div>
                                <div className="outline"></div>
                            </div>
                            <div className="circle">
                                <div className="dot"></div>
                                <div className="outline"></div>
                            </div>
                            <div className="circle">
                                <div className="dot"></div>
                                <div className="outline"></div>
                            </div>
                        </div>
                        <div className="o-subtext-current">
                            <h4>{status ? status : ''}</h4>
                        </div>
                    </div>
                    <img src='/Assets/active-img.png' alt="food" className="o-left-current-img"/>
                </div>
                

                
            </div>
            ) : (
                <p>No active orders found.</p>
            )}
            <div className="o-title">
                <h2>Past Orders</h2>
            </div>

            <div className="o-content-past">
                {orders.map((order, index) => (
                    <div className="o-card-past" key={index}>
                        <div className="o-past-img-holder">
                            <img src={order.shopImage ? order.shopImage : '/Assets/Panda.png'} alt="food" className="o-past-img"/>
                        </div>
                        <div className="o-past-details">
                            <div className="o-past-text">
                                <div className="o-past-total">
                                    <div className="o-past-title">
                                        <ShopDetails shopID={order.shopID} />
                                    </div>
                                    <h4>₱{order.totalPrice.toFixed(2)}</h4>
                                </div>
                                <div className="o-past-subtext">
                                    <p>Delivered on {order.deliveryDate}</p> 
                                    <p>Order #{order.id}</p>
                                    <p>{order.paymentMethod ==='cash' ? 'Cash On Delivery': 'GCASH'}</p> 
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        </>
    )
}

export default Order;