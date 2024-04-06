import React from "react";
import { useState } from "react";
import "./ForgotPassword.css";

const ResetPassword = () => {
    const [resetPwd, setResetPwd] = useState('');
    const [validResetPwd] = useState(true);
    const [resetPwdFocus, setResetPwdFocus] = useState(false);

    const [resetConfirmPwd, setResetConfirmPwd] = useState('');
    const [validResetConfirmPwd] = useState(true);
    const [resetConfirmPwdFocus, setResetConfirmPwdFocus] = useState(false);

    return (
        <main className="fp-main">
            <div className="fp-box" >
                <div className="fp-inner-box">
                    <div className="fp-forms-wrap">
                        <form className="fp-form">
                            <div className="fp-header">
                               <h1>Reset Password</h1>
                            </div>
                            <div className="fp-actual-form">
                            <div className="fp-input-wrap">
                                <input
                                    type="password"
                                    id="pwd"
                                    required
                                    className={`fp-input-field ${resetPwdFocus || resetPwd ? 'active' : ''}`}
                                    onChange={(e) => setResetPwd(e.target.value)}
                                    aria-invalid={validResetPwd ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={()=> setResetPwdFocus(true)}
                                    onBlur={()=> setResetPwdFocus(false)}
                                />
                                <label>Password</label>
                            </div>

                            <div className="fp-input-wrap">
                                <input
                                    type="password"
                                    id="confirmPwd"
                                    required
                                    className={`fp-input-field ${resetConfirmPwdFocus || resetConfirmPwd ? 'active' : ''}`}
                                    onChange={(e) => setResetConfirmPwd(e.target.value)}
                                    aria-invalid={validResetConfirmPwd ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={()=> setResetConfirmPwdFocus(true)}
                                    onBlur={()=> setResetConfirmPwdFocus(false)}
                                />
                                <label>Confirm Password</label>
                            </div>
                                <input type="submit" value="Log In" className="fp-btn" />
                                
                            </div>
                            
                        
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ResetPassword;