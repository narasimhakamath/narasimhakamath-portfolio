import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="about" className="hero">
      <div className="hero-content">
        <img src="/NK.png" alt="Narasimha Kamath" className="hero-image" />
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="highlight">Narasimha Kamath</span>
          </h1>
          <h2 className="hero-subtitle">Software Engineer</h2>
          {/* <p className="hero-description">
            Software Engineer | Building scalable, reliable systems that drive impact.</p> */}
          <p className="hero-description-sub">
            Experienced in crafting clean, maintainable code and solving complex challenges with modern architecture. Passionate about delivering high-quality softwares that scales and delights users.
          </p>
          <p className="hero-description-sub">
            When I'm not coding, I capture the world through photography and cheer for Manchester City through every thrilling match.
          </p>
          <div className="hero-actions">
            <a href="#experience" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
