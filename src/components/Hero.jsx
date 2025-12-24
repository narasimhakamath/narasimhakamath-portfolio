import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="about" className="hero">
      <div className="hero-content">
        <img src="/NK.png" alt="Narasimha Kamath" className="hero-image" />
        <h1 className="hero-title">
          Hi, I'm <span className="highlight">Narasimha Kamath</span>
        </h1>
        <h2 className="hero-subtitle">Technical Architect</h2>
        <p className="hero-description">
          I love having the freedom to build things end to end. Full-stack engineer with a passion for backend development, 
          currently building Banking-As-A-Service solutions for banks and fintechs. When I'm not coding, you'll find me with 
          a camera or cheering for Manchester City.
        </p>
        <div className="hero-actions">
          <a href="#experience" className="btn btn-primary">View My Work</a>
          <a href="#contact" className="btn btn-secondary">Get In Touch</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
