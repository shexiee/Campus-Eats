import React from "react";
import { useState } from "react";
import "./LoginSignUp.css";

const LoginSignUp = () => {

    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);
    const [activeBulletIndex, setActiveBulletIndex] = useState(0);

    const [loginUsername, setLoginUsername] = useState('');
    const [validLoginUsername] = useState(true);
    const [loginUsernameFocus, setLoginUsernameFocus] = useState(false);

    const [loginPwd, setLoginPwd] = useState('');
    const [validLoginPwd] = useState(true);
    const [loginPwdFocus, setLoginPwdFocus] = useState(false);

    const [regisEmail, setRegisEmail] = useState('');
    const [validRegisEmail] = useState(true);
    const [regisEmailFocus, setRegisEmailFocus] = useState(false);

    const [regisUsername, setRegisUsername] = useState('');
    const [validRegisUsername] = useState(true);
    const [regisUsernameFocus, setRegisUsernameFocus] = useState(false);

    const [regisFirstname, setRegisFirstname] = useState('');
    const [validRegisFirstname] = useState(true);
    const [regisFirstnameFocus, setRegisFirstnameFocus] = useState(false);

    const [regisLastname, setRegisLastname] = useState('');
    const [validRegisLastname] = useState(true);
    const [regisLastnameFocus, setRegisLastnameFocus] = useState(false);

    const [regisPwd, setRegisPwd] = useState('');
    const [validRegisPwd] = useState(true);
    const [regisPwdFocus, setRegisPwdFocus] = useState(false);

    const [regisConfirmPwd, setRegisConfirmPwd] = useState('');
    const [validRegisConfirmPwd] = useState(true);
    const [regisConfirmPwdFocus, setRegisConfirmPwdFocus] = useState(false);


    const toggleForm = () => {
        setIsLoginFormVisible(!isLoginFormVisible);
    };

    const handleBulletClick = (index) => {
        setActiveBulletIndex(index);
    };

  return (
    <main className={`ls-main ${isLoginFormVisible ? '' : 'ls-sign-up-mode'}`}>
        <div className="ls-box">
            <div className="ls-inner-box">
                <div className="ls-forms-wrap">
                    <form autoComplete="off" className="ls-form ls-sign-in-form">
                        <div className="ls-logo">
                            <img src="/Assets/logo.png" alt="Campus Eats"/>
                            <span className="ls-logo-title-campus">Campus</span>&nbsp;
                            <span className="ls-logo-title-eats">Eats</span>
                        </div>

                        <div className="ls-heading">
                            <h2>Welcome Back</h2>
                            
                                <h6>Not registered yet?</h6>
                                <span className="ls-text-link" onClick={toggleForm} >&nbsp;Sign up</span>
                            
                        </div>

                        <div className="ls-actual-form">
                            <div className="ls-login-input-wrap">
                                <input
                                    type="text"
                                    id="username"
                                    required
                                    className={`ls-login-input-field ${loginUsernameFocus || loginUsername ? 'active' : ''}`}
                                    onChange={(e) => setLoginUsername(e.target.value)}
                                    aria-invalid={validLoginUsername ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={()=> setLoginUsernameFocus(true)}
                                    onBlur={()=> setLoginUsernameFocus(false)}
                                    
                                />
                                <label>Username/Email</label>
                            </div>
                            <div className="ls-login-input-wrap">
                                <input
                                    type="password"
                                    id="pwd"
                                    required
                                    className={`ls-login-input-field ${loginPwdFocus || loginPwd ? 'active' : ''}`}
                                    onChange={(e) => setLoginPwd(e.target.value)}
                                    aria-invalid={validLoginPwd ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={()=> setLoginPwdFocus(true)}
                                    onBlur={()=> setLoginPwdFocus(false)}
                                />
                                <label>Password</label>
                            </div>

                            <input type="submit" value="Log In" className="ls-sign-btn" />
                            
                            <span className="ls-subtext-link">Forgot Password?</span>
                        </div>

                    </form>

                    <form autoComplete="off" className="ls-form ls-sign-up-form">
                        <div className="ls-logo">
                            <img src="/Assets/logo.png" alt="Campus Eats"/>
                            <span className="ls-logo-title-campus">Campus</span>&nbsp;
                            <span className="ls-logo-title-eats">Eats</span>
                        </div>

                        <div className="ls-heading">
                            <h2>Get Started</h2>
                            
                                <h6>Already have an account?</h6>
                                <span className="ls-text-link" onClick={toggleForm}>&nbsp;Sign in</span>
                            
                        </div>

                        <div className="ls-regis-actual-form">
                            <div className="ls-regis-input-wrap">
                                <input
                                    type="text"
                                    id="email"
                                    required
                                    className={`ls-regis-input-field ${regisEmailFocus || regisEmail ? 'active' : ''}`}
                                    onChange={(e) => setRegisEmail(e.target.value)}
                                    aria-invalid={validRegisEmail ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={()=> setRegisEmailFocus(true)}
                                    onBlur={()=> setRegisEmailFocus(false)}
                                    
                                />
                                <label>Email</label>
                            </div>
                            <div className="ls-regis-fullname-wrap">
                                <div className="ls-regis-fullname-input-wrap">
                                    <input
                                        type="text"
                                        id="firstname"
                                        required
                                        className={`ls-regis-fullname-input-field ${regisFirstnameFocus || regisFirstname ? 'active' : ''}`}
                                        onChange={(e) => setRegisFirstname(e.target.value)}
                                        aria-invalid={validRegisFirstname ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={()=> setRegisFirstnameFocus(true)}
                                        onBlur={()=> setRegisFirstnameFocus(false)}
                                        
                                    />
                                    <label>First Name</label>
                                </div>
                                <div className="ls-regis-fullname-input-wrap">
                                    <input
                                        type="text"
                                        id="lastname"
                                        required
                                        className={`ls-regis-fullname-input-field ${regisLastnameFocus || regisLastname ? 'active' : ''}`}
                                        onChange={(e) => setRegisLastname(e.target.value)}
                                        aria-invalid={validRegisLastname ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={()=> setRegisLastnameFocus(true)}
                                        onBlur={()=> setRegisLastnameFocus(false)}
                                        
                                    />
                                    <label>Last Name</label>
                                </div>
                            </div>

                            <div className="ls-regis-input-wrap">
                                <input
                                    type="text"
                                    id="username"
                                    required
                                    className={`ls-regis-input-field ${regisUsernameFocus || regisUsername ? 'active' : ''}`}
                                    onChange={(e) => setRegisUsername(e.target.value)}
                                    aria-invalid={validRegisUsername ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={()=> setRegisUsernameFocus(true)}
                                    onBlur={()=> setRegisUsernameFocus(false)}
                                    
                                />
                                <label>Username</label>
                            </div>

                            <div className="ls-regis-input-wrap">
                                <input
                                    type="password"
                                    id="pwd"
                                    required
                                    className={`ls-regis-input-field ${regisPwdFocus || regisPwd ? 'active' : ''}`}
                                    onChange={(e) => setRegisPwd(e.target.value)}
                                    aria-invalid={validRegisPwd ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={()=> setRegisPwdFocus(true)}
                                    onBlur={()=> setRegisPwdFocus(false)}
                                />
                                <label>Password</label>
                            </div>

                            <div className="ls-regis-input-wrap">
                                <input
                                    type="password"
                                    id="confirmPwd"
                                    required
                                    className={`ls-regis-input-field ${regisConfirmPwdFocus || regisConfirmPwd ? 'active' : ''}`}
                                    onChange={(e) => setRegisConfirmPwd(e.target.value)}
                                    aria-invalid={validRegisConfirmPwd ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={()=> setRegisConfirmPwdFocus(true)}
                                    onBlur={()=> setRegisConfirmPwdFocus(false)}
                                />
                                <label>Confirm Password</label>
                            </div>

                            <input type="submit" value="Sign Up" className="ls-sign-btn" />
                            
                            {/* <span className="ls-subtext">By signing up, you agree to our <span  className="ls-subtext-link">Terms and Conditions</span> </span> */}
                        </div>

                    </form>
                    
                </div>
                <div className="ls-carousel">
                    <div className="ls-images-wrapper">
                        <img src="/Assets/ls-img1.png" className={`ls-img ls-img1 ${activeBulletIndex === 0 ? 'ls-show' : ''}`} alt="Customer"/>
                        <img src="/Assets/ls-img3.png" className={`ls-img ls-img2 ${activeBulletIndex === 1 ? 'ls-show' : ''}`} alt="Seller"/>
                        <img src="/Assets/ls-img2.png" className={`ls-img ls-img3 ${activeBulletIndex === 2 ? 'ls-show' : ''}`} alt="Courier"/>
                    </div>
                    <div className="ls-text-slider">
                        <div className="ls-text-wrap">
                            <div className="ls-text-group" style={{ transform: `translateY(${activeBulletIndex * -2.2}rem)` }}>
                                <h2>Skip the hassle</h2>
                                <h2>Deliver and earn</h2>
                                <h2>Get your food seen</h2>
                            </div>
                            
                        </div>
                        <div className="ls-bullets">
                            <span
                                className={activeBulletIndex === 0 ? "ls-bullet-active" : ""}
                                onClick={() => handleBulletClick(0)}
                            ></span>
                            <span
                                className={activeBulletIndex === 1 ? "ls-bullet-active" : ""}
                                onClick={() => handleBulletClick(1)}
                            ></span>
                            <span
                                className={activeBulletIndex === 2 ? "ls-bullet-active" : ""}
                                onClick={() => handleBulletClick(2)}
                            ></span>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}

export default LoginSignUp;