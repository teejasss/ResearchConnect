import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext); 
  // const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  // Function to get a cookie value by name
  // const getCookie = (name) => {
  //   const cookieArr = document.cookie.split('; ');
  //   console.log("cookie", cookieArr);
  //   for (const cookie of cookieArr) {
  //     const [key, value] = cookie.split('=');
  //     if (key === "user_name") {console.log("key, value", key, value);return value;}
  //   }
  //   return null;
  // };

  // Check for logged-in user on component mount
  // useEffect(() => {
  //   const token = getCookie('token');
  //   console.log("token",token); // Get token from cookies
  //   setIsLoggedIn(!!token); // If token exists, set isLoggedIn to true
  // }, []);
  
  // useEffect(() => {
  //   console.log("isLoggedIN",isLoggedIn);
    
  // }, [isLoggedIn]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/'; // Clear the token cookie
    // setIsLoggedIn(false);
    logout(); // Update global state from context
    navigate('/'); // Redirect to the home page
  };

  // Effect to handle window resizing
  useEffect(() => {
    const handleResize = () => {
      // Close navbar if in desktop view
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    // Listen for resize events
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="header-custom">
      <nav className="navbar-custom">
        <Link to="/" className="navbar-brand-custom">Research Collaboration</Link>

        {/* Hamburger menu for mobile */}
        <button className="navbar-toggler-custom" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon-custom"></span>
          <span className="navbar-toggler-icon-custom"></span>
          <span className="navbar-toggler-icon-custom"></span>
        </button>

        {/* Navigation links */}
        <div className={`navbar-collapse-custom ${isOpen ? 'active' : ''}`}>
          <ul className="navbar-nav-custom">
            <li className="nav-item-custom">
              <Link to="/" className="nav-link-custom">Home</Link>
            </li>
            <li className="nav-item-custom">
              <Link to="/profile" className="nav-link-custom">Profile</Link>
            </li>
            <li className="nav-item-custom">
              <Link to="/projects" className="nav-link-custom">Projects</Link>
            </li>
            <li className="nav-item-custom">
              <Link to="/events" className="nav-link-custom">Events</Link>
            </li>
            <li className="nav-item-custom">
              <Link to="/funding" className="nav-link-custom">Funding</Link>
            </li>
            <li className="nav-item-custom">
              <Link to="/collaboration" className="nav-link-custom">Collaboration</Link>
            </li>
            <li className="nav-item-custom">
              <Link to="/help" className="nav-link-custom">Help</Link>
            </li>
            {isLoggedIn ? (
              <li className="nav-item-custom">
              <span
                className="nav-link-custom"
                onClick={handleLogout}
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
              >
                Logout
              </span>
            </li>
            ) : (
              <li className="nav-item-custom">
                <Link to="/login" className="nav-link-custom">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
