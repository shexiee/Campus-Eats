import React from "react";
import { useState, useEffect } from "react";
import "./css/Home.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faClock, faStar } from '@fortawesome/free-regular-svg-icons';
import Navbar from "./Navbar";

const Home = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser]);
    return (
        <>
         <Navbar />
        
            <div className="h-body">
                <div className="h-title">
                    <h2>Good Morning, {currentUser?.displayName}!</h2>
                    <p>Start Simplifying Your Campus Cravings!</p>
                </div>
                <div className="h-content">

                    <div className="h-card">
                        <div className="h-img">
                            <img src={'/Assets/Panda.png'} className="h-image-cover" alt="store" />
                            <div className="h-save">
                                <FontAwesomeIcon className="h-svg" icon={faHeart} />
                            </div>
                        </div>

                        <div className="h-text">
                            <p className="h-h3">Jabe ni Xianna</p>
                            <div className="h-subtext">
                                <p className="h-p">Fried Chicken</p>
                                
                            </div>
                            <div className="h-subtext h-details">
                                <FontAwesomeIcon className="h-svg2" icon={faClock} />
                                <p className="h-p">4 mins</p>
                                <FontAwesomeIcon className="h-svg2" icon={faStar} />
                                <p className="h-p">4.2 (100+)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;