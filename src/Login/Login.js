import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <main className="login-main-bg">
        <div className="login-container">
            <div className="login-img">
                
                
                <img className="img-login" src="/Assets/loginimg.png" alt="left img" />
                
            </div>
            <div className="login-form">
                <div className="logo-title">
                    <img src="/Assets/logo.png" alt="logo"/>
                    <span className="logo-title-campus">Campus</span>&nbsp;
                    <span className="logo-title-eats">Eats</span>
                </div>

                <h1>Welcome back!</h1>

                <span className="span-subtitle">Panugo na ari!</span>
            </div>
        </div>
    </main>
  );
}

export default Login;