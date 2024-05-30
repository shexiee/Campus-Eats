  import React, { useEffect, useState } from "react";
  import "./css/ShopApplication.css";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faUpload, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
  import Navbar from "./Navbar";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import { useAuth } from "../context/AuthContext";
import { set } from "firebase/database";

  const ShopApplication = () => {
    
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const [shopName, setShopName] = useState("");
    const [shopDesc, setShopDesc] = useState("");
    const [shopAddress, setShopAddress] = useState("");
    const [googleLink, setGoogleLink] = useState("https://maps.app.goo.gl/");
    const [shopOpen, setShopOpen] = useState(null);
    const [shopClose, setShopClose] = useState(null);
    const [GCASHName, setGCASHName] = useState("");
    const [GCASHNumber, setGCASHNumber] = useState("");
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
      setLoading(true);
      const hasCategorySelected = Object.values(categories).some(
        (selected) => selected
      );
      if (!hasCategorySelected) {
        alert("Please select at least one category.");
        setLoading(false);
        return;
      }
      if (!uploadedImage) {
        alert("Please upload a shop image.");
        setLoading(false);
        return;
      }

      if (!googleLink.startsWith("https://maps.app.goo.gl/")) {
        alert("Please provide a valid Google Maps address link.");
        setLoading(false);
        return;
      }

      if (!GCASHNumber.startsWith('9') || GCASHNumber.length !== 10) {
        alert("Please provide a valid GCASH Number.");
        setLoading(false);
        return;
      }

      if (shopOpen >= shopClose) {
        alert("Shop close time must be later than shop open time.");
        setLoading(false);
        return;
      }

      const selectedCategories = Object.keys(categories).filter(category => categories[category]);
      const formData = new FormData();
      formData.append("shopName", shopName);
      formData.append("shopDesc", shopDesc);
      formData.append("shopAddress", shopAddress);
      formData.append("googleLink", googleLink);
      formData.append("categories", JSON.stringify(selectedCategories));
      formData.append("image", imageFile);
      formData.append("uid", currentUser.uid);
      formData.append("shopOpen", shopOpen);
      formData.append("shopClose", shopClose);
      formData.append("GCASHName", GCASHName);
      formData.append("GCASHNumber", GCASHNumber);

      try {
        const response = await axios.post("http://localhost:5000/api/shop-application", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert(response.data.message);
        navigate("/profile");
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.data.error === 'You have already submitted a dasher application') {
            alert('You have already submitted a dasher application.');
            setLoading(false);
            return;
        }

        if (error.response && error.response.data.error === 'You have already submitted a shop application') {
            alert('You have already submitted a shop application.');
            setLoading(false);
            return;

        }else {
            console.error("Error submitting form:", error);
            alert("Error submitting form");
            setLoading(false);
        }
      }
    };

    return (
      <>
        <Navbar />
        <div className="sa-body">
          <div className="sa-content-current">
            <div className="sa-card-current">
              <div className="sa-container">
                <div className="sa-content">
                  <div className="sa-text">
                    <h3>Shop Application</h3>
                    <h4>
                      Partner with CampusEats to help drive growth and take your
                      business to the next level.
                    </h4>
                  </div>
                </div>
                <div className="sa-info">
                  <form onSubmit={handleSubmit}>
                    <div className="sa-two">
                      <div className="sa-field-two">
                        <div className="sa-label-two">
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
                      <div className="sa-field-two">
                        <div className="sa-label-two">
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
                    <div className="sa-two">
                      <div className="sa-field-two">
                        <div className="sa-label-two">
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
                      <div className="sa-field-two">
                        <div className="sa-label-two">
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
                    <div className="sa-two">
                      <div className="sa-field-two">
                        <div className="sa-label-two">
                          <h3>GCASH Name</h3>
                          <input
                            type="text"
                            className="gcash-name"
                            value={GCASHName}
                            onChange={(e) => setGCASHName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="sa-field-two">
                        <div className="sa-label-two">
                          <h3>GCASH Number</h3>
                          <div className="gcash-input-container">
                            <span className="gcash-prefix">+63 </span>
                            <input
                              type="number"
                              className="gcash-num"
                              value={GCASHNumber}
                              onChange={(e) => setGCASHNumber(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        </div>
                    </div>
                    <div className="sa-two">
                      <div className="sa-field-two">
                        <div className="sa-label-two">
                          <h3>Shop Open Time</h3>
                          <input
                            type="time"
                            className="shosa-open"
                            value={shopOpen}
                            onChange={(e) => setShopOpen(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="sa-field-two">
                        <div className="sa-label-two">
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
                    <div className="sa-two">
                      <div className="sa-upload">
                        <div className="sa-label-upload">
                          <h3>Shop Logo/Banner</h3>
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
                      <button type="submit" disabled={loading} className="p-save-button">
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