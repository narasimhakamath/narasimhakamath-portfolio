import React from 'react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: 'Technical Architect',
      company: 'DataNimbus Inc',
      companyUrl: 'https://www.linkedin.com/company/datanimbusinc',
      logo: '/logos/DataNimbus.jpeg',
      logoInitial: 'D',
      period: 'July 2025 - Present',
      location: 'Bengaluru, India',
      description: 'Leading the architecture and development of Virtual Account Management (VAM) application, a Banking-As-A-Service solution for modern banks and fintechs.',
      achievements: [
        'Architected Banking-as-a-Service (Virtual Account Management) platform for banking clients (National Bank of Bahrain, Kotak Life Insurance, Bandhan Bank) targeting markets in India, UAE, and Bahrain, and delivered technical and product demos to business and technical stakeholders.',
        'Identified performance bottleneck via load testing; designed caching layer and MongoDB read optimization, increasing TPS (Transactions Per Second) from 200 to 1,200.',
        'Designed automated reconciliation system with AI-powered suggestions to match ledger entries against bank statements and surface anomalies, reducing manual intervention for financial operations'
      ]
    },
    {
      id: 2,
      title: 'Technical Lead',
      company: 'DataNimbus Inc',
      companyUrl: 'https://www.linkedin.com/company/datanimbusinc',
      logo: '/logos/DataNimbus.jpeg',
      logoInitial: 'D',
      period: 'April 2024 - July 2025',
      location: 'Bengaluru, India',
      description: 'Led technical development initiatives and established the foundation for the Banking-As-A-Service platform.',
      achievements: [
        'Established technical standards and architecture patterns for NodeJS/MongoDB/Kubernetes stack; evaluated SQL vs NoSQL tradeoffs for banking workloads.',
        'Designed regional system split (Bahrain/UAE) for improved scalability and independent maintenance of multi-tenant banking infrastructure'
      ]
    },
    {
      id: 3,
      title: 'Senior Software Engineer',
      company: 'Mobisy Technologies Pvt. Ltd. (Bizom)',
      companyUrl: 'https://www.linkedin.com/company/mobisy-technologies-pvt-ltd',
      logo: '/logos/Bizom.jpeg',
      logoInitial: 'B',
      period: 'January 2022 - April 2024',
      location: 'Bengaluru, India',
      description: 'Developed and maintained scalable backend systems for retail distribution management platform.',
      achievements: [
        'Architected multi-tenant white-label platform with full i18n/l10n (RTL, LTR, translations, locale-specific formatting) across React Native, DB-driven feature flags, and isolated API endpoints for 3 regional deployments (India, UAE, and Saudi Arabia).',
        'Designed high-throughput E-Invoicing system (NodeJS, MongoDB) processing 200K-300K invoices per day (scaling to 800K+ at month-end) for GST compliance across multi-tenant SaaS infrastructure.',
        'Resolved critical database performance issues through MySQL query optimization and indexing, and implemented server-side pagination for complex UI modules.'
      ]
    },
    {
      id: 4,
      title: 'Software Engineer',
      company: 'Mobisy Technologies Pvt. Ltd. (Bizom)',
      companyUrl: 'https://www.linkedin.com/company/mobisy-technologies-pvt-ltd',
      logo: '/logos/Bizom.jpeg',
      logoInitial: 'B',
      period: 'August 2018 - January 2022',
      location: 'Bengaluru, India',
      description: 'Contributed to full-stack development of enterprise retail solutions.',
      achievements: [
        'Developed customer-facing features using PHP, MySQL, and NodeJS, contributing to core product functionality for enterprise clients.',
        'Strengthened platform security by implementing ISO-compliant password management policies, including automated rotation cycles, historical password restrictions, and mandatory first-login resets for enterprise users.',
      ]
    },
    {
      id: 5,
      title: 'Software Engineer Intern',
      company: 'MountBlue Technologies',
      companyUrl: 'https://www.linkedin.com/company/mountblue-technologies',
      logo: '/logos/MountBlue.jpeg',
      logoInitial: 'M',
      period: 'June 2018 - August 2018',
      location: 'Bengaluru, India',
      description: 'Completed intensive coding bootcamp',
      achievements: [
        'Accelerated through a rigorous JavaScript-focused curriculum, gaining proficiency in asynchronous programming, state management (React), and NoSQL database design.',
      ]
    }
  ];

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Narasimha Kamath.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="experience" className="experience">
      <div className="experience-container">
        <div className="section-header">
          <h2 className="section-title">Work Experience</h2>
          <button onClick={downloadResume} className="download-btn">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{marginRight: '0.5rem'}}>
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            Download Resume
          </button>
        </div>
        
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="experience-header">
                  <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="company-link">
                    <div className="company-logo-wrapper">
                      <img 
                        src={exp.logo} 
                        alt={`${exp.company} logo`} 
                        className="company-logo-img"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <span className="company-logo-initial" style={{display: 'none'}}>{exp.logoInitial}</span>
                    </div>
                    <div className="title-wrapper">
                      <h3 className="experience-title">{exp.title}</h3>
                      <h4 className="experience-company">{exp.company}</h4>
                    </div>
                  </a>
                  <div className="experience-meta">
                    <span className="experience-period">{exp.period}</span>
                    <span className="experience-location">
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      {exp.location}
                    </span>
                  </div>
                </div>
                <p className="experience-description">{exp.description}</p>
                <ul className="achievement-list">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
