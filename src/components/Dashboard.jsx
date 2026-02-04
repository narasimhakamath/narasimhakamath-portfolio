import React from 'react';
import './Dashboard.css';
import { ResumeDownloadsChart, PageViewsChart, TopCountriesChart, EngagementChart, DeviceTypeChart } from './DashboardCharts';

const Dashboard = () => {
  return (
    <section id="dashboard" className="dashboard">
      <div className="dashboard-container">
        <h2 className="section-title">Analytics Dashboard</h2>
        <p className="section-subtitle">View your website analytics and engagement data</p>
        {/* KPI header: top quick metrics */}
        <div className="dashboard-kpis">
          {(() => {
            const fmt = (v) => new Intl.NumberFormat().format(v);
            const metrics = [
              { id: 'views', label: 'Page Views', value: 12345 },
              { id: 'downloads', label: 'Resume Downloads', value: 123 },
              { id: 'blog', label: 'Blog Post Clicks', value: 456 }
            ];
            return metrics.map(m => (
              <div key={m.id} className="kpi-card">
                <div className="kpi-label">{m.label}</div>
                <div className="kpi-value">{fmt(m.value)}</div>
              </div>
            ));
          })()}
        </div>

        {/* Social Media Clicks */}
        <div className="dashboard-kpis social-metrics">
          {(() => {
            const fmt = (v) => new Intl.NumberFormat().format(v);
            const socialMetrics = [
              { id: 'linkedin', label: 'LinkedIn', value: 234 },
              { id: 'github', label: 'GitHub', value: 189 },
              { id: 'instagram', label: 'Instagram', value: 156 },
              { id: 'medium', label: 'Medium', value: 98 },
              { id: 'whatsapp', label: 'WhatsApp', value: 67 },
              { id: 'leetcode', label: 'LeetCode', value: 45 }
            ];
            return socialMetrics.map(m => (
              <div key={m.id} className="kpi-card">
                <div className="kpi-label">{m.label}</div>
                <div className="kpi-value">{fmt(m.value)}</div>
              </div>
            ));
          })()}
        </div>
        {/* Row 1: Top Countries + Resume Downloads */}
        <div className="dashboard-chart-row">
          <div className="dashboard-card chart-card-pie">
            <h3>Top Countries</h3>
            <div className="chart-container">
              <TopCountriesChart
                data={{
                  labels: ['India', 'USA', 'UK', 'Germany'],
                  datasets: [{
                    label: 'Users',
                    data: [60, 30, 15, 10],
                    backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
                  }],
                }}
                options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
              />
            </div>
          </div>
          <div className="dashboard-card chart-card-bar">
            <h3>Resume Downloads</h3>
            <div className="chart-container">
              <ResumeDownloadsChart
                data={{
                  labels: [
                    'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'
                  ],
                  datasets: [{
                    label: 'Downloads',
                    data: [8, 12, 19, 7, 14, 10, 15, 18, 13, 9, 11, 16],
                  }],
                }}
                options={{ responsive: true, plugins: { legend: { display: false } } }}
              />
            </div>
          </div>
        </div>
        {/* Row 2: Device Type + Page Views */}
        <div className="dashboard-chart-row">
          <div className="dashboard-card chart-card-pie">
            <h3>Device Type</h3>
            <div className="chart-container">
              <DeviceTypeChart
                data={{
                  labels: ['Mobile', 'Desktop', 'Tablet'],
                  datasets: [{
                    label: 'Device Type',
                    data: [4200, 8100, 400],
                  }]
                }}
                options={{ responsive: true }}
              />
            </div>
          </div>
          <div className="dashboard-card chart-card-bar">
            <h3>Page Views</h3>
            <div className="chart-container">
              <PageViewsChart
                data={{
                  labels: [
                    'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'
                  ],
                  datasets: [{
                    label: 'Views',
                    data: [110, 120, 150, 90, 170, 130, 160, 140, 180, 155, 165, 175],
                  }],
                }}
                options={{ responsive: true, plugins: { legend: { display: false } } }}
              />
            </div>
          </div>
        </div>
        {/* Page Views Table */}
        <div className="dashboard-table-section">
          <h3 className="table-title">Recent Page Views</h3>
          <PageViewsTable />
        </div>
      </div>
    </section>
  );
};

// PageViewsTable component with pagination
const PageViewsTable = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Sample data - replace with real GA4 data later
  const allViews = [
    { id: 1, city: 'Mumbai', country: 'India', device: 'Mobile', duration: '2m 34s', source: 'google', referrer: 'https://www.google.com/search', timestamp: new Date('2026-01-22T22:30:00') },
    { id: 2, city: 'New York', country: 'USA', device: 'Desktop', duration: '5m 12s', source: 'linkedin', referrer: 'https://www.linkedin.com/feed/', timestamp: new Date('2026-01-22T18:45:00') },
    { id: 3, city: 'London', country: 'UK', device: 'Tablet', duration: '1m 20s', source: 'direct', referrer: '(direct)', timestamp: new Date('2026-01-22T14:20:00') },
    { id: 4, city: 'Berlin', country: 'Germany', device: 'Desktop', duration: '3m 45s', source: 'github', referrer: 'https://github.com/narasimhakamath', timestamp: new Date('2026-01-22T09:15:00') },
    { id: 5, city: 'Bangalore', country: 'India', device: 'Mobile', duration: '4m 10s', source: 'twitter', referrer: 'https://twitter.com/', timestamp: new Date('2026-01-21T23:50:00') },
    { id: 6, city: 'San Francisco', country: 'USA', device: 'Mobile', duration: '1m 55s', source: 'google', referrer: 'https://www.google.com/search', timestamp: new Date('2026-01-21T20:30:00') },
    { id: 7, city: 'Toronto', country: 'Canada', device: 'Desktop', duration: '6m 22s', source: 'medium', referrer: 'https://medium.com/@narasimhakamath', timestamp: new Date('2026-01-21T17:10:00') },
    { id: 8, city: 'Sydney', country: 'Australia', device: 'Mobile', duration: '2m 18s', source: 'direct', referrer: '(direct)', timestamp: new Date('2026-01-21T12:05:00') },
    { id: 9, city: 'Paris', country: 'France', device: 'Desktop', duration: '3m 30s', source: 'linkedin', referrer: 'https://www.linkedin.com/in/thenarasimhakamath', timestamp: new Date('2026-01-21T08:45:00') },
    { id: 10, city: 'Tokyo', country: 'Japan', device: 'Tablet', duration: '4m 05s', source: 'google', referrer: 'https://www.google.co.jp/search', timestamp: new Date('2026-01-20T22:20:00') },
    { id: 11, city: 'Delhi', country: 'India', device: 'Desktop', duration: '7m 12s', source: 'github', referrer: 'https://github.com/narasimhakamath', timestamp: new Date('2026-01-20T19:30:00') },
    { id: 12, city: 'São Paulo', country: 'Brazil', device: 'Mobile', duration: '2m 40s', source: 'instagram', referrer: 'https://www.instagram.com/', timestamp: new Date('2026-01-20T15:55:00') },
  ];

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateStr = date.toLocaleDateString('en-US', options);
    const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${dateStr} ${timeStr}`;
  };

  const totalPages = Math.ceil(allViews.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const currentViews = allViews.slice(startIdx, startIdx + rowsPerPage);

  return (
    <div className="table-container">
      <table className="page-views-table">
        <thead>
          <tr>
            <th>City</th>
            <th>Device</th>
            <th>Duration</th>
            <th>Source</th>
            <th>Referrer</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {currentViews.map(view => (
            <tr key={view.id}>
              <td>{view.city}, {view.country}</td>
              <td>{view.device}</td>
              <td>{view.duration}</td>
              <td>
                <span className="source-badge">{view.source}</span>
              </td>
              <td className="referrer-cell">
                {view.referrer === '(direct)' ? (
                  <span className="direct-label">(direct)</span>
                ) : (
                  <a href={view.referrer} target="_blank" rel="noopener noreferrer" className="referrer-link">
                    {view.referrer}
                  </a>
                )}
              </td>
              <td>{formatDate(view.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        <div className="rows-per-page">
          <label>Rows per page:</label>
          <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="pagination-info">
          {startIdx + 1}-{Math.min(startIdx + rowsPerPage, allViews.length)} of {allViews.length}
        </div>
        <div className="pagination-controls">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
