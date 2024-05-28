import React, { useEffect, useState } from "react";
import "./css/ShopApplication.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const DasherApplication = () => {
  const { currentUser } = useAuth();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [availableStartTime, setAvailableStartTime] = useState(null);
  const [availableEndTime, setAvailableEndTime] = useState(null);
  const [GCASHName, setGCASHName] = useState("");
  const [GCASHNumber, setGCASHNumber] = useState("");
  const [days, setDays] = useState({
    MON: false,
    TUE: false,
    WED: false,
    THU: false,
    FRI: false,
    SAT: false,
    SUN: false,
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

  const handleCategoryChange = (day) => {
    setDays({
      ...days,
      [day]: !days[day],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasCategorySelected = Object.values(days).some(
      (selected) => selected
    );

    if (!hasCategorySelected) {
      alert("Please select at least one day.");
      return;
    }

    if (!uploadedImage) {
      alert("Please upload a School ID image.");
      return;
    }

    if (!GCASHNumber.startsWith(9)) {
      alert("Please provide a valid GCASH Number.");
      return;
    }

    if (availableStartTime >= availableEndTime) {
      alert("Shop close time must be later than shop open time.");
      return;
    }

    const formData = new FormData();
    const selectedDays = Object.keys(days).filter(day => days[day]);
    console.log(selectedDays);
    formData.append("days", JSON.stringify(selectedDays));
    formData.append("image", imageFile);
    formData.append("uid", currentUser.uid);
    formData.append("availableStartTime", availableStartTime);
    formData.append("availableEndTime", availableEndTime);
    formData.append("GCASHName", GCASHName);
    formData.append("GCASHNumber", GCASHNumber);
    formData.append("displayName", currentUser.displayName);

    try {
      const response = await axios.post("http://localhost:5000/api/dasher-application", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);
      navigate("/profile");
    } catch (error) {
        if (error.response && error.response.data.error === 'You have already submitted a dasher application') {
            alert('You have already submitted a dasher application.');
            return;
        }

        if (error.response && error.response.data.error === 'You have already submitted a shop application') {
            alert('You have already submitted a shop application.');
            return;
        }else {
            console.error("Error submitting form:", error);
            alert("Error submitting form");
        }
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
                  <h3>Dasher Application</h3>
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
                    <div className="p-field-two">
                      <div className="p-label-two">
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
                  <div className="p-two">
                    <div className="p-field-two">
                      <div className="p-label-two">
                        <h3>Start of Available Time</h3>
                        <input
                          type="time"
                          className="shop-open"
                          value={availableStartTime}
                          onChange={(e) => setAvailableStartTime(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="p-field-two">
                      <div className="p-label-two">
                        <h3>End of Available Time</h3>
                        <input
                          type="time"
                          className="shop-close"
                          value={availableEndTime}
                          onChange={(e) => setAvailableEndTime(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-two">
                    <div className="sa-upload">
                      <div className="sa-label-upload">
                        <h3>School ID</h3>
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
                      <h3>Days Available</h3>
                      <div className="sa-category-checkboxes">
                        {Object.keys(days).map((day, index) => (
                          <div
                            key={index}
                            className={`sa-category-item ${
                              days[day] ? "selected" : ""
                            }`}
                            onClick={() => handleCategoryChange(day)}
                          >
                            {day}
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

export default DasherApplication;