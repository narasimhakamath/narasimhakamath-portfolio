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
          <h2 className="hero-subtitle">Software Architect</h2>
          <p className="hero-description">
            I like systems — in software, cinema, and football.</p>
            <p className="hero-description-sub">
            Software Engineer bringing systems thinking to code and craft.
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
