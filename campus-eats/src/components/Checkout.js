import React from "react";
import { useState, useEffect } from "react";
import "./css/Checkout.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faClock, faStar } from '@fortawesome/free-regular-svg-icons';
import Navbar from "./Navbar";

const Checkout = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileNum, setMobileNum] = useState("");

    return (
        <>
         <Navbar />
        
         <div className="co-body">
            <div className="co-title">
                <h2>Checkout</h2>
            </div>
            <div className="co-content-current">
                <div className="co-card-current co-card-large">
                    <div className="co-text">
                        <h2>Contact Details</h2>

                        <div className="sa-two">
                            <div className="sa-field-two">
                                <div className="sa-label-two">
                                <h3>Firstname</h3>
                                <input
                                    type="text"
                                    className="first-name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                                </div>
                            </div>
                            <div className="sa-field-two">
                                <div className="sa-label-two">
                                <h3>Lastname</h3>
                                <input
                                    type="text"
                                    className="last-name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                                </div>
                            </div>
                        </div>
                        <div className="co-field-two">
                            <div className="sa-label-two">
                                <h3>Mobile Number</h3>
                                <div className="gcash-input-container">
                                    <span className="gcash-prefix">+63 </span>
                                    <input
                                    type="number"
                                    className="gcash-num"
                                    value={mobileNum}
                                    onChange={(e) => setMobileNum(e.target.value)}
                                    required
                                    />
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>

                
                <div className="co-card-current co-card-small">
                    <div className="co-order-summary">
                        <h3>Order Summary</h3>
                        <div className="co-order-summary-item">
                            <div className="co-order-summary-item-header">
                                <p>1x</p>
                                <p>Chickenjoy</p>
                            </div>
                            <p>P100.00</p>

                        </div>
                        <div className="co-order-summary-total-container">
                            <div className="co-order-summary-subtotal">
                                <h4>Subtotal</h4>
                                <h4>$3.00</h4>
                            </div>
                        
                            <div className="co-order-summary-subtotal">
                                <h4>Delivery Fee</h4>
                                <h4>$3.00</h4>
                            </div>

                            <div className="co-order-summary-total">
                                <h4>Total </h4>
                                <h4>$3.00</h4>
                            </div>
                        
                        </div>
                    </div>
                </div>
                

                
            </div>
            
                
                
        </div>

        </>
    )
}

export default Checkout;