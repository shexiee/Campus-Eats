import React from "react";
import { useState, useEffect } from "react";
import "./css/CartModal.css";
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';


const CartModal = ({showModal, onClose}) => {

    return (
<div className={`cart-modal ${showModal ? 'show' : ''}`}>
    <div className="cm-modal">
        <div className="cm-modal-divider">
            <div className="cm-modal-header">
            <div className="cm-items">
                <div className="cm-store-item">
                <div className="cm-item-left">
                    <img src={'/Assets/store-location-icon.png'} alt="store loc" className="cm-image-store" />
                    <div className="cm-store-title">
                    <h4>Store Name</h4>
                    <p>Store Address</p>
                    </div>
                </div>
                <div className="cm-item-right">
                    <div className="cm-store-button">
                    <Button className="cm-store-btn">Change</Button>
                    </div>
                </div>
                </div>
            </div>
            <h3 className="cm-modal-title">Your Items</h3>
            </div>
            
            <div className="cm-modal-body">
                
                <div className="cm-items">
                    <div className="cm-item">
                        <div className="cm-item-left">
                            <img src={'/Assets/remove-icon.png'} alt="remove" className="cm-image-remove" />
                            <div className="cm-item-title">
                            <h4>Item Namesdfggsdfgsdfgdfg</h4>
                            <p>More Description</p>
                            </div>
                        </div>
                        <div className="cm-item-right">
                            <div className="cm-item-buttons">
                            <button className="cm-button">
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <span className="cm-item-count">1</span>
                            <button className="cm-button">
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            </div>
                        </div>
                    </div>
                    <div className="cm-item">
                        <div className="cm-item-left">
                            <img src={'/Assets/remove-icon.png'} alt="remove" className="cm-image-remove" />
                            <div className="cm-item-title">
                            <h4>Item LASTT</h4>
                            <p>More Description</p>
                            </div>
                        </div>
                        <div className="cm-item-right">
                            <div className="cm-item-buttons">
                            <button className="cm-button">
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <span className="cm-item-count">1</span>
                            <button className="cm-button">
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
        <div className="cm-modal-footer">
                <div className="cm-subtotal">
                    <h5>Subtotal</h5>
                    <h4>$0.00</h4>
                </div>
                <div className="cm-subtotal">
                    <h5>Delivery Fee</h5>
                    <h4>$0.00</h4>
                </div>
                <div className="cm-total">
                    <h5>Total</h5>
                    <h4>$0.00</h4>
                </div>
                <button className="cm-proceed-button">Proceed to Checkout</button>
        </div>
            
    </div>
</div>
    )
}

export default CartModal;