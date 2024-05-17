import React from "react";
import { useState, useRef, useEffect} from "react";
import {auth, microsoftProvider} from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, sendEmailVerification } from "firebase/auth";
import "./LoginSignUp.css";
import {useAuth} from "../context/AuthContext";
import { useLocation, useNavigate } from 'react-router-dom';
import { set } from "firebase/database";


const LoginSignUp = () => {

    const {signup, currentUser, login} = useAuth();

    const location = useLocation();
    const navigate = useNavigate();
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(location.pathname === '/login');
    useEffect(() => {
        // Update isLoginFormVisible state when the location changes
        setIsLoginFormVisible(location.pathname === '/login');
    }, [location.pathname]);

    useEffect(() => {
        if (currentUser) {
          navigate('/');
        }
      }, [currentUser, navigate]);
    
    const [activeBulletIndex, setActiveBulletIndex] = useState(0);
    const [loginEmail, setLoginEmail] = useState('');
    const [validLoginEmail] = useState(true);
    const [loginEmailFocus, setLoginEmailFocus] = useState(false);

    const [loginPwd, setLoginPwd] = useState('');
    const [validLoginPwd] = useState(true);
    const [loginPwdFocus, setLoginPwdFocus] = useState(false);

    const [regisEmail, setRegisEmail] = useState('');
    const [validRegisEmail] = useState(true);
    const [regisEmailFocus, setRegisEmailFocus] = useState(false);

    // const [regisUsername, setRegisUsername] = useState('');
    // const [validRegisUsername] = useState(true);
    // const [regisUsernameFocus, setRegisUsernameFocus] = useState(false);

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

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleForm = () => {
        const newPath = isLoginFormVisible ? '/signup' : '/login';
        setIsLoginFormVisible(!isLoginFormVisible);
        navigate(newPath);
        setError('');
    };

    const handleBulletClick = (index) => {
        setActiveBulletIndex(index);
    };

    async function handleRegisSubmit(e) {
        e.preventDefault();
        setError('');

        if(regisConfirmPwd !== regisPwd) {
            return setError('Passwords do not match');
        }

        if(!regisEmail || !regisFirstname || !regisLastname || !regisPwd || !regisConfirmPwd) {
            return setError('Please fill in all fields');
        }
        
        if (!regisEmail.endsWith('@cit.edu')) {
            return setError('Please use a Microsoft account with the domain "@cit.edu"');
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(regisPwd)) {
            return setError('Password must be at least 8 characters long and contain at least one uppercase letter and one digit');
        }

        try{
            setLoading(true);
            
            await signup(regisEmail, regisPwd, regisFirstname, regisLastname);

            const user = auth.currentUser;console.log("user:",user);
            await sendVerificationEmail(user);
            signOut(auth);
            toggleForm();

        }catch (e) {
            setError(e.message);
        }
        setLoading(false);
    }

    
    

    async function sendVerificationEmail(user) {
        try {
            if (user) {
                await sendEmailVerification(user);
                setSuccess('Please check your email for a verification link to activate your account.');
                console.log("Verification email sent successfully.");
            }
        } catch (error) {
            console.error("Error sending verification email:", error);
            throw error;
        }
    }

    async function handleLoginSubmit(e) {
        e.preventDefault();
        setError('');
        setSuccess('');

        if(!loginPwd || !loginEmail) {
            return setError('Please fill in all fields');
        }
        
        if (!loginEmail.endsWith('@cit.edu')) {
            return setError('Please use a Microsoft account with the domain "@cit.edu"');
        }

        try{
            setLoading(true);
            
            await login(loginEmail, loginPwd);

        }catch (e) {
            console.log("Error:",e);
            setError('Invalid email or password', e.message);
            if (e.message === 'Please verify your email before logging in.') {
                setError('Please verify your email before logging in.');
              } else {
                setError('Invalid email or password');
              }
        }
        setLoading(false);
    }



    // async function handleSignInWithMicrosoft(e) {
    //     e.preventDefault();

    //     try{
    //         setError('');
    //         setLoading(true);
    //         const error = await signInWithMicrosoft(microsoftProvider);
    //         console.log("error:",error);
    //         if (error) {
    //             setError(error);
    //         }
    //     }catch (e) {
    //         setError('Failed to sign in with Microsoft', e);
    //     }
    //     setLoading(false);
    // }


    

    // const signIn = async (event) => {
    //     event.preventDefault();
    //     try{
    //         await createUserWithEmailAndPassword(auth, loginEmail, loginPwd);
    //     } catch (error) {
    //         console.error(error);
    //     }
        
    // }

    // const signInWithMicrosoft = async () => {
    //     try{
    //         await signInWithPopup(auth, microsoftProvider);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const logout = async () => {
        console.log("Logging out");
        try{
            console.log("Logging out");
            await signOut(auth);

        } catch (error) {
            console.error(error);
        }
    }
    
    console.log(currentUser?.email);

  return (
    <main className={`ls-main ${isLoginFormVisible ? '' : 'ls-sign-up-mode'}`}>
        <div className="ls-box">
            <div className="ls-inner-box">
                <button onClick={logout}>Logout</button>
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

                        {error && (
                            <div className="ls-error">
                                <span>{error}</span>
                            </div>
                        )}

                        {success && (
                            <div className="ls-success">
                                <span>{success}</span>
                            </div>
                        )}

                        <div className="ls-actual-form">
                            <div className="ls-login-input-wrap">
                                <input
                                    type="text"
                                    id="login-username"
                                    required
                                    className={`ls-login-input-field ${loginEmailFocus || loginEmail ? 'active' : ''}`}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    aria-invalid={validLoginEmail ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={()=> setLoginEmailFocus(true)}
                                    onBlur={()=> setLoginEmailFocus(false)}
                                    
                                />
                                <label>Email</label>
                            </div>
                            <div className="ls-login-input-wrap">
                                <input
                                    type="password"
                                    id="login-pwd"
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
                            <span className="ls-subtext-link">Forgot Password?</span>
                            <button onClick={handleLoginSubmit} className="ls-sign-btn">Sign In</button>
                            
                            {/* <div className="ls-ms-sign-in">
                                <span className="ls-subtext">or</span>
                                <button className="ls-ms-btn" onClick={handleSignInWithMicrosoft}>
                                    <img className="ls-ms-btn-img" src="/Assets/ms-sign-in.png"></img>
                                </button>
                            </div> */}
                            
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

                        {error && (
                            <div className="ls-error">
                                <span>{error}</span>
                            </div>
                        )}

                        {success && (
                            <div className="ls-success">
                                <span>{success}</span>
                            </div>
                        )}

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

                            {/* <div className="ls-regis-input-wrap">
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
                            </div> */}

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
                            <button disabled={loading} onClick={handleRegisSubmit} className="ls-sign-btn">Create Account</button>
                            {/* <div className="ls-ms-sign-in">
                                <span className="ls-subtext">or</span>
                                <button className="ls-ms-btn" onClick={handleSignInWithMicrosoft}>
                                    <img className="ls-ms-btn-img" src="/Assets/ms-sign-in.png"></img>
                                </button>
                            </div> */}
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