import "./css/UpdateItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { set } from "firebase/database";

const UpdateItem = () => {
    const { currentUser } = useAuth();
    const { itemId } = useParams();
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

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`/api/items/${itemId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch item");
                }
                const data = await response.json();
                setItemName(data.name);
                setPrice(data.price);
                setQuantity(data.quantity);
                setDescription(data.description);
                setUploadedImage(data.imageUrl);
                setCategories((prevCategories) => {
                    const updatedCategories = { ...prevCategories };
                    data.categories.forEach(category => {
                        updatedCategories[category] = true;
                    });
                    return updatedCategories;
                });
            } catch (error) {
                console.error("Error fetching item:", error);
            }
        };

        fetchItem();
    }, [itemId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const hasCategorySelected = Object.values(categories).some(selected => selected);
      
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
      
        if (!description && !window.confirm("You have not set a description. Are you sure you want to continue?")) {
          setLoading(false);
          return;
        }
      
        if (!uploadedImage && !window.confirm("You have not set an item image. Are you sure you want to continue?")) {
          setLoading(false);
          return;
        }
      
        const selectedCategories = Object.keys(categories).filter(category => categories[category]);
        const formData = new FormData();
        formData.append("name", itemName);
        formData.append("price", price);
        formData.append("qty", quantity);
        formData.append("desc", description);
        if (imageFile) {
          formData.append("image", imageFile);
        }
        formData.append("categories", JSON.stringify(selectedCategories));
        console.log("selectedCategories", selectedCategories);
        formData.append("uid", currentUser.uid);
      
        try {
          const response = await axios.post(`http://localhost:5000/api/shop-update-item/${itemId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          alert(response.data.message);
          setSuccess("Item updated successfully!");
          setLoading(false);
          navigate("/shop-manage-item");
        } catch (error) {
          console.error("Error updating item:", error.response.data.error);
          alert(error.response.data.error || "An error occurred. Please try again.");
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };
      
    return (
        <>
            <Navbar />

            <div className="ui-body">
                <div className="ui-content-current">
                    <div className="ui-card-current">
                        <div className="ui-container">
                            <form onSubmit={handleSubmit}>
                                <div className="ui-info">
                                    <h1>Update Item</h1>
                                    <div className="ui-two">
                                        <div className="ui-field-two ui-field-desc">
                                            <div className="ui-label-two">
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
                                        <div className="ui-field-two ui-field-desc">
                                            <div className="ui-label-two">
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
                                        <div className="ui-field-two ui-field-desc">
                                            <div className="ui-label-two">
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
                                    <div className="ui-two">
                                        <div className="ui-field-two ui-field-desc">
                                            <div className="ui-label-two">
                                                <h3>Item Description</h3>
                                                <textarea
                                                    className="item-desc"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="ui-upload">
                                            <div className="ui-label-upload">
                                                <h3>Item Picture</h3>
                                            </div>
                                            <div
                                                className={`ui-upload-container ${dragOver ? "drag-over" : ""}`}
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                            >
                                                <label htmlFor="ui-govID" className="ui-drop-area">
                                                    <input
                                                        type="file"
                                                        hidden
                                                        id="ui-govID"
                                                        className="ui-govID-input"
                                                        onChange={handleFileChange}
                                                    />
                                                    <div className="ui-img-view">
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
                                                                    className="ui-upload-icon"
                                                                />
                                                                <p>
                                                                    Drag and Drop or click here <br /> to upload image
                                                                </p>
                                                            </>
                                                        )}
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="ui-field-two">
                                            <div className="ui-shop-categories">
                                                <h3>Shop Categories</h3>
                                                <div className="ui-category-checkboxes">
                                                    {Object.keys(categories).map((category, index) => (
                                                        <div
                                                            key={index}
                                                            className={`ui-category-item ${categories[category] ? "selected" : ""}`}
                                                            onClick={() => handleCategoryChange(category)}
                                                        >
                                                            {category}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ui-buttons">
                                        <button className="ui-cancel-button" onClick={() => navigate('/shop-manage-item')}>Cancel</button>
                                        <button type="submit" className="ui-save-button" disabled={loading}>
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

export default UpdateItem;
