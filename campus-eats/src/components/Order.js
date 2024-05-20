import React from "react";
import { useState, useEffect } from "react";
import "./css/Order.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faClock, faStar } from '@fortawesome/free-regular-svg-icons';
import Navbar from "./Navbar";

const Order = () => {
    const { currentUser } = useAuth();
    return (
        <>
         <Navbar />
        
         <div className="o-body">
            <div className="o-title">
                <h2>Active Order</h2>
            </div>
            <div className="o-content-current">
                <div className="o-card-current o-card-large">
                    <div className="o-text">
                        <h2>Order Details</h2>

                        <div className="o-order-content">
                            <div className="o-order-img-holder">
                                <img src='/Assets/Panda.png' alt="food" className="o-order-img"/>
                            </div>
                            <div className="o-order-details">

                                <div className="o-order-text">
                                        <h3>Jollibee ni Xianna</h3>
                                        <p>Skina 3rd Street</p>
                                    <div className="o-order-subtext">
                                        
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

                        <div className="o-order-summary">
                            <h3>Order Summary</h3>
                            <div className="o-order-summary-item">
                                <div className="o-order-summary-item-header">
                                    <p>1x</p>
                                    <p>Chickenjoy</p>
                                </div>
                                <p>P100.00</p>

                            </div>
                            <div className="o-order-summary-total-container">
                                <div className="o-order-summary-subtotal">
                                    <h4>Subtotal</h4>
                                    <h4>$3.00</h4>
                                </div>
                            
                                <div className="o-order-summary-subtotal">
                                    <h4>Delivery Fee</h4>
                                    <h4>$3.00</h4>
                                </div>

                                <div className="o-order-summary-total">
                                    <h4>Total </h4>
                                    <h4>$3.00</h4>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
                <div className="o-card-current o-card-small">
                    <div className="o-text">
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
                        <div className="o-subtext-current">
                            <h4>Order is being prepared</h4>
                        </div>
                    </div>
                    <img src='/Assets/active-img.png' alt="food" className="o-left-current-img"/>
                </div>
                

                
            </div>
            <div className="o-title">
                <h2>Past Orders</h2>
            </div>

            <div className="o-content-past">
                <div className="o-card-past">
                    <div className="o-past-img-holder">
                            <img src='/Assets/Panda.png' alt="food" className="o-past-img"/>
                        </div>
                        <div className="o-past-details">

                            <div className="o-past-text">
                                    <div className="o-past-total">
                                        <div className="o-past-title">
                                            <h3>Jollibee ni Xianna</h3>
                                            <p>Skina 3rd Street</p>
                                        </div>
                                        
                                        <h4>$3.00</h4>
                                    </div>
                                <div className="o-past-subtext">
                                    
                                    <p>Delivered on May 27, 2024</p> 
                                    <p>Order #asdfsf </p>
                                    <p>Cash on Delivery</p> 
                                </div>
                            </div>

                            
                                
                        </div>
                </div>
                <div className="o-card-past">
                    <div className="o-past-img-holder">
                            <img src='/Assets/Panda.png' alt="food" className="o-past-img"/>
                        </div>
                        <div className="o-past-details">

                            <div className="o-past-text">
                                    <div className="o-past-total">
                                        <div className="o-past-title">
                                            <h3>Jollibee ni Xianna</h3>
                                            <p>Skina 3rd Street</p>
                                        </div>
                                        
                                        <h4>$3.00</h4>
                                    </div>
                                <div className="o-past-subtext">
                                    
                                    <p>Delivered on May 27, 2024</p> 
                                    <p>Order #asdfsf </p>
                                    <p>Cash on Delivery</p> 
                                </div>
                            </div>

                            
                                
                        </div>
                </div>
                <div className="o-card-past">
                    <div className="o-past-img-holder">
                            <img src='/Assets/Panda.png' alt="food" className="o-past-img"/>
                        </div>
                        <div className="o-past-details">

                            <div className="o-past-text">
                                    <div className="o-past-total">
                                        <div className="o-past-title">
                                            <h3>Jollibee ni Xianna</h3>
                                            <p>Skina 3rd Street</p>
                                        </div>
                                        
                                        <h4>$3.00</h4>
                                    </div>
                                <div className="o-past-subtext">
                                    
                                    <p>Delivered on May 27, 2024</p> 
                                    <p>Order #asdfsf </p>
                                    <p>Cash on Delivery</p> 
                                </div>
                            </div>

                            
                                
                        </div>
                </div>
                <div className="o-card-past">
                    <div className="o-past-img-holder">
                            <img src='/Assets/Panda.png' alt="food" className="o-past-img"/>
                        </div>
                        <div className="o-past-details">

                            <div className="o-past-text">
                                    <div className="o-past-total">
                                        <div className="o-past-title">
                                            <h3>Jollibee ni Xianna</h3>
                                            <p>Skina 3rd Street</p>
                                        </div>
                                        
                                        <h4>$3.00</h4>
                                    </div>
                                <div className="o-past-subtext">
                                    
                                    <p>Delivered on May 27, 2024</p> 
                                    <p>Order #asdfsf </p>
                                    <p>Cash on Delivery</p> 
                                </div>
                            </div>

                            
                                
                        </div>
                </div>
                <div className="o-card-past">
                    <div className="o-past-img-holder">
                            <img src='/Assets/Panda.png' alt="food" className="o-past-img"/>
                        </div>
                        <div className="o-past-details">

                            <div className="o-past-text">
                                    <div className="o-past-total">
                                        <div className="o-past-title">
                                            <h3>Jollibee ni Xianna</h3>
                                            <p>Skina 3rd Street</p>
                                        </div>
                                        
                                        <h4>$3.00</h4>
                                    </div>
                                <div className="o-past-subtext">
                                    
                                    <p>Delivered on May 27, 2024</p> 
                                    <p>Order #asdfsf </p>
                                    <p>Cash on Delivery</p> 
                                </div>
                            </div>

                            
                                
                        </div>
                </div>
                
                
            </div>
        </div>

        </>
    )
}

export default Order;