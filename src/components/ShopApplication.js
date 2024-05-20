import React from "react";
import "./css/ShopApplication.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import Navbar from "./Navbar";

const ShopApplication = () => {
    return (
        <>
            <Navbar />

            <div className="o-body">
                <div className="p-content-current">
                    <div className="p-card-current">
                        <div className="p-container">
                            <div className="p-content">
                                <div className="p-text">
                                    <h3>Shop Application</h3>
                                    <h4>Partner with DoorDash to help drive growth and take your business to the next level.</h4>
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
                                  <div className="p-field-two">
                                      <div className="p-label-two">
                                          <div className="p-label-icon">
                                            <h3>Upload GovID</h3>
                                          </div>
                                          <label htmlFor="govID" className="govID">Upload Photo</label>
                                          <input type="file" id="govID" className="govID-input" />
                                      </div>
                                  </div>
                                </div>
                                <div className="p-buttons">
                                    <button className="p-cancel-button">Cancel</button>
                                    <button className="p-submit-button">Submit</button>
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
