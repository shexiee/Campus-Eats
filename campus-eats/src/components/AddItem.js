import "./css/AddItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { faPlus, faMinus, faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { set } from "firebase/database";

const AddItem = () => {
    const { currentUser } = useAuth();
    const [success, setSuccess] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [dragOver, setDragOver] = useState(false);
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [categories, setCategories] = useState({
    food: false,
    drinks: false,
    clothing: false,
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
    others: false
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
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
    setImageFile(file);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const hasCategorySelected = Object.values(categories).some(
      (selected) => selected
    );
  
    if (!hasCategorySelected) {
      alert("Please select at least one category.");
      setLoading(false);
      return;
    }
  
    if (quantity < 1) {
      alert("Quantity must be at least 1.");
      setLoading(false);
      return;
    }
  
    if (!description) {
      if (!window.confirm("You have not set a description. Are you sure you want to continue?")) {
        
        setLoading(false);
        return;
      }
    }
    
  
    if (!uploadedImage) {
      if (!window.confirm("You have not set an item image. Are you sure you want to continue?")) {
        
        setLoading(false);
        return;
      }
    }
    console.log("loading", loading);
  
    const selectedCategories = Object.keys(categories).filter(category => categories[category]);
    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("price", price);
    formData.append("qty", quantity);
    formData.append("desc", description);
    if (uploadedImage) {
      formData.append("image", imageFile);
    }
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("uid", currentUser.uid);
  
    try {
      const response = await axios.post("http://localhost:5000/api/shop-add-item", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);
      setSuccess("Item added successfully!");
        setLoading(false);
      console.log(response.data);
      setItemName("");
        setPrice(0);
        setQuantity(1);
        setDescription("");
        setUploadedImage(null);
        setImageFile(null);
        setCategories({
          food: false,
          drinks: false,
          clothing: false,
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
          others: false
        });
    } catch (error) {
        console.error("Error making an item:", error.response.data.error);
        alert(error.response.data.error || "An error occurred. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
      
        
    }
  };
  

    return (
        <>
            <Navbar />

            <div className="i-body">
                <div className="i-content-current">
                    <div className="i-card-current">
                        <div className="i-container">
                        <form onSubmit={handleSubmit}>
                            <div className="i-info">
                                
                                <h1>Add Item</h1>
                                <div className="i-two">
                                    <div className="i-field-two i-field-desc">
                                        <div className="i-label-two">
                                            <h3>Item Name</h3>
                                            <input
                                                type="text"
                                                className="item-name"
                                                value={itemName}
                                                onChange={(e) => setItemName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="i-field-two i-field-desc">
                                        <div className="i-label-two">
                                            <h3>Item Price</h3>
                                            <input
                                                type="number"
                                                className="item-price"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="i-field-two i-field-desc">
                                        <div className="i-label-two">
                                            <h3>Item Quantity</h3>
                                            <input
                                                type="number"
                                                className="item-price"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="i-two">
                                <div className="i-field-two i-field-desc">
                                        <div className="i-label-two">
                                            <h3>Item Description</h3>
                                            <textarea
                                                className="item-desc"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="i-upload">
                                        <div className="i-label-upload">
                                            <h3>Item Picture</h3>
                                        </div>
                                        <div
                                            className={`i-upload-container ${
                                            dragOver ? "drag-over" : ""
                                            }`}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                        >
                                            <label htmlFor="i-govID" className="i-drop-area">
                                            <input
                                                type="file"
                                                hidden
                                                id="i-govID"
                                                className="i-govID-input"
                                                onChange={handleFileChange}
                                            />
                                            <div className="i-img-view">
                                                {uploadedImage ? (
                                                <img
                                                    src={uploadedImage}
                                                    alt="Uploaded"
                                                    style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    borderRadius: "20px",
                                                    objectFit: "cover",
                                                    }}
                                                />
                                                ) : (
                                                <>
                                                    <FontAwesomeIcon
                                                    icon={faUpload}
                                                    className="i-upload-icon"
                                                    />
                                                    <p>
                                                    Drag and Drop or click here <br /> to upload
                                                    image
                                                    </p>
                                                </>
                                                )}
                                            </div>
                                            </label>
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
                                
                                <div className="i-buttons">
                                    <button className="i-logout-button">Cancel</button>
                                    <button type="submit" className="i-save-button" disabled={loading}>
                                        {loading ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
};

export default AddItem;
