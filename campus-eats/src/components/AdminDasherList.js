import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import "./css/AdminDasherLists.css";

import axios from "axios";

const AdminDasherList = () => {
    const { currentUser } = useAuth();
    const [pendingDashers, setPendingDashers] = useState([]);
    const [currentDashers, setCurrentDashers] = useState([]);

    const handleDeclineClick = async (dasherId) => {
        if (window.confirm("Are you sure you want to decline this dasher?")) {
            try {
                await axios.post('/api/update-dasher-status', { dasherId, status: 'declined' });
                alert('Order status updated successfully');
                window.location.reload();
            } catch (error) {
                console.error('Error updating dasher status:', error);
                alert('Error updating dasher status');
            }
        }
    };

    const handleAcceptClick = async (dasherId) => {
        if (window.confirm("Are you sure you want to accept this dasher?")) {
            try {
                await axios.post('/api/update-dasher-status', { dasherId, status: 'active' });
                alert('Order status updated successfully');
            } catch (error) {
                console.error('Error updating dasher status:', error);
                alert('Error updating dasher status');
            }

            try {
                console.log("dasherid: ", dasherId)
                await axios.post('/api/update-account-type', { uid: dasherId, account_type: 'dasher'});
                alert('account type updated successfully');
                window.location.reload();
            
            }catch(error){
                console.error('Error updating account type:', error);
                alert('Error updating account type');
            
            }
        }
    };

    useEffect(() => {
        const fetchDashers = async () => {
            try {
                const response = await axios.get('/api/dasher-lists');
                const pendingDashersHold = response.data.pendingDashers;
                const currentDashersHold = response.data.currentDashers;
                const pendingDashersData = await Promise.all(
                    pendingDashersHold.map(async (dasher) => {
                        const pendingDashersDataResponse = await axios.get(`/api/user/${dasher.id}`);
                        const pendingDashersData = pendingDashersDataResponse.data;
                        return { ...dasher, userData: pendingDashersData }; // Renamed to userData for clarity
                    })
                );
              
                const currentDashersData = await Promise.all(
                    currentDashersHold.map(async (dasher) => {
                        const currentDashersDataResponse = await axios.get(`/api/user/${dasher.id}`);
                        const currentDashersData = currentDashersDataResponse.data;
                        return { ...dasher, userData: currentDashersData }; // Renamed to userData for clarity
                    })
                );

                setPendingDashers(pendingDashersData);
                setCurrentDashers(currentDashersData);
            } catch (error) {
                console.error('Error fetching dashers:', error);
            }
        };

        fetchDashers();
    }, []);

    return (
        <>
            <Navbar />

            <div className="adl-body">
                <div className="adl-title">
                    <h2>Pending Dashers</h2>
                </div>
                {pendingDashers && pendingDashers.length > 0 ? (
                    <>
                        <div className="adl-row-container">
                            <div className="adl-word">Dasher Name</div>
                            <div className="adl-word">Days Available</div>
                            <div className="adl-word">Start Time</div>
                            <div className="adl-word">End Time</div>
                            <div className="adl-word">School ID</div>
                            <div className="adl-word">Actions</div>
                        </div>

                        <div className="adl-container">
                            {pendingDashers.map(dasher => (
                                <div key={dasher.id} className="adl-box">
                                    <div className="adl-box-content">
                                        <div>{dasher.userData.firstname + " " + dasher.userData.lastname}</div>
                                        <div>{dasher.daysAvailable.join(', ')}</div>
                                        <div>{dasher.availableStartTime}</div>
                                        <div>{dasher.availableEndTime}</div>
                                        <div>
                                            <img src={dasher.schoolId} alt="School ID" className="adl-list-pic" />
                                        </div>
                                        <div className="adl-buttons">
                                            <button className="adl-decline" onClick={() => handleDeclineClick(dasher.id)}>Decline</button>
                                            <button className="adl-acceptorder" onClick={() => handleAcceptClick(dasher.id)}>Accept</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div>No pending dashers</div>
                )}

                <div className="adl-title">
                    <h2>Dashers</h2>
                </div>
                {currentDashers && currentDashers.length > 0 ? (
                    <>
                        <div className="adl-row-container">
                            <div className="adl-word">Dasher Name</div>
                            <div className="adl-word">Days Available</div>
                            <div className="adl-word">Start Time</div>
                            <div className="adl-word">End Time</div>
                            <div className="adl-word">School ID</div>
                            <div className="adl-word">Status</div>
                        </div>

                        <div className="adl-container">
                            {currentDashers.map(dasher => (
                                <div key={dasher.id} className="adl-box">
                                    <div className="adl-box-content">
                                        <div>{dasher.userData.firstname + " " + dasher.userData.lastname}</div>
                                        <div>{dasher.daysAvailable.join(', ')}</div>
                                        <div>{dasher.availableStartTime}</div>
                                        <div>{dasher.availableEndTime}</div>
                                        <div>
                                            <img src={dasher.schoolId} alt="School ID" className="adl-list-pic" />
                                        </div>
                                        <div>{dasher.status}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div>No current dashers</div>
                )}
            </div>
        </>
    );
};

export default AdminDasherList;
