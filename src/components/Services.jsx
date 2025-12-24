import React from 'react';
import './Services.css';

const Services = () => {
  const services = [
    {
      title: 'Technical Consulting',
      description: 'Architecture consulting and technical leadership for startups and enterprises. Specializing in Banking-As-A-Service solutions and scalable systems.',
      icon: '💼'
    },
    {
      title: 'Full-Stack Development',
      description: 'End-to-end application development using modern JavaScript stack. From database design to frontend implementation and deployment.',
      icon: '⚡'
    },
    {
      title: 'Code Review & Audit',
      description: 'Professional code reviews and architecture audits to improve code quality, performance, and maintainability of your applications.',
      icon: '🔍'
    }
  ];

  return (
    <section id="services" className="services">
      <div className="services-container">
        <h2 className="section-title">What I Do</h2>
        <p className="section-subtitle">How I can help you succeed</p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <p>Interested in working together?</p>
          <a href="#contact" className="cta-button">Get In Touch</a>
        </div>
      </div>
    </section>
  );
};

export default Services;
