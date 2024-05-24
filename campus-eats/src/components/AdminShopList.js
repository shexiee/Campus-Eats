import React from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import "./css/AdminShopList.css"; 

const AdminShopList = () => {
    const { currentUser } = useAuth();
    console.log(currentUser);
    return (
        <>
            <Navbar />

            <div className="as-body">
                <div className="as-title">
                    <h2>Active Shops</h2>
                </div>

                <div className="as-row-container">
                    <div className="as-word">Shop ID#</div>
                    <div className="as-word">Name</div>
                    <div className="as-word">Location</div>
                    <div className="as-word">Contact Number</div>
                    <div className="as-word">Time Open</div>
                    <div className="as-word">Time Close</div>
                    <div className="as-word">Status</div>
                </div>

                <div className="as-container">
                    <div className="as-box">
                        <div className="as-box-content">
                            <div>12345</div>
                            <div>Jerry's</div>
                            <div>Front Gate</div>
                            <div>09089393324</div>
                            <div>8:00 AM</div>
                            <div>6:00 PM</div>
                            <div>Open</div>
                        </div>
                    </div>
                </div>

                {/* New Shops Table */}
                <div className="shops-title">
                    <h2>Orders</h2>
                </div>

                <div className="as-row-container">
                <div className="as-word">Shop ID#</div>
                    <div className="as-word">Name</div>
                    <div className="as-word">Location</div>
                    <div className="as-word">Contact Number</div>
                    <div className="as-word">Time Open</div>
                    <div className="as-word">Time Close</div>
                    <div className="as-word">Status</div>
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

export default AdminShopList;
