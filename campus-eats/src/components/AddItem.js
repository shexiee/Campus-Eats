import "./css/AddItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const AddItem = () => {
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

            <div className="i-body">
                <div className="i-content-current">
                    <div className="i-card-current">
                        <div className="i-container">
                            <div className="i-info">
                                <h1>Add Items</h1>
                                <div className="i-two">
                                    <div className="i-field-two">
                                        <div className="i-label-two">
                                            <h3>Item Name</h3>
                                            <input
                                                type="text"
                                                className="item-name"
                                                value="John"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="i-field-two">
                                        <div className="i-label-two">
                                            <h3>Item Description</h3>
                                            <input
                                                type="text"
                                                className="item-desc"
                                                value="Wala ko kabalo"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="i-two">
                                    <div className="i-field-two">
                                        <div className="i-label-two">
                                            <h3>Item Price</h3>
                                            <input
                                                type="text"
                                                className="item-price"
                                                value="P1000"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="i-field-two">
                                    <div className="i-shop-categories">
                                        <h3>Shop Categories</h3>
                                        <div className="i-category-checkboxes">
                                        {Object.keys(categories).map((category, index) => (
                                            <div
                                            key={index}
                                            className={`i-category-item ${
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
                                </div>

                                <div className="i-two-qty">
                                    <div className="i-field-two-qty">
                                    <div className="i-label-two-qty">
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
                                
                                <div className="i-buttons">
                                    <button className="i-logout-button">Logout</button>
                                    <button className="i-save-button" disabled>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
};

export default AddItem;
