import React from "react";
import { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailFocus, setEmailFocus] = useState(false);
    const [validEmail, setValidEmail] = useState(true);

    const [code, setCode] = useState('');
    const [codeFocus, setCodeFocus] = useState(false);
    const [validCode, setValidCode] = useState(true);
    const [codeSent, setCodeSent] = useState(false);

    const handleGetCodeClick = (e) => {
        e.preventDefault();
        console.log("Get Code clicked");
        setCodeSent(true);
    }

    const handleSubmitCode = (e) => {  
        e.preventDefault();
        console.log("Submit Code clicked");
    }

    return (
        <main className="fp-main">
            <div className="fp-box" style={{ height: codeSent ? '400px' : '320px' }}>
                <div className="fp-inner-box">
                    <div className="fp-forms-wrap">
                        <form className="fp-form">
                            <div className="fp-header">
                               <h1>Forgot Password</h1>
                                <span className="small-text">Enter your email and we'll send you a verification code</span>
                            </div>
                            <div className="fp-actual-form">
                                <div className="fp-input-wrap">
                                    <input
                                        type="text"
                                        id="email"
                                        required
                                        readOnly={codeSent}
                                        className={`fp-input-field ${emailFocus || email ? 'active' : ''}`}
                                        onChange={(e) => setEmail(e.target.value)}
                                        aria-invalid={validEmail ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={()=> setEmailFocus(true)}
                                        onBlur={()=> setEmailFocus(false)}
                                        
                                    />
                                    <label>Email</label>
                                </div>
                                {codeSent && (
                                    <div className="fp-input-wrap">
                                        <input
                                            type="text"
                                            id="code"
                                            required
                                            className={`fp-input-field ${codeFocus || code ? 'active' : ''}`}
                                            onChange={(e) => setCode(e.target.value)}
                                            aria-invalid={validEmail ? "false" : "true"}
                                            aria-describedby="uidnote"
                                            onFocus={()=> setCodeFocus(true)}
                                            onBlur={()=> setCodeFocus(false)}
                                            
                                        />
                                        <label>Code</label>
                                    </div>
                                )}
                                
                                <button onClick={codeSent ? handleSubmitCode : handleGetCodeClick} className="fp-btn">
                                    {codeSent ? "Submit Code" : "Get Code"}
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