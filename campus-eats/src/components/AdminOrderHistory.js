import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import "./css/AdminOrderHistory.css"; // Import CSS file

const AdminOrderHistory = () => {
    const { currentUser } = useAuth();
    const [completedOrders, setCompletedOrders] = useState([]);

    useEffect(() => {
        const fetchCompletedOrders = async () => {
            try {
                const response = await axios.get('/api/completed-orders');
                const ordersData = await Promise.all(response.data.map(async order => {
                    const ordersDataResponse = await axios.get(`/api/user/${order.uid}`);
                    const orderData = ordersDataResponse.data;
                    return { ...order, orderData };
                  }));
                setCompletedOrders(ordersData);
                console.log("completedOrders", ordersData);
            } catch (error) {
                console.error('Error fetching completed orders:', error);
            }
        };

        fetchCompletedOrders();
    }, []);

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
                    <div className="aoh-word">Status</div>
                </div>

                <div className="aoh-scontainer">
                    {completedOrders.map(order => (
                        <div key={order.id} className="aoh-box">
                            <div className="aoh-box-content">
                                <div>{order.id}</div>
                                <div>{order.orderData.username}</div>
                                <div>{order.createdAt ? order.createdAt : 'May 20, 2024'}</div>
                                <div>{order.runner}</div>
                                <div>₱{order.totalPrice}</div>
                                <div>{order.status}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AdminOrderHistory;
