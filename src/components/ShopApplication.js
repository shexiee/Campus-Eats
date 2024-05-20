import React, {useState} from "react";
import "./css/ShopApplication.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Navbar from "./Navbar";

const ShopApplication = () => {
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
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
                                    <h3>Shop Application</h3>
                                    <h4>Partner with CampusEats to help drive growth and take your business to the next level.</h4>
                                </div>
                            </div>
                            <div className="p-info">
                                <div className="p-two">
                                  <div className="p-field-two">
                                      <div className="p-label-two">
                                          <h3>Shop Name</h3>
                                          <input
                                            type="text"
                                            className="shop-name"
                                            value=""
                                          />
                                      </div>
                                  </div>
                                  <div className="p-field-two">
                                      <div className="p-label-two">
                                          <h3>Shop Description</h3>
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
                                          <h3>Shop Address</h3>
                                          <input
                                            type="text"
                                            className="shop-address"
                                            value=""
                                          />
                                      </div>
                                  </div>
                                  <div className="p-field-two">
                                      <div className="p-label-two">
                                          <h3>Google Address Link</h3>
                                          <input
                                            type="text"
                                            className="google-link"
                                            value=""
                                          />
                                      </div>
                                  </div>
                                </div>

                                <div className="p-two">
                                    <div className="sa-upload">
                                        <div className="sa-label-upload">
                                        <h3>Upload GovID</h3>
                                        </div>
                                        <div className="sa-upload-container">
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
                                                <img src={uploadedImage} alt="Uploaded" style={{ width: '100%', height: '100%', borderRadius: '20px', objectFit: 'cover' }} />
                                            ) : (
                                                <>
                                                <FontAwesomeIcon icon={faUpload} className="sa-upload-icon" />
                                                <p>Drag and Drop or click here <br /> to upload image</p>
                                                </>
                                            )}
                                            </div>
                                        </label>
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

export default ShopApplication;
