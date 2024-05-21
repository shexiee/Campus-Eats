import React from "react";
import { useState, useEffect } from "react";
import "./css/ForgotPassword.css";
import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

    const { currentUser, resetPassword } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [emailFocus, setEmailFocus] = useState(false);
    const [validEmail, setValidEmail] = useState(true);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // useEffect(() => {
    //     if (currentUser) {
    //         navigate('/');
    //     }
    // }, []);


    const handleSubmit = async (e) => {  
        e.preventDefault();
        console.log("Submit Code clicked");
        setLoading(true);
        if(!email) {
            setSuccess('');
            return setError('Please enter your email/username');
        }
        

        try{
            setError('');
            setLoading(true);
            
            await resetPassword(email);
            setSuccess('Check your inbox for further instructions. You may close this tab now.');
        
        }catch (error) {
            setSuccess('');
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="fp-main">
            <div className="fp-box" style={{ height: success || error || loading ? '340px' : '280px' }}>
                <div className="fp-inner-box">
                    <div className="fp-forms-wrap">
                        <form className="fp-form">
                            <div className="fp-header">
                               <h1>Forgot Password</h1>
                            </div>
                                {!loading && error && (
                                    <div className="ls-error">
                                        <span>{error}</span>
                                    </div>
                                )}

                                {!loading && success && (
                                    <div className="ls-success">
                                        <span>{success}</span>
                                    </div>
                                )}

                                {loading && (
                                    <div className="ls-loading">
                                        <span>Loading...</span>
                                    </div>
                                )}
                            <div className="fp-actual-form">
                                
                                <div className="fp-input-wrap">
                                    <input
                                        type="text"
                                        id="email"
                                        required
                                        readOnly={loading || success}
                                        className={`fp-input-field ${emailFocus || email ? 'active' : ''}`}
                                        onChange={(e) => setEmail(e.target.value)}
                                        aria-invalid={validEmail ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={()=> setEmailFocus(true)}
                                        onBlur={()=> setEmailFocus(false)}
                                        
                                    />
                                    <label>Email</label>
                                </div>
                                <button disabled={loading || success} onClick={handleSubmit} className="fp-btn">
                                    Reset Password
                                </button>
                            </div>
                            
                        
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ForgotPassword;