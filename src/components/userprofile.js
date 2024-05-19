import React from "react";
import { useState, useEffect } from "react";
import "./css/userprofile.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import Navbar from "./Navbar";

const UserProfile = () => {
    const { currentUser, logout } = useAuth(); // Make sure to include the logout function
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [dob, setDob] = useState('');
    const [confirmpwd, setConfirmpwd] = useState('');
    const [pwd, setPwd] = useState('');
    const [editMode, setEditMode] = useState(false);

    

    return (
        <>
            <Navbar />

            <div className="o-body">
                <div className="p-content-current">
                    <div className="p-card-current">
                        <div className="p-container">
                            <div className="p-content">
                                <div className="p-img-holder">
                                    <img src='/Assets/Panda.png' alt="food" className="p-img"/>
                                </div>
                                <div className="p-text">
                                    <h3>Lexianna</h3>
                                    <h4>xiannaandrei.cabana@cit.edu</h4>
                                </div>
                            </div>
                            <div className="p-info">
                                <div className="p-two">
                                  <div className="p-field-two">
                                      <div className="p-label-two">
                                          <h3>First Name</h3>
                                          <input
                                            type="text"
                                            className="firstname"
                                            value={firstName}
                                            onChange={(e) => {
                                              setFirstName(e.target.value);
                                            }}
                                          />
                                      </div>
                                  </div>
                                  <div className="p-field-two">
                                      <div className="p-label-two">
                                          <h3>Last Name</h3>
                                          <input
                                            type="text"
                                            className="lastname"
                                            value={lastName}
                                            onChange={(e) => {
                                              setLastName(e.target.value);
                                            }}
                                          />
                                      </div>
                                  </div>
                                </div>
                                <div className="p-two">
                                  <div className="p-field-two">
                                      <div className="p-label-two">
                                          <h3>Contact Number</h3>
                                          <input
                                            type="text"
                                            className="contactnumber"
                                            value={contactNumber}
                                            onChange={(e) => {
                                              setContactNumber(e.target.value);
                                            }}
                                          />
                                      </div>
                                  </div>
                                  <div className="p-field-two">
                                      <div className="p-label-two">
                                          <h3>Date of Birth</h3>
                                          <input
                                            type="date"
                                            className="dateofbirth"
                                            value={dob}
                                            onChange={(e) => {
                                              setDob(e.target.value);
                                            }}
                                          />
                                      </div>
                                  </div>
                                </div>

                                <div className="p-two">
                                  <div className={editMode ? "p-field-two" : "p-field"}>
                                      <div className={editMode ? "p-label-two" : "p-label"}>
                                            
                                          
                                          <div className="p-label-icon" >
                                            <h3>Password</h3>
                                            {editMode && (
                                              <div className="p-edit" onClick={() => setEditMode(false)}>
                                              <FontAwesomeIcon style={{fontSize: '15px'}} icon={faTimes} />
                                              <h4>Cancel</h4>
                                              </div>
                                            )}
                                            {!editMode && (
                                              <div className="p-edit" onClick={() => setEditMode(true)}>
                                              <FontAwesomeIcon style={{fontSize: '12px'}} icon={faPen} />
                                              <h4>Edit</h4>
                                              </div>
                                            )}
                                          </div>
                                          {editMode && (
                                          <input
                                            type="password"
                                            className="password"
                                            value={pwd}
                                            onChange={(e) => {
                                              setPwd(e.target.value);
                                            }}
                                          />
                                          )}
                                      </div>
                                  </div>
                                  {editMode && (
                                    <>     
                                    <div className="p-field-two">
                                        <div className="p-label-two">
                                            <h3>Confirm Password</h3>
                                            <input
                                              type="password"
                                              className="confirmpwd"
                                              value={confirmpwd}
                                              onChange={(e) => {
                                                setConfirmpwd(e.target.value);
                                              }}
                                            />
                                        </div>
                                    </div>
                                  </>
                                  )}
                                </div>

                                {/* <div className="p-field">
                                  <div className="p-label">
                                    <h3>Password</h3>
                                    {!editMode && (
                                      <div className="p-edit" onClick={() => setEditMode(true)}>
                                        <FontAwesomeIcon className="icon" icon={faPen} />
                                        <h4>Edit</h4>
                                      </div>
                                    )}
                                    {editMode && (
                                      <>
                                        <input
                                          type="password"
                                          className="pwd"
                                          value={pwd}
                                          onChange={(e) => setPwd(e.target.value)}
                                        />
                                        <div className="p-edit" onClick={() => setEditMode(false)}>
                                          <FontAwesomeIcon className="p-svg" icon={faTimes} />
                                          
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                                {editMode && (
                                <>     
                                  <div className="p-field">
                                      <div className="p-label">
                                          <h3>Confirm Password</h3>
                                          <input
                                            type="password"
                                            className="confirmpwd"
                                            value={confirmpwd}
                                            onChange={(e) => {
                                              setConfirmpwd(e.target.value);
                                            }}
                                          />
                                      </div>
                                  </div>
                                </> 
                                )} */}
                                <div className="p-buttons">
                                    <button className="p-logout-button" onClick={logout}>Logout</button>
                                    <button className="p-save-button">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
