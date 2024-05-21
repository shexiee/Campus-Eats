import React, { useEffect, useState } from "react";
import "./css/ShopApplication.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ShopApplication = () => {
  const { currentUser } = useAuth();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [shopName, setShopName] = useState("");
  const [shopDesc, setShopDesc] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [googleLink, setGoogleLink] = useState("");
  const [shopOpen, setShopOpen] = useState(null);
  const [shopClose, setShopClose] = useState(null);
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
    const hasCategorySelected = Object.values(categories).some(
      (selected) => selected
    );

    if (!hasCategorySelected) {
      alert("Please select at least one category.");
      return;
    }

    if (!uploadedImage) {
      alert("Please upload a government ID image.");
      return;
    }

    if (!googleLink.startsWith("https://maps.google.com")) {
      alert("Please provide a valid Google Maps address link.");
      return;
    }

    if (shopOpen >= shopClose) {
      alert("Shop close time must be later than shop open time.");
      return;
    }

    const formData = new FormData();
    formData.append("shopName", shopName);
    formData.append("shopDesc", shopDesc);
    formData.append("shopAddress", shopAddress);
    formData.append("googleLink", googleLink);
    formData.append("categories", JSON.stringify(categories));
    formData.append("image", imageFile);
    formData.append("uid", currentUser.uid);

    try {
      const response = await axios.post("http://localhost:5000/api/shop", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);
      navigate("/profile");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
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
                  <h3>Shop Application</h3>
                  <h4>
                    Partner with CampusEats to help drive growth and take your
                    business to the next level.
                  </h4>
                </div>
              </div>
              <div className="p-info">
                <form onSubmit={handleSubmit}>
                  <div className="p-two">
                    <div className="p-field-two">
                      <div className="p-label-two">
                        <h3>Shop Name</h3>
                        <input
                          type="text"
                          className="shop-name"
                          value={shopName}
                          onChange={(e) => setShopName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="p-field-two">
                      <div className="p-label-two">
                        <h3>Shop Description</h3>
                        <input
                          type="text"
                          className="shop-desc"
                          value={shopDesc}
                          onChange={(e) => setShopDesc(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-two">
                    <div className="p-field-two">
                      <div className="p-label-two">
                        <h3>Shop Address</h3>
                        <input
                          type="text"
                          className="shop-address"
                          value={shopAddress}
                          onChange={(e) => setShopAddress(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="p-field-two">
                      <div className="p-label-two">
                        <h3>Google Address Link
                          <FontAwesomeIcon 
                            icon={faInfoCircle} 
                            style={{ marginLeft: '5px', cursor: 'pointer'}}
                            onClick={() => window.open("https://www.youtube.com/watch?v=BExdUFXnz3w", "_blank")} 
                          />
                        </h3>
                        <input
                          type="text"
                          className="google-link"
                          value={googleLink}
                          onChange={(e) => setGoogleLink(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-two">
                    <div className="p-field-two">
                      <div className="p-label-two">
                        <h3>Shop Open Time</h3>
                        <input
                          type="time"
                          className="shop-open"
                          value={shopOpen}
                          onChange={(e) => setShopOpen(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="p-field-two">
                      <div className="p-label-two">
                        <h3>Shop Close Time</h3>
                        <input
                          type="time"
                          className="shop-close"
                          value={shopClose}
                          onChange={(e) => setShopClose(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-two">
                    <div className="sa-upload">
                      <div className="sa-label-upload">
                        <h3>Government ID</h3>
                      </div>
                      <div
                        className={`sa-upload-container ${
                          dragOver ? "drag-over" : ""
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <label htmlFor="sa-govID" className="sa-drop-area">
                          <input
                            type="file"
                            hidden
                            id="sa-govID"
                            className="sa-govID-input"
                            onChange={handleFileChange}
                          />
                          <div className="sa-img-view">
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
                                  className="sa-upload-icon"
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
                    <div className="sa-shop-categories">
                      <h3>Shop Categories</h3>
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
                  <div className="p-buttons">
                    <button
                      type="button"
                      onClick={() => navigate("/profile")}
                      className="p-logout-button"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="p-save-button">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopApplication;
