import React, {useState} from "react";
import "./css/DasherApplication.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Navbar from "./Navbar";

const DasherApplication = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [dragOver, setDragOver] = useState(false);

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

    return (
        <>
            <Navbar />

            <div className="p-body">
                <div className="p-content-current">
                    <div className="p-card-current">
                        <div className="p-container">
                            <div className="p-content">
                                <div className="p-text">
                                    <h3>Runner Application</h3>
                                    <h4>Partner with CampusEats to help drive growth and take your business to the next level.</h4>
                                </div>
                            </div>
                            <div className="p-info">
                                <div className="p-two">
                                  <div className="p-field-two">
                                      <div className="p-label-two">
                                          <h3>First Name</h3>
                                          <input
                                            type="text"
                                            className="shop-name"
                                            value=""
                                          />
                                      </div>
                                  </div>
                                  <div className="p-field-two">
                                      <div className="p-label-two">
                                          <h3>Last Name</h3>
                                          <input
                                            type="text"
                                            className="shop-desc"
                                            value=""
                                          />
                                      </div>
                                  </div>
                                  <div className="p-field-two">
                                      <div className="p-label-two">
                                          <h3>Middle Name</h3>
                                          <input
                                            type="text"
                                            className="shop-desc"
                                            value=""
                                          />
                                      </div>
                                  </div>
                                </div>
                                <div className="p-two">
                                  <div className="p-field-two">
                                      <div className="p-label-two">
                                          <h3>Mobile Number</h3>
                                          <input
                                            type="text"
                                            className="shop-address"
                                            value=""
                                          />
                                      </div>
                                  </div>
                                  <div className="p-field-two">
                                      <div className="p-label-two">
                                          <h3>Institutional Email</h3>
                                          <input
                                            type="text"
                                            className="google-link"
                                            value=""
                                          />
                                      </div>
                                  </div>
                                </div>

                                <div className="p-buttons">
                                    <button className="p-logout-button">Cancel</button>
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

export default DasherApplication;
