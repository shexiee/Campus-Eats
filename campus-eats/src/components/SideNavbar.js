import React, {useState, useRef, useEffect} from 'react';
import './css/Navbar.css'; 
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faAngleDown, faUser, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import CartModal from './CartModal';

const SideNavbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);
    const [profilePicURL, setProfilePicURL] = useState('/Assets/profile-picture.jpg');
    const [dropdownActive, setDropdownActive] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
        console.log(currentUser);
    }, [logout, navigate, currentUser]);
    
    
  return (
    <div>
        <div className="nav-side">
            <div className="image-wrapper">
            <Link to="/" style={{textDecoration: 'none'}}>
                <img src={'/Assets/logo.svg'} alt="Logo" className="nb-logo" />
            </Link>
            </div>
            <div className='nav'>
                <ul>
                    <li className={`nb-icon ${location.pathname === '/' ? 'active' : ''}`}>
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
    </div>
  );
}

export default SideNavbar;