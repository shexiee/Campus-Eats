import React, { useState } from "react";
import "./css/AddItemShop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const AddItemShop = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [dragOver, setDragOver] = useState(false);
  const [categories, setCategories] = useState({
    food: false,
    drinks: false,
    clothing: false,
    electronics: false,
    chicken: false,
    sisig: false,
    samgyupsal: false,
    "burger steak": false,
    pork: false,
    bbq: false,
    "street food": false,
    desserts: false,
    "milk tea": false,
    coffee: false,
    snacks: false,
    breakfast: false,
  });
  const navigate = useNavigate();

  

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (category) => {
    setCategories({
      ...categories,
      [category]: !categories[category],
    });
  };

  return (
        <>
        <Navbar />
    
        <div className="p-body">
        <div className="p-content-current">
            <div className="p-card-current">
            <div className="p-container">
                <div className="p-content">
                <div className="p-text">
                    <h3>Add Item</h3>
                </div>
                </div>
                <div className="p-info">
                <div className="p-two">
                    <div className="p-field-two">
                    <div className="p-label-two">
                        <h3>Item Name</h3>
                        <input type="text" className="item-name" value="" />
                    </div>
                    </div>
                    <div className="p-field-two">
                    <div className="p-label-two">
                        <h3>Item Description</h3>
                        <input type="text" className="item-desc" value="" />
                    </div>
                    </div>
                </div>
                <div className="p-two">
                    <div className="p-field-two-price">
                    <div className="p-label-two">
                        <h3>Item Price</h3>
                        <input type="text" className="item-price" value="" />
                    </div>
                    </div>

                    <div className="sa-shop-categories">
                    <h3>Item Categories</h3>
                    <div className="sa-category-checkboxes">
                        {Object.keys(categories).map((category, index) => (
                        <div
                            key={index}
                            className={`sa-category-item ${
                            categories[category] ? "selected" : ""
                            }`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
                <div className="p-two-qty">
                    <div className="p-field-two-qty">
                    <div className="p-label-two-qty">
                        <h3>Item Quantity</h3>
                        <div className="quantity-controls">
                        <button className="quantity-button" onClick={decreaseQuantity}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="quantity-number">{quantity}</span>
                        <button className="quantity-button" onClick={increaseQuantity}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="p-buttons">
                    <button onClick={() => navigate("/profile")} className="p-logout-button">
                    Cancel
                    </button>
                    <button className="p-save-button">Submit</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </>
    
    
  );
};
export default AddItemShop;
