import React from 'react';
import './Dashboard.css';
import { ResumeDownloadsChart, PageViewsChart, TopCountriesChart, EngagementChart, DeviceTypeChart } from './DashboardCharts';

const Dashboard = () => {
  const [topCountries, setTopCountries] = React.useState(null);
  const [deviceBreakdown, setDeviceBreakdown] = React.useState(null);
  const [eventSummary, setEventSummary] = React.useState(null);
  const [pageviewsMonthly, setPageviewsMonthly] = React.useState(null);
  const [resumeDownloadsSeries, setResumeDownloadsSeries] = React.useState(null);

  // helper to parse GA4 runReport response
  const parseRows = (report) => {
    if (!report || !report.rows) return [];
    return report.rows.map(r => {
      const dims = (r.dimensionValues || []).map(d => d.value);
      const metrics = (r.metricValues || []).map(m => Number(m.value));
      return { dims, metrics };
    });
  };

  React.useEffect(() => {
    // fetch all GA4 endpoints in parallel
    const base = '/api/ga4';
    Promise.all([
      fetch(`${base}/top-countries`).then(r => r.json()),
      fetch(`${base}/device-types`).then(r => r.json()),
      fetch(`${base}/events-summary`).then(r => r.json()),
      fetch(`${base}/pageviews`).then(r => r.json()),
      fetch(`${base}/event-timeseries?eventName=resume_download`).then(r => r.json()),
    ]).then(([countriesReport, devicesReport, eventsReport, pageviewsReport, resumeTimeseriesReport]) => {
      // Modern color palette
      const colors = {
        gradient: ['#6366f1', '#8b5cf6', '#a78bfa', '#c084fc', '#ec4899'],
        primary: '#6366f1',
        secondary: '#8b5cf6',
      };

      // top countries
      const countryRows = parseRows(countriesReport);
      setTopCountries({ labels: countryRows.map(r => r.dims[0] || 'Unknown'), datasets: [{ data: countryRows.map(r => r.metrics[0] || 0), backgroundColor: colors.gradient }] });

      // devices
      const deviceRows = parseRows(devicesReport);
      setDeviceBreakdown({ labels: deviceRows.map(r => r.dims[0] || 'Unknown'), datasets: [{ data: deviceRows.map(r => r.metrics[0] || 0), backgroundColor: [colors.primary, colors.secondary, '#a78bfa'] }] });

      // events summary
      const eventRows = parseRows(eventsReport);
      const eventsMap = {};
      eventRows.forEach(r => { eventsMap[r.dims[0]] = r.metrics[0] || 0; });
      setEventSummary(eventsMap);

      // pageviews - aggregate by month
      const pvRows = parseRows(pageviewsReport);
      // rows -> { dims: [date], metrics: [views] }
      const byMonth = {};
      pvRows.forEach(r => {
        const date = r.dims[0]; // format YYYYMMDD
        const month = date ? date.slice(0,6) : 'unknown';
        byMonth[month] = (byMonth[month] || 0) + (r.metrics[0] || 0);
      });
      // sort months and keep last 12
      const months = Object.keys(byMonth).sort();
      const last12 = months.slice(-12);
      setPageviewsMonthly({ labels: last12.map(m => `${m.slice(4,6)}/${m.slice(0,4)}`), datasets: [{ data: last12.map(m => byMonth[m]), backgroundColor: colors.primary }] });

      // resume downloads timeseries -> convert daily rows to monthly buckets
      try {
        const rsRows = parseRows(resumeTimeseriesReport); // dims: [date], metrics: [count]
        const rsByMonth = {};
        rsRows.forEach(r => {
          const date = r.dims[0]; // YYYYMMDD
          const month = date ? date.slice(0,6) : 'unknown';
          rsByMonth[month] = (rsByMonth[month] || 0) + (r.metrics[0] || 0);
        });
        const monthsR = Object.keys(rsByMonth).sort();
        const last12R = monthsR.slice(-12);
        setResumeDownloadsSeries({ labels: last12R.map(m => `${m.slice(4,6)}/${m.slice(0,4)}`), datasets: [{ label: 'Downloads', data: last12R.map(m => rsByMonth[m]), backgroundColor: colors.secondary }] });
      } catch (e) {
        console.warn('resume timeseries parse', e);
      }
    }).catch(err => console.error('GA4 fetch error', err));
  }, []);

  // fallback datasets to keep JSX tidy
  const topCountriesFallback = {
    labels: ['India', 'USA', 'UK', 'Germany'],
    datasets: [{ label: 'Users', data: [60, 30, 15, 10], backgroundColor: ['#c084fc', '#8F43EE', '#b9aeea', '#ded0b6'] }]
  };

  const resumeDownloadsFallback = {
    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    datasets: [{ label: 'Downloads', data: [8, 12, 19, 7, 14, 10, 15, 18, 13, 9, 11, 16] }]
  };

  const pageviewsFallback = {
    labels: ['Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan'],
    datasets: [{ label: 'Views', data: [110,120,150,90,170,130,160,140,180,155,165,175], backgroundColor: '#8F43EE' }]
  };

  return (
    <section id="dashboard" className="dashboard">
      <div className="dashboard-container">
        <h2 className="section-title">Analytics Dashboard</h2>
        <p className="section-subtitle">View your website analytics and engagement data</p>
        {/* KPI header: top quick metrics */}
        <div className="dashboard-kpis">
          {(() => {
            const fmt = (v) => new Intl.NumberFormat().format(v);
            const totalPageViews = pageviewsMonthly ? (pageviewsMonthly.datasets[0].data.reduce((a,b)=>a+b,0)) : 0;
            const resumeCount = eventSummary ? (eventSummary.resume_download || eventSummary.resume_downloads || eventSummary['resume-download'] || 0) : 0;
            const blogCount = eventSummary ? (eventSummary.medium_blog_click || eventSummary.blog_click || 0) : 0;
            const metrics = [
              { id: 'views', label: 'Page Views', value: totalPageViews },
              { id: 'downloads', label: 'Resume Downloads', value: resumeCount },
              { id: 'blog', label: 'Blog Post Clicks', value: blogCount }
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
            const sm = eventSummary || {};
            const socialMetrics = [
              { id: 'linkedin', label: 'LinkedIn', value: sm.linkedin_click || sm['linkedin_click'] || sm.linkedIn || 0 },
              { id: 'github', label: 'GitHub', value: sm.github_click || sm['github_click'] || 0 },
              { id: 'instagram', label: 'Instagram', value: sm.instagram_click || sm['instagram_click'] || 0 },
              { id: 'medium', label: 'Medium', value: sm.medium_blog_click || sm['medium_blog_click'] || 0 },
              { id: 'whatsapp', label: 'WhatsApp', value: sm.whatsapp_click || sm['whatsapp_click'] || 0 },
              { id: 'leetcode', label: 'LeetCode', value: sm.leetcode_click || sm['leetcode_click'] || 0 }
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
              {topCountries ? (
                <TopCountriesChart
                  data={topCountries}
                  options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
                />
              ) : (
                <div className="chart-placeholder">
                  <div className="spinner" aria-hidden></div>
                  <div className="placeholder-text">Loading...</div>
                </div>
              )}
            </div>
          </div>
          <div className="dashboard-card chart-card-bar">
            <h3>Resume Downloads</h3>
            <div className="chart-container">
              {resumeDownloadsSeries ? (
                <ResumeDownloadsChart
                  data={resumeDownloadsSeries}
                  options={{ responsive: true, plugins: { legend: { display: false } } }}
                />
              ) : (
                <div className="chart-placeholder">
                  <div className="spinner" aria-hidden></div>
                  <div className="placeholder-text">Loading...</div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Row 2: Device Type + Page Views */}
        <div className="dashboard-chart-row">
          <div className="dashboard-card chart-card-pie">
            <h3>Device Type</h3>
            <div className="chart-container">
              {deviceBreakdown ? (
                <DeviceTypeChart data={deviceBreakdown} options={{ responsive: true }} />
              ) : (
                <div className="chart-placeholder">
                  <div className="spinner" aria-hidden></div>
                  <div className="placeholder-text">Loading...</div>
                </div>
              )}
            </div>
          </div>
          <div className="dashboard-card chart-card-bar">
            <h3>Page Views</h3>
            <div className="chart-container">
              {pageviewsMonthly ? (
                <PageViewsChart data={pageviewsMonthly} options={{ responsive: true, plugins: { legend: { display: false } } }} />
              ) : (
                <div className="chart-placeholder">
                  <div className="spinner" aria-hidden></div>
                  <div className="placeholder-text">Loading...</div>
                </div>
              )}
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
  const [allViews, setAllViews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch('/api/ga4/recent-pageviews')
      .then(r => r.json())
      .then(report => {
        if (!mounted) return;
        const rows = (report.rows || []).map((r, idx) => {
          const dims = r.dimensionValues || [];
          const mets = r.metricValues || [];
          const date = dims[0] && dims[0].value;
          const city = dims[1] && dims[1].value || '';
          const country = dims[2] && dims[2].value || '';
          const device = dims[3] && dims[3].value || '';
          const pageLocation = dims[4] && dims[4].value || '';
          const pageReferrer = dims[5] && dims[5].value || '';
          const source = dims[6] && dims[6].value || '';
          const timestamp = date ? new Date(`${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}T00:00:00`) : new Date();
          return {
            id: idx + 1,
            city,
            country,
            device,
            duration: '-',
            source: source || pageLocation || 'unknown',
            referrer: pageReferrer || '(direct)',
            timestamp
          };
        });
        setAllViews(rows);
      })
      .catch(err => {
        console.error('recent-pageviews fetch error', err);
        setAllViews([]);
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateStr = date.toLocaleDateString('en-US', options);
    const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${dateStr} ${timeStr}`;
  };

  const totalPages = Math.ceil(allViews.length / rowsPerPage) || 1;
  const startIdx = (currentPage - 1) * rowsPerPage;
  const currentViews = allViews.slice(startIdx, startIdx + rowsPerPage);

  return (
    <div className="table-container">
      {loading ? (
        <div style={{padding: '2rem', textAlign: 'center', color: '#ded0b6'}}>Loading recent page views…</div>
      ) : (
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
      )}
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
