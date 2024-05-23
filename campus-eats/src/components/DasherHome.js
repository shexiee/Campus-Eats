import React from "react";
import { useState, useEffect } from "react";
import "./css/DasherHome.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faClock, faStar } from '@fortawesome/free-regular-svg-icons';
import Navbar from "./Navbar";

const DasherHome = () => {
    const { currentUser } = useAuth();
    const [isActive, setIsActive] = useState(false);

    const toggleButton = () => {
        setIsActive(!isActive);
    };

    const navigate = useNavigate();

    const [currentStatus, setCurrentStatus] = useState(""); 
    const [buttonClicked, setButtonClicked] = useState({
        preparing: false,
        onTheWay: false,
        arrived: false,
        delivered: false
    });

    const handleStatusChange = (newStatus) => {
        
        if (
            (newStatus === "preparing" && !buttonClicked.preparing) ||
            (newStatus === "onTheWay" && buttonClicked.preparing && !buttonClicked.onTheWay) ||
            (newStatus === "arrived" && buttonClicked.onTheWay && !buttonClicked.arrived) ||
            (newStatus === "delivered" && buttonClicked.arrived && !buttonClicked.delivered)
        ) {
            setCurrentStatus(newStatus);
            
            setButtonClicked(prevState => ({
                ...prevState,
                [newStatus]: true
            }));
        }
    };



    return (
        <>
         <Navbar />
        
         <div className="j-body">
            <div className="j-title">
                <h2>Active Order</h2>
            </div>
            <div className="j-content-current">
                <div className="j-card-current j-card-large">
                    <div className="j-text">
                        <h2>Order Details</h2>

                        <div className="j-order-content">
                            <div className="j-order-img-holder">
                                <img src='/Assets/Panda.png' alt="food" className="j-order-img"/>
                            </div>
                            <div className="j-order-details">

                                <div className="j-order-text">
                                        <h3>Jollibee ni Xianna</h3>
                                        <p>Skina 3rd Street</p>
                                    <div className="j-order-subtext">
                                        
                                        <p>Delivery Location</p> 
                                        <h4>Room RTL200</h4>
                                        <p>Order number</p> 
                                        <h4>#asdfsf</h4>
                                        <p>Payment Method</p> 
                                        <h4>Cash On Delivery</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="j-order-summary">
                            <h3>Order Summary</h3>
                            <div className="j-order-summary-item">
                                <div className="j-order-summary-item-header">
                                    <p>1x</p>
                                    <p>Chickenjoy</p>
                                </div>
                                <p>P100.00</p>

                            </div>
                            <div className="j-order-summary-total-container">
                                <div className="j-order-summary-subtotal">
                                    <h4>Subtotal</h4>
                                    <h4>$3.00</h4>
                                </div>
                            
                                <div className="j-order-summary-subtotal">
                                    <h4>Delivery Fee</h4>
                                    <h4>$3.00</h4>
                                </div>

                                <div className="j-order-summary-total">
                                    <h4>Total </h4>
                                    <h4>$3.00</h4>
                                </div>
                            </div>

                            <div className="j-order-status-container">
                                <p>Status</p>
                                <div className="j-order-status-buttons">
                                <button disabled={buttonClicked.preparing || currentStatus !== ""} className={`j-status-button preparing ${currentStatus === "preparing" ? "active" : ""}`} onClick={() => handleStatusChange("preparing")}>Preparing {currentStatus === "preparing" && "✓"}</button>
                        <button disabled={!buttonClicked.preparing || buttonClicked.onTheWay || currentStatus !== "preparing"} className={`j-status-button on-the-way ${currentStatus === "onTheWay" ? "active" : ""}`} onClick={() => handleStatusChange("onTheWay")}>On the way {currentStatus === "onTheWay" && "✓"}</button>
                        <button disabled={!buttonClicked.onTheWay || buttonClicked.arrived || currentStatus !== "onTheWay"} className={`j-status-button arrived ${currentStatus === "arrived" ? "active" : ""}`} onClick={() => handleStatusChange("arrived")}>Arrived {currentStatus === "arrived" && "✓"}</button>
                        <button disabled={!buttonClicked.arrived || buttonClicked.delivered || currentStatus !== "arrived"} className={`j-status-button delivered ${currentStatus === "delivered" ? "active" : ""}`} onClick={() => handleStatusChange("delivered")}>Delivered {currentStatus === "delivered" && "✓"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="j-card-current j-card-small">
                    <div className="j-text">
                        <p>Arriving in</p>
                        <h2>5 — 10 mins</h2>
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
                        <div className="j-subtext-current">
                            <h4>Order is being prepared</h4>
                        </div>
                    </div>
                    <img src='/Assets/active-img.png' alt="food" className="j-left-current-img"/>
                </div>
            </div>
            <div className="j-title">
                <h2>Past Orders</h2>
            </div>

            <div className="j-content-past">
                <div className="j-card-past">
                    <div className="j-past-img-holder">
                            <img src='/Assets/Panda.png' alt="food" className="j-past-img"/>
                        </div>
                        <div className="j-past-details">

                            <div className="j-past-text">
                                    <div className="j-past-total">
                                        <div className="j-past-title">
                                            <h3>Jollibee ni Xianna</h3>
                                            <p>Skina 3rd Street</p>
                                        </div>
                                        
                                        <h4>$3.00</h4>
                                    </div>
                                <div className="j-past-subtext">
                                    <div className="j-past-subtext-right">
                                        <p>Delivered on May 27, 2024</p> 
                                        <p>Order #asdfsf </p>
                                        <p>Cash on Delivery</p> 
                                    </div>                                        
                                    <div className="j-active-buton">
                                        <button onClick={toggleButton} className={isActive ? 'button-active' : 'button-inactive'}>
                                        
                                        </button>
                                        <div className="j-button-text">
                                        {isActive ? 'Active' : 'Not Active'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="j-card-past">
                    <div className="j-past-img-holder">
                            <img src='/Assets/Panda.png' alt="food" className="j-past-img"/>
                        </div>
                        <div className="j-past-details">

                            <div className="j-past-text">
                                    <div className="j-past-total">
                                        <div className="j-past-title">
                                            <h3>Jollibee ni Xianna</h3>
                                            <p>Skina 3rd Street</p>
                                        </div>
                                        
                                        <h4>$3.00</h4>
                                    </div>
                                <div className="j-past-subtext">
                                <div className="j-past-subtext-right">
                                        <p>Delivered on May 27, 2024</p> 
                                        <p>Order #asdfsf </p>
                                        <p>Cash on Delivery</p> 
                                    </div>                                        
                                    <div className="j-active-buton">
                                        <button onClick={toggleButton} className={isActive ? 'button-active' : 'button-inactive'}>
                                        
                                        </button>
                                        <div className="j-button-text">
                                        {isActive ? 'Active' : 'Not Active'}
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                </div>
                <div className="j-card-past">
                    <div className="j-past-img-holder">
                            <img src='/Assets/Panda.png' alt="food" className="j-past-img"/>
                        </div>
                        <div className="j-past-details">

                            <div className="j-past-text">
                                    <div className="j-past-total">
                                        <div className="j-past-title">
                                            <h3>Jollibee ni Xianna</h3>
                                            <p>Skina 3rd Street</p>
                                        </div>
                                        
                                        <h4>$3.00</h4>
                                    </div>
                                <div className="j-past-subtext">
                                <div className="j-past-subtext-right">
                                        <p>Delivered on May 27, 2024</p> 
                                        <p>Order #asdfsf </p>
                                        <p>Cash on Delivery</p> 
                                    </div>                                        
                                    <div className="j-active-buton">
                                        <button onClick={toggleButton} className={isActive ? 'button-active' : 'button-inactive'}>
                                        
                                        </button>
                                        <div className="j-button-text">
                                        {isActive ? 'Active' : 'Not Active'}
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                </div>
                <div className="j-card-past">
                    <div className="j-past-img-holder">
                            <img src='/Assets/Panda.png' alt="food" className="j-past-img"/>
                        </div>
                        <div className="j-past-details">

                            <div className="j-past-text">
                                    <div className="j-past-total">
                                        <div className="j-past-title">
                                            <h3>Jollibee ni Xianna</h3>
                                            <p>Skina 3rd Street</p>
                                        </div>
                                        
                                        <h4>$3.00</h4>
                                    </div>
                                <div className="j-past-subtext">
                                <div className="j-past-subtext-right">
                                        <p>Delivered on May 27, 2024</p> 
                                        <p>Order #asdfsf </p>
                                        <p>Cash on Delivery</p> 
                                    </div>                                        
                                    <div className="j-active-buton">
                                        <button onClick={toggleButton} className={isActive ? 'button-active' : 'button-inactive'}>
                                        
                                        </button>
                                        <div className="j-button-text">
                                        {isActive ? 'Active' : 'Not Active'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="j-card-past">
                    <div className="j-past-img-holder">
                            <img src='/Assets/Panda.png' alt="food" className="j-past-img"/>
                        </div>
                        <div className="j-past-details">

                            <div className="j-past-text">
                                    <div className="j-past-total">
                                        <div className="j-past-title">
                                            <h3>Jollibee ni Xianna</h3>
                                            <p>Skina 3rd Street</p>
                                        </div>
                                        
                                        <h4>$3.00</h4>
                                    </div>
                                <div className="j-past-subtext">
                                <div className="j-past-subtext-right">
                                        <p>Delivered on May 27, 2024</p> 
                                        <p>Order #asdfsf </p>
                                        <p>Cash on Delivery</p> 
                                    </div>                                        
                                    <div className="j-active-buton">
                                        <button onClick={toggleButton} className={isActive ? 'button-active' : 'button-inactive'}>
                                        
                                        </button>
                                        <div className="j-button-text">
                                        {isActive ? 'Active' : 'Not Active'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="j-card-past">
                    <div className="j-past-img-holder">
                            <img src='/Assets/Panda.png' alt="food" className="j-past-img"/>
                        </div>
                        <div className="j-past-details">

                            <div className="j-past-text">
                                    <div className="j-past-total">
                                        <div className="j-past-title">
                                            <h3>Jollibee ni Xianna</h3>
                                            <p>Skina 3rd Street</p>
                                        </div>
                                        
                                        <h4>$3.00</h4>
                                    </div>
                                <div className="j-past-subtext">
                                    <div className="j-past-subtext-right">
                                        <p>Delivered on May 27, 2024</p> 
                                        <p>Order #asdfsf </p>
                                        <p>Cash on Delivery</p> 
                                    </div>                                        
                                    <div className="j-active-buton">
                                        <button onClick={toggleButton} className={isActive ? 'button-active' : 'button-inactive'}>
                                        
                                        </button>
                                        <div className="j-button-text">
                                        {isActive ? 'Active' : 'Not Active'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
         </div>
        </>
    )
}

export default DasherHome;
