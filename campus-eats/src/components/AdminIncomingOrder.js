import React, { useState } from "react";
import "./css/AdminOrders.css";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import DeclineOrderModal from './AdminDeclineOrderModal';

const AdminIncomingOrder = () => {
    const { currentUser } = useAuth();
    const [isAccordionOpen1, setIsAccordionOpen1] = useState(false);
    const [isAccordionOpen2, setIsAccordionOpen2] = useState(false);
    const [isAccordionOpen3, setIsAccordionOpen3] = useState(false);
    const [message1, setMessage1] = useState(""); 
    const [message2, setMessage2] = useState(""); 
    const [message3, setMessage3] = useState(""); 
    const [isProgressModalOpen, setIsProgressModalOpen] = useState(true); 
    const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false); 

    const toggleAccordion1 = () => {
        setIsAccordionOpen1(prevState => !prevState);
    };

    const toggleAccordion2 = () => {
        setIsAccordionOpen2(prevState => !prevState);
    };

    const toggleAccordion3 = () => {
        setIsAccordionOpen3(prevState => !prevState);
    };

    const handleMessageChange1 = (event) => {
        setMessage1(event.target.value);
    };

    const handleMessageChange2 = (event) => {
        setMessage2(event.target.value);
    };

    const handleMessageChange3 = (event) => {
        setMessage3(event.target.value);
    };

    const handleDeclineClick = (e) => {
        e.stopPropagation();
        setIsDeclineModalOpen(true); 
    };

    const closeModal = () => {
        setIsDeclineModalOpen(false);
    };

    const confirmDecline = () => {
        // Handle decline order logic here
        closeModal();
    };

    return (
        <>
            <Navbar />
            <div className="ao-body">
                <div className="ao-title">
                    <h2>Incoming Orders</h2>
                </div>
                <div className="ao-content-current">
                    <div className="ao-card-current ao-card-large">
                        <div className="ao-card-content" onClick={toggleAccordion1}>
                            <div className="ao-order-img-holder">
                                <img src='/Assets/Panda.png' alt="food" className="ao-order-img" />
                            </div>
                            <div className="ao-card-text">
                                <h3>Ericka Joyce Cagata</h3>
                                <p>Order #12345</p>
                            </div>
                            <div className="ao-buttons">
                                <button className="ao-decline" onClick={handleDeclineClick}>Decline</button>
                                <button className="ao-acceptorder" onClick={() => alert('Order Accepted')}>Accept Order</button>
                            </div>
                            <div className="ao-toggle-content">
                                <FontAwesomeIcon icon={faAngleDown} rotation={isAccordionOpen1 ? 180 : 0} />
                            </div>
                        </div>
                        {isAccordionOpen1 && (
                            <div className="ao-accordion">
                                <div className="message-box">
                                    <textarea
                                        value={message1}
                                        onChange={handleMessageChange1}
                                        className="message-input"
                                        placeholder="Enter your message here..."
                                    />
                                </div>
                                <div className="ao-location">
                                    <h4>Shop Name</h4>
                                    <p>Shop Address</p>
                                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">View in Maps</a>
                                </div>
                                <div className="ao-order-title">
                                    <h5>Item</h5>
                                    <h5>Total</h5>
                                </div>   
                                <div className="ao-order-summary">
                                    <div className="ao-order-summary-total-container">
                                        <div className="ao-subtotal">
                                            <h5>Sisig</h5>
                                            <h4>₱55.00</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Second Accordion */}
                <div className="ao-content-current">
                    <div className="ao-card-current ao-card-large">
                        <div className="ao-card-content" onClick={toggleAccordion2}>
                            <div className="ao-order-img-holder">
                                <img src='/Assets/Panda.png' alt="food" className="ao-order-img" />
                            </div>
                            <div className="ao-card-text">
                                <h3>Joshua Robert</h3>
                                <p>Order #12345</p>
                            </div>
                            <div className="ao-buttons">
                                <button className="ao-decline" onClick={handleDeclineClick}>Decline</button>
                                <button className="ao-acceptorder" onClick={() => alert('Order Accepted')}>Accept Order</button>
                            </div>
                            <div className="ao-toggle-content">
                                <FontAwesomeIcon icon={faAngleDown} rotation={isAccordionOpen2 ? 180 : 0} />
                            </div>
                        </div>
                        {isAccordionOpen2 && (
                            <div className="ao-accordion">
                                <div className="message-box">
                                    <textarea
                                        value={message2}
                                        onChange={handleMessageChange2}
                                        className="message-input"
                                        placeholder="Enter your message here..."
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Third Accordion */}
                <div className="ao-content-current">
                    <div className="ao-card-current ao-card-large">
                        <div className="ao-card-content" onClick={toggleAccordion3}>
                            <div className="ao-order-img-holder">
                                <img src='/Assets/Panda.png' alt="food" className="ao-order-img" />
                            </div>
                            <div className="ao-card-text">
                                <h3>Sherlyn Olalo</h3>
                                <p>Order #12345</p>
                            </div>
                            <div className="ao-buttons">
                                <button className="ao-decline" onClick={handleDeclineClick}>Decline</button>
                                <button className="ao-acceptorder" onClick={() => alert('Order Accepted')}>Accept Order</button>
                            </div>
                            <div className="ao-toggle-content">
                                <FontAwesomeIcon icon={faAngleDown} rotation={isAccordionOpen3 ? 180 : 0} />
                            </div>
                        </div>
                        {isAccordionOpen3 && (
                            <div className="ao-accordion">
                                <div className="message-box">
                                    <textarea
                                        value={message3}
                                        onChange={handleMessageChange3}
                                        className="message-input"
                                        placeholder="Enter your message here..."
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Progress Modal */}
                {isProgressModalOpen && (
                    <div className="ao-progress-modal">
                        <h3 className="ao-modal-title">Active Dashers</h3>
                        <div className="ao-modal-body">
                            <div className="ao-items">
                                <div className="ao-item">
                                    <div className="ao-item-left">
                                        <img src={'/Assets/Panda.png'} alt="" className="ao-panda-image" />
                                        <div className="ao-item-title">
                                            <h4>Butenator</h4>
                                            <p>More Description</p>
                                        </div>
                                    </div>
                                    <div className="cm-item-right">
                                
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Decline Order Modal */}
                <DeclineOrderModal 
                    isOpen={isDeclineModalOpen}
                    closeModal={closeModal}
                    confirmDecline={confirmDecline}
                />
            </div>
        </>
    );
}

export default AdminIncomingOrder;
