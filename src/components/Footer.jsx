import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {currentYear} Narasimha Kamath. Built with GitHub Copilot.</p>
        <p className="footer-subtitle">Let's build something amazing together.</p>
      </div>
    </footer>
  );
};

export default Footer;
