import React, {useState, useRef, useEffect} from 'react';
import './css/Navbar.css'; 
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faAngleDown, faUser, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import CartModal from './CartModal';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);
    const [profilePicURL, setProfilePicURL] = useState('/Assets/profile-picture.jpg');
    const [dropdownActive, setDropdownActive] = useState(false);
    const [showModal, setShowModal] = useState(false);

    
    
    const CloseShowModal = () => {
        setShowModal(false);
    }

    const toggleDropdown = () => {
        setDropdownActive(!dropdownActive);
    };

    const closeDropdown = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownActive(false);
        }
    };

    useEffect(() => {
        if (currentUser?.photoURL) {
            setProfilePicURL(currentUser.photoURL);
        }
          
    }, [currentUser]);

    useEffect(() => {
        document.addEventListener('mousedown', closeDropdown);
        return () => {
            document.removeEventListener('mousedown', closeDropdown);
        };
        
    }, []);

  return (
    <div>
      <div className="nav-top">
        <Link to="/" style={{textDecoration: 'none'}}>
        <div className='nav-logo'>
            <span className="campus">Campus</span>
            <span className="eats">Eats</span>
            <span className="campus-text">Cebu Institute of Technology - University</span>
        
        </div>
        </Link>
        
        <div className='right-nav'>
            {currentUser ? (
                <>
                    <div className='nb-profile-dropdown' ref={dropdownRef}>
                        <div className='nb-profile-dropdown-btn' onClick={toggleDropdown}>
                            <div className='nb-profile-img'>
                                <img src={profilePicURL} alt="Profile" className="nb-profile-img" />
                                <FontAwesomeIcon icon={faCircle} style={{ position: 'absolute', bottom: '0.2rem', right: '0', fontSize: '0.7rem', color: '#37be6b' }} />
                            </div>
                            <span>
                                {currentUser.displayName}
                                <FontAwesomeIcon icon={faAngleDown} style={{ padding: '2px 0 0 4px', fontSize: '1rem', color: '#d2627e' }} />
                            </span>
                        </div>
                        <ul className={`nb-profile-dropdown-list ${dropdownActive ? 'active' : ''}`}>
                            <li className="nb-profile-dropdown-list-item">
                                <Link to="/profile">
                                    <div className='nb-profile-dropdown-list-item-icon'>
                                        <FontAwesomeIcon icon={faUser} style={{ fontSize: '1rem', color: 'white' }} />
                                    </div>
                                    Edit Profile
                                </Link>
                            </li>
                            <li className="nb-profile-dropdown-list-item">
                                <a href="#" onClick={logout}>
                                    <div className='nb-profile-dropdown-list-item-icon'>
                                        <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '1rem', color: 'white' }} />
                                    </div>
                                    Log out
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='nb-cart' onClick={() => setShowModal(!showModal)}>
                        <div className='nb-cart-icon'>
                            <img src={'/Assets/cart.png'} alt="Cart" className="nb-image-cart" />
                        </div>
                        <div className='nb-cart-count'>
                            <span>0</span>
                        </div>
                    </div>
                </>
            ) : (
                <div className="navbar-buttons">
                    <button onClick={() => navigate('/signup')} className="signup-button">Sign up</button>
                    <button onClick={() => navigate('/login')} className="login-button">Login</button>
                </div>
            )}
        </div>


      </div>
        
        <div className="nav-side">
            <div className="image-wrapper">
            <Link to="/" style={{textDecoration: 'none'}}>
                <img src={'/Assets/logo.svg'} alt="Logo" className="nb-logo" />
            </Link>
            </div>
            <div className='nav'>
                <ul>
                    <li className={`nb-icon ${location.pathname === '/home' ? 'active' : ''}`}>
                        <Link to="/">
                            <div className="svg-container">
                                <img src={'/Assets/dashboard.svg'} alt="Dashboard" className="nb-image" />
                            </div>
                        </Link>
                    </li>
                    <li className={`nb-icon ${location.pathname === '/orders' ? 'active' : ''}`}>
                        <Link to="/orders">
                            <div className="svg-container">
                                <img src={'/Assets/orders.svg'} alt="Orders" className={`nb-image ${location.pathname === '/orders' ? 'active' : ''}`} />
                            </div>
                        </Link>
                    </li>
                    <li className={`nb-icon ${location.pathname === '/profile' ? 'active' : ''}`}>
                        <Link to="/profile">
                            <div className="svg-container">
                                <img src={'/Assets/profile.svg'} alt="Profile" className={`nb-image ${location.pathname === '/profile' ? 'active' : ''}`} />
                            </div>
                        </Link>
                    </li>
                    <li className={`nb-icon ${location.pathname === '/shop' ? 'active' : ''}`}>
                        <Link to="/shop">
                            <div className="svg-container">
                                <img src={'/Assets/shop.svg'} alt="Shop" className={`nb-image ${location.pathname === '/shop' ? 'active' : ''}`} />
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
        
        
      {showModal && <CartModal showModal={showModal} onClose={CloseShowModal} />}
    </div>
  );
}

export default Navbar;