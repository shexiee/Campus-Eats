import React, { useState, useEffect } from "react";
import "./css/userprofile.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import Navbar from "./Navbar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const UserProfile = () => {
    const { logout, currentUser } = useAuth(); // Make sure to include the logout function
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [dob, setDob] = useState('');
    const [confirmpwd, setConfirmpwd] = useState('');
    const [pwd, setPwd] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [username, setUsername] = useState('Lexianna');
    const [editUsername, setEditUsername] = useState(false);
    const [courseYear, setCourseYear] = useState('');
    const [schoolId, setSchoolId] = useState('');

    useEffect(() => {
      const fetchUserData = async () => {
          if (currentUser) {
              const userRef = doc(db, "users", currentUser.uid);
              const userSnap = await getDoc(userRef);
              if (userSnap.exists()) {
                  const userData = userSnap.data();
                  setFirstName(userData.fullname.split(' ')[0]);
                  setLastName(userData.fullname.split(' ')[1]);
                  setUsername(userData.username);
                  setContactNumber(userData.phone_number || '');
                  setDob(userData.dob || '');
                  setCourseYear(userData.course_yr || '');
                  setSchoolId(userData.school_id || '');
              }
          }
      };
      fetchUserData();
      console.log(username);
  }, [currentUser]);
    return (
      <>
          <Navbar />
  
          <div className="p-body">
              <div className="p-content-current">
                  <div className="p-card-current">
                      <div className="p-container">
                          <div className="p-content">
                              <div className="p-img-holder">
                                  <img src='/Assets/Panda.png' alt="food" className="p-img"/>
                              </div>
                              <div className="p-text">
                                  {editUsername ? (
                                      <div className="p-username-edit">
                                          <input
                                              type="text"
                                              value={username}
                                              onChange={(e) => setUsername(e.target.value)}
                                              className="username-input"
                                          />
                                          <div className="p-edit" onClick={() => setEditUsername(false)}>
                                              <FontAwesomeIcon style={{fontSize: '15px'}} icon={faTimes} />
                                              
                                          </div>
                                      </div>
                                  ) : (
                                      <div className="p-username">
                                          <h3>{username}</h3>
                                          <div className="p-edit" onClick={() => setEditUsername(true)}>
                                              <FontAwesomeIcon style={{fontSize: '12px'}} icon={faPen} />
                                              
                                          </div>
                                      </div>
                                  )}
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
                              <div className="p-buttons">
                                  <button className="p-logout-button" onClick={logout}>Logout</button>
                                  <button className="p-save-button">Save</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="p-content-current p-content-current-small">
                  <div className="p-card-current">
                      <div className="p-upgrade-container">
                          <div className="p-content">
                              <div className="p-upgrade-text">
                                  <h3>Account Type</h3>
                                  <h4>Regular</h4>
                              </div>
                          </div>
                          <div className="p-info">
                              <div className="p-upgrade-buttons">
                                  <button className="p-upgrade-button" >Be a Dasher</button>
                                  <button onClick={()=>navigate('/shop-application')} className="p-upgrade-button">Add a Shop</button>
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
