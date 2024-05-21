import React from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import "./css/AdminDasherLists.css"; 

const AdminDasherList = () => {
    const { currentUser } = useAuth();
    console.log(currentUser);
    return (
        <>
            <Navbar />

            <div className="adl-body">
                <div className="adl-title">
                    <h2>Active Dashers</h2>
                </div>

                <div className="adl-row-container">
                    <div className="adl-word">Runner ID#</div>
                    <div className="adl-word">Name</div>
                    <div className="adl-word">Contact Number</div>
                    <div className="adl-word">Role</div>
                    <div className="adl-word">Shift Start</div>
                    <div className="adl-word">Shift End</div>
                    <div className="adl-word">Status</div>
                </div>

                <div className="adl-container">
                    <div className="adl-box">
                        <div className="adl-box-content">
                            <div>12345</div>
                            <div>John Doe</div>
                            <div>09089393324</div>
                            <div>Student</div>
                            <div>1:00 PM</div>
                            <div>3:00 PM</div>
                            <div>Available</div>
                        </div>
                    </div>
                </div>

                {/* New Orders Table */}
                <div className="dashers-title">
                    <h2>Orders</h2>
                </div>

                <div className="adl-row-container">
                    <div className="adl-word">Order ID#</div>
                    <div className="adl-word">Customer</div>
                    <div className="adl-word">Created</div>
                    <div className="adl-word">Runner</div>
                    <div className="adl-word">Customer Total</div>
                    <div className="adl-word">Profit</div>
                    <div className="adl-word">Status</div>
                </div>

                <div className="adl-container">
                    <div className="adl-box">
                        <div className="adl-box-content">
                            <div>67890</div>
                            <div>Jane Doe</div>
                            <div>2024-05-21</div>
                            <div>John Smith</div>
                            <div>₱200.00</div>
                            <div>₱40.00</div>
                            <div>Pending</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDasherList;
