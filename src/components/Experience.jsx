import React, { useEffect } from 'react';
import { sendGAEvent } from '../ga4';
import { initParallaxCards } from '../utils/parallax';
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
      description: 'Architect and primary backend engineer for FinHub Track, a BaaS (Banking-As-A-Service) platform deployed on-premise across regulated institutions — managing virtual account lifecycle, POBO/COBO, digital wallet flows, transaction processing, and automated ledger reconciliation for corporate banking customers at scale.',
      achievements: [
        'Eliminated performance bottlenecks within NodeJS microservices by optimizing MongoDB read patterns, implementing Redis multi-layer caching, and BullMQ job processing — achieve 6x throughput improvement across Kubernetes-orchestrated clusters while preserving transactional integrity.',
        'Engineered fault-tolerant financial workflows using idempotency keys, distributed locking, state-machine based retry logic, and circuit breakers — ensuring exactly-once processing guarantees in money-movement operations even across network failures and service restarts.',
        'Delivered an intelligent ledger reconciliation system that reduced manual financial team intervention by 70% through deterministic matching algorithms — maintaining full audit trails and human oversight for regulatory compliance.',
        'Developed a LLM powered chatbot prototype enabling natural language querying of transaction data and account insights, with strict role-based access controls ensuring data security at the query level.'
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
        'Established technical standards and architecture patterns for NodeJS and MongoDB stack; evaluated SQL vs NoSQL tradeoffs for banking workloads.',
        'Led and mentored a team of upto 5 engineers, establishing technical standards through design reviews and code reviews whilst remaining hands-on across compliance-sensitive deliverables.'
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
      description: 'Architected multi-tenant SaaS solutions for enterprise clients',
      achievements: [
        'Delivered and scalable E-Invoice system build on PHP and MySQL — processing invoices daily and peaking at the end of the month, with in-memory caching and queue-based asyncrhonous processing ensuring high availability and full GST compliance.',
        'Architected a multi-region white-label mobile application (Android and iOS) across various global markets via custom CI/CD pipelines, generating tenant-specific React Native builds with configurable branding, i18n (RTL/LTR), locale-aware formatting, and feature flags from a single codebase.'
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
      description: 'Built and operated backend services for a multi-tenant SaaS (Software-As-A-Service) platform serving enterprise clients.',
      achievements: [
        'Strengthened platform security by implementing robust access control policies and password management systems in compliance with ISO 27001 standards, ensuring high-level data protection for enterprise clients across multiple jurisdictions.',
        'Resolved production database degradation through MySQL query optimization, strategic indexing, and server-side pagination — significantly improving API response times under high-concurrency workflows.',
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
    sendGAEvent('resume_download', {
      event_category: 'engagement',
      event_label: 'Download Resume',
    });
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Narasimha Kamath.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Initialize parallax effect
  useEffect(() => {
    initParallaxCards('.timeline-content', {
      maxTilt: 5,
      scale: 1.01,
      speed: 500,
      glare: true,
      glareMaxOpacity: 0.15
    });
  }, []);

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
