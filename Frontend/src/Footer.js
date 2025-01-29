import React from 'react';
import './Footer.css'; // Import CSS for footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className='row-custom mt-custom-3 mb-custom-3'>
          <h2>Research Collaboration Platform</h2>
      <ul className="footer-links mt-custom-3">
          <li><a href="/help">Help</a></li>
          <li><a href="/funding">Funding</a></li>
        </ul>
        </div>
        <div className=' mt-4'></div>
        <p className='mt-custom-3 '>&copy; {new Date().getFullYear()} Research Collaboration Platform. All rights reserved.</p>
        
      </div>
    </footer>
  );
};

export default Footer;
