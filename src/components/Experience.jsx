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
      description: 'Leading the architecture and development of Virtual Account Management (VAM) and Ledgers application, a Banking-As-A-Service solution for banks and fintechs.',
      achievements: [
        'Built the entire VAM/Ledgers application from ground up',
        'Lead and mentor a team of 4 engineers (developers and QAs)',
        'Work closely with National Bank of Bahrain (NBB) for product implementation'
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
        'Designed and implemented core banking ledger system architecture',
        'Established development practices and code standards for the team',
        'Collaborated with stakeholders to define product requirements'
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
        'Built high-performance APIs serving millions of requests',
        'Optimized database queries and improved system performance',
        'Mentored junior developers and conducted code reviews'
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
        'Developed features for distribution and sales automation platform',
        'Worked on both frontend and backend technologies',
        'Collaborated with cross-functional teams to deliver quality software'
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
      description: 'Completed intensive software development internship program focused on full-stack web development.',
      achievements: [
        'Learned and applied modern web development technologies',
        'Built projects using JavaScript, Node.js, and databases',
        'Participated in code reviews and collaborative development'
      ]
    }
  ];

  const downloadResume = () => {
    // Create a sample resume download
    // In production, replace with actual resume file
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Place your resume.pdf in the public folder
    link.download = 'Narasimha_Kamath_Resume.pdf';
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
            📄 Download Resume
          </button>
        </div>
        
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
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
                  <div className="experience-header">
                    <div className="title-wrapper">
                      <h3 className="experience-title">{exp.title}</h3>
                      <h4 className="experience-company">{exp.company}</h4>
                    </div>
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
                </a>
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
