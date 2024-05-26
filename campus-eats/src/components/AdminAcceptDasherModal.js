import React, { useState } from "react";
import "./css/AdminAcceptDasherModal.css";

const AdminAcceptDasherModal = ({ isOpen, closeModal, confirmAccept }) => {
    const [deliveryFee, setDeliveryFee] = useState(""); // State to manage delivery fee input
    const [addressLink, setAddressLink] = useState(""); // State to manage address link input

    if (!isOpen) return null;

    return (
        <div className="aadm-modal-overlay">
            <div className="aadm-modal-content">
                <button className="aadm-close" onClick={closeModal}>X</button>
                <h2></h2>
                <div className="aadm-input-container">
                    <label htmlFor="deliveryFee">Delivery Fee:</label>
                    <input
                        type="text"
                        id="deliveryFee"
                        value={deliveryFee}
                        onChange={(e) => setDeliveryFee(e.target.value)}
                    />
                </div>
                <div className="aadm-input-container">
                    <label htmlFor="addressLink">Address Link:</label>
                    <input
                        type="text"
                        id="addressLink"
                        value={addressLink}
                        onChange={(e) => setAddressLink(e.target.value)}
                    />
                </div>
                <div className="aadm-modal-buttons">
                    <button className="aadm-cancel" onClick={closeModal}>Cancel</button>
                    <button className="aadm-confirm" onClick={confirmAccept ? () => confirmAccept(deliveryFee) : () => {}}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default AdminAcceptDasherModal;
