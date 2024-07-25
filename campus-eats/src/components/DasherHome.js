import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./css/DasherHome.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import DasherCompletedModal from "./DasherCompletedModal";

const DasherHome = () => {
    const { currentUser } = useAuth();
    const [isActive, setIsActive] = useState(false);
    const [activeOrder, setActiveOrder] = useState(null);
    const [shop, setShop] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [currentStatus, setCurrentStatus] = useState("");
    const [buttonClicked, setButtonClicked] = useState({
        toShop: false,
        preparing: false,
        pickedUp: false,
        onTheWay: false,
        delivered: false,
        completed: false
    });

    // highlight the current status based on the firebase status when loaded
    // if the status is active_toShop, highlight the toShop button


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersResponse = await fetch(`/api/orders-dasher/${currentUser.uid}`);
                
                if (!ordersResponse.ok) {
                    throw new Error("Failed to fetch orders");
                }
                
                const ordersData = await ordersResponse.json();
                
                const activeOrderHold = ordersData.activeOrders.length > 0 ? ordersData.activeOrders[0] : null;
                setActiveOrder(activeOrderHold);
                const ordersShopData = await Promise.all(
                    ordersData.orders.map(async (order) => {
                        const ordersShopDataResponse = await axios.get(`/api/shop/${order.uid}`);
                        const ordersShop = ordersShopDataResponse.data;
                        return { ...order, shopData: ordersShop }; // Renamed to userData for clarity
                    })
                );
                setOrders(ordersShopData);
                console.log(ordersShopData);

                

            
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchOrders();
    }, [currentUser.uid]);

    

    useEffect(() => {
        const fetchShopData = async () => {
            if (activeOrder && activeOrder.shopID) {
                setLoading(true);
                try {
                    const response = await axios.get(`/api/shop/${activeOrder.shopID}`);
                    const data = response.data;
                    setShop(data);
                } catch (error) {
                    console.error('Error fetching shop data:', error);
                }
                setLoading(false);
            }
        };
        console.log(activeOrder);
        // if(activeOrder && activeOrder.status === 'active_dasher_accepted') {
        //     console.log('dasehr_accepted', activeOrder);
        //     setCurrentStatus('toShop');
        //     setButtonClicked(prevState => ({
        //         ...prevState,
        //         toShop: true
        //     }));
        // }else 
        if (activeOrder && activeOrder.status) {
            setCurrentStatus(activeOrder.status.replace("active_", ""));
            setButtonClicked(prevState => ({
                ...prevState,
                [activeOrder.status.replace("active_", "")]: true
            }));
        }
        fetchShopData();
    }, [activeOrder]);

    const toggleButton = () => {
        setIsActive(!isActive);
    };

    

    const updateOrderStatus = async (newStatus) => {
        try {
            const response = await axios.post('/api/update-order-status', {
                orderId: activeOrder.id,
                status: `active_${newStatus}`
            });
            if (response.status === 200) {
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleStatusChange = (newStatus) => {
        if (newStatus === "completed") {
            setIsModalOpen(true);
        } else {
            if (
                (newStatus === "toShop" && !buttonClicked.toShop) ||
                (newStatus === "preparing" && buttonClicked.toShop && !buttonClicked.preparing) ||
                (newStatus === "pickedUp" && buttonClicked.preparing && !buttonClicked.pickedUp) ||
                (newStatus === "onTheWay" && buttonClicked.pickedUp && !buttonClicked.onTheWay) ||
                (newStatus === "delivered" && buttonClicked.onTheWay && !buttonClicked.delivered)
            ) {
                setCurrentStatus(newStatus);
        
                setButtonClicked(prevState => ({
                    ...prevState,
                    [newStatus]: true
                }));
        
                updateOrderStatus(newStatus);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="j-body">
                <div className="j-title">
                    <h2>Active Order</h2>
                </div>
                {activeOrder ? (
                <div className="j-content-current">
                    <div className="j-card-current j-card-large">
                        <div className="j-text">
                            <h2>Order Details</h2>
                            <div className="j-order-content">
                                <div className="j-order-img-holder">
                                    <img src={shop ? shop.shopImage : '/Assets/Panda.png'} alt="shop" className="j-order-img" />
                                </div>
                                <div className="j-order-details">
                                    <div className="j-order-text">
                                        <h3>{shop ? shop.shopName: 'No Shop Found'}</h3>
                                        <p>{shop ? shop.shopAddress: 'No Shop Found'}</p>
                                        <div className="j-order-subtext">
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
                            <div className="j-order-summary">
                                <h3>Order Summary</h3>
                                {activeOrder ? activeOrder.items.map((item, index) => (
                                    <div key={index} className="j-order-summary-item">
                                        <div className="j-order-summary-item-header">
                                            <p>{item.quantity}x</p>
                                            <p>{item.name}</p>
                                        </div>
                                        <p>₱{item.price.toFixed(2)}</p>
                                    </div>
                                )): ''}
                                <div className="j-order-summary-total-container">
                                    <div className="j-order-summary-subtotal">
                                        <h4>Subtotal</h4>
                                        <h4>₱{activeOrder ? activeOrder.totalPrice.toFixed(2): ''}</h4>
                                    </div>
                                    <div className="j-order-summary-subtotal">
                                        <h4>Delivery Fee</h4>
                                        <h4>₱{shop? shop.deliveryFee.toFixed(2): ''}</h4>
                                    </div>
                                    <div className="j-order-summary-total">
                                        <h4>Total </h4>
                                        <h4>₱{(activeOrder && shop)? (activeOrder.totalPrice + shop.deliveryFee).toFixed(2): ''}</h4>
                                    </div>
                                </div>
                                <div className="j-order-status-container">
                                    <p>Status</p>
                                    <div className="j-order-status-buttons">
                                        <button disabled={buttonClicked.toShop || currentStatus !== ""} className={`j-status-button toShop ${currentStatus === "toShop" ? "active": ""}`} onClick={() => handleStatusChange("toShop")}>
                                            On the way to the Shop {currentStatus === "toShop" && "✓"}
                                        </button>
                                        <button disabled={!buttonClicked.toShop || buttonClicked.preparing || currentStatus !== "toShop"} className={`j-status-button preparing ${currentStatus === "preparing" ? "active" : ""}`} onClick={() => handleStatusChange("preparing")}>
                                            Preparing {currentStatus === "preparing" && "✓"}
                                        </button>
                                        <button disabled={!buttonClicked.preparing || buttonClicked.pickedUp || currentStatus !== "preparing"} className={`j-status-button pickedUp ${currentStatus === "pickedUp" ? "active" : ""}`} onClick={() => handleStatusChange("pickedUp")}>
                                            Picked Up {currentStatus === "pickedUp" && "✓"}
                                        </button>
                                        <button disabled={!buttonClicked.pickedUp || buttonClicked.onTheWay || currentStatus !== "pickedUp"} className={`j-status-button onTheWay ${currentStatus === "onTheWay" ? "active" : ""}`} onClick={() => handleStatusChange("onTheWay")}>
                                            On the way {currentStatus === "onTheWay" && "✓"}
                                        </button>
                                        <button disabled={!buttonClicked.onTheWay || buttonClicked.delivered || currentStatus !== "onTheWay"} className={`j-status-button delivered ${currentStatus === "delivered" ? "active" : ""}`} onClick={() => handleStatusChange("delivered")}>
                                            Delivered {currentStatus === "delivered" && "✓"}
                                        </button>
                                        <button disabled={!buttonClicked.delivered || buttonClicked.completed || currentStatus !== "delivered"} className={`j-status-button completed ${currentStatus === "completed" ? "active" : ""}`} onClick={() => handleStatusChange("completed")}>
                                            Completed {currentStatus === "completed" && "✓"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ): (
                    <div>No active order...</div> 
                )}
                
                <div className="j-title">
                    <h2>Past Orders</h2>
                </div>
                {orders.length === 0 && <div className="j-no-orders">No past orders...</div>}
                <div className="j-content-past">
                    {orders.map((order, index) => (
                    <div className="j-card-past" key={index}>
                        <div className="j-past-img-holder">
                        <img src={order.shopData.shopImage ? order.shopData.shopImage : '/Assets/Panda.png'} alt="food" className="o-past-img"/>
                        </div>
                        <div className="j-past-details">
                            <div className="j-past-text">
                                <div className="j-past-total">
                                    <div className="j-past-title">
                                        <h3>{order.shopData.shopName}</h3>
                                        <p>{order.shopData.shopAddress}</p>
                                    </div>
                                    <h4>₱{order.totalPrice.toFixed(2)}</h4>
                                </div>
                                <div className="j-past-subtext">
                                    <div className="j-past-subtext-right">
                                    <p>Delivered on {order.createdAt ? new Date(order.createdAt._seconds * 1000).toLocaleDateString() : ''}</p>
                                        <p>Order #{order.id}</p>
                                        <p>{order.paymentMethod}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            {isModalOpen && (
                <DasherCompletedModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false) } shopData={shop} orderData={activeOrder}/>
            )}
        </>
    );
};

export default DasherHome;

