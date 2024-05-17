import React from 'react';
import './css/Navbar.css'; 
// import logo from '../Assets/logo.svg';
// import dashboard from './Assets/dashboard.svg';
// import orders from './Assets/orders.svg';
// import profile from './Assets/profile.svg';
// import shop from './Assets/shop.svg';
// import signout from './Assets/signout.svg';

const NavBar = () => {
  return (
    <div>
      <div className="nav-top">
        <span className="campus">Campus</span>
        <span className="eats">Eats</span>
        <span className="campus-text">Cebu Institute of Technology - University</span>

      </div>

      <div className="nav-side">
        <div className="image-wrapper">
          <img src={'/Assets/logo.png'} alt="Logo" className="logo" />
        </div>
        <div className='nav'>
          <ul>
            <li>
              <img src={dashboard} alt="Dashboard" className="nav-image" />
            </li>
            <li>
              <img src={orders} alt="Orders" className="nav-image" />
            </li>
            <li>
              <img src={profile} alt="Profile" className="nav-image" />
            </li>
            <li>
              <img src={shop} alt="Sign Out" className="nav-image" />
            </li>
            <li>
              <img src={signout} alt="Sign out" className="signout" />
            </li>
          </ul>
        </div>
      </div>
      
    </div>
  );
}

export default NavBar;