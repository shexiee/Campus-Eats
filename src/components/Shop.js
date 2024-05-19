import React, { useEffect } from "react";
import "./css/Shop.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Navbar from "./Navbar";

const Shop = () => {
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
            <div className="o-body">
                <div className="s-container">
                    <div className="s-title-container">
                        <div className="s-photo">
                            <img src={'/Assets/Panda.png'} alt="store" className="s-photo-image" />
                        </div>
                        <div className="s-title">
                            <h2>Sisig ni Tatay</h2>
                            <p>Skina 3rd Street</p>
                            <div className="s-title-subtext">
                                <p>Category</p>
                                <h4>Chicken</h4>
                                <p>Delivery Fee</p>
                                <h4>$20.00</h4>
                                <p>Reviews</p>
                                <h4>4.7 (100+)</h4>
                            </div>
                        </div>
                    </div>
                    <div className="s-items-container">
                        <h2>Items</h2>
                        <div className="s-content">
                            <div className="s-card">
                                <div className="s-img">
                                    <img src={'/Assets/Panda.png'} className="s-image-cover" alt="store" />
                                </div>
                                <div className="s-text">
                                    <div className="s-subtext">
                                        <p className="s-h3">Jabe ni Xianna</p>
                                        <p className="s-p">Fried Chicken</p>
                                    </div>
                                    <h3>$10.00</h3>
                                    <div className="s-plus-icon">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Shop;
