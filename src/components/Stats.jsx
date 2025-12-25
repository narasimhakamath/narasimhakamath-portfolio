import React from 'react';
import './Stats.css';

const Stats = () => {
  const stats = [
    {
      number: '6+',
      label: 'Years Experience'
    },
    {
      number: '3',
      label: 'Major Products Built'
    },
    {
      number: '100%',
      label: 'Passion for Code'
    }
  ];

  return (
    <section className="stats">
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
