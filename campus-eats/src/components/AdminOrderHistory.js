import React from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import "./css/AdminOrderHistory.css"; // Import CSS file

const AdminOrderHistory = () => {
    const { currentUser } = useAuth();
    return (
        <>
         <Navbar />
        
         <div className="aoh-body">
            <div className="aoh-title">
                <h2>Orders History</h2>
            </div>

            <div className="aoh-row-container">
                <div className="aoh-word">Order ID#</div>
                <div className="aoh-word">Customer</div>
                <div className="aoh-word">Created</div>
                <div className="aoh-word">Runner</div>
                <div className="aoh-word">Customer Total</div>
                <div className="aoh-word">Profit</div>
                <div className="aoh-word">Status</div>
            </div>

            <div className="aoh-scontainer">
                <div className="aoh-box">
                    <div className="aoh-box-content">
                        <div>12345</div>
                        <div>John Doe</div>
                        <div>2024-05-21</div>
                        <div>Jane Smith</div>
                        <div>₱100.00</div>
                        <div>₱20.00</div>
                        <div>Delivered</div>
                    </div>
                </div>
            </div>

            
        </div>
        </>
    )
}

export default AdminOrderHistory;
