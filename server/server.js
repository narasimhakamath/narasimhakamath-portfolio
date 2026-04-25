/*
  Simple Express proxy to query GA4 Data API using a service account.
  Usage:
    - set GOOGLE_SERVICE_ACCOUNT_JSON to the JSON credentials (stringified) or set GOOGLE_SERVICE_ACCOUNT_PATH to a local file path
    - set GA4_PROPERTY_ID to your property numeric id
    - run: npm run server
*/
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import fs from 'fs';

dotenv.config();

const app = express();
app.use(bodyParser.json());

function loadCredentials() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  }
  if (process.env.GOOGLE_SERVICE_ACCOUNT_PATH) {
    const path = process.env.GOOGLE_SERVICE_ACCOUNT_PATH;
    const raw = fs.readFileSync(path, 'utf8');
    return JSON.parse(raw);
  }
  return null;
}

const credentials = loadCredentials();
let gaClient;
if (credentials) {
  gaClient = new BetaAnalyticsDataClient({ credentials });
} else {
  console.warn('No GA4 credentials found. Set GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_PATH');
}

const PROPERTY_ID = process.env.GA4_PROPERTY_ID || '';

app.get('/api/ga4/overview', async (req, res) => {
  if (!gaClient) return res.status(500).json({ error: 'GA4 client not configured' });
  if (!PROPERTY_ID) return res.status(400).json({ error: 'GA4_PROPERTY_ID not set' });

  try {
    const [report] = await gaClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: req.query.startDate || '30daysAgo', endDate: req.query.endDate || 'today' }],
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
      limit: 10,
    });

    res.json(report);
  } catch (err) {
    console.error('GA4 query error', err);
    res.status(500).json({ error: err.message });
  }
});

// Top countries (active users)
app.get('/api/ga4/top-countries', async (req, res) => {
  if (!gaClient) return res.status(500).json({ error: 'GA4 client not configured' });
  if (!PROPERTY_ID) return res.status(400).json({ error: 'GA4_PROPERTY_ID not set' });
  try {
    const [report] = await gaClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: req.query.startDate || '30daysAgo', endDate: req.query.endDate || 'today' }],
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'activeUsers' }],
      limit: 12,
    });
    res.json(report);
  } catch (err) {
    console.error('GA4 top-countries error', err);
    res.status(500).json({ error: err.message });
  }
});

// Device type breakdown
app.get('/api/ga4/device-types', async (req, res) => {
  if (!gaClient) return res.status(500).json({ error: 'GA4 client not configured' });
  if (!PROPERTY_ID) return res.status(400).json({ error: 'GA4_PROPERTY_ID not set' });
  try {
    const [report] = await gaClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: req.query.startDate || '30daysAgo', endDate: req.query.endDate || 'today' }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'activeUsers' }],
      limit: 10,
    });
    res.json(report);
  } catch (err) {
    console.error('GA4 device-types error', err);
    res.status(500).json({ error: err.message });
  }
});

// Events summary (group by eventName)
app.get('/api/ga4/events-summary', async (req, res) => {
  if (!gaClient) return res.status(500).json({ error: 'GA4 client not configured' });
  if (!PROPERTY_ID) return res.status(400).json({ error: 'GA4_PROPERTY_ID not set' });
  try {
    const [report] = await gaClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: req.query.startDate || '30daysAgo', endDate: req.query.endDate || 'today' }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      limit: 200,
    });
    res.json(report);
  } catch (err) {
    console.error('GA4 events-summary error', err);
    res.status(500).json({ error: err.message });
  }
});

// Monthly pageviews (returns date rows; client can group by month)
app.get('/api/ga4/pageviews', async (req, res) => {
  if (!gaClient) return res.status(500).json({ error: 'GA4 client not configured' });
  if (!PROPERTY_ID) return res.status(400).json({ error: 'GA4_PROPERTY_ID not set' });
  try {
    const [report] = await gaClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: req.query.startDate || '365daysAgo', endDate: req.query.endDate || 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'screenPageViews' }],
      limit: 1000,
    });
    res.json(report);
  } catch (err) {
    console.error('GA4 pageviews error', err);
    res.status(500).json({ error: err.message });
  }
});

// Recent pageview rows for table (date, city, country, device, pageLocation, pageReferrer, source)
app.get('/api/ga4/recent-pageviews', async (req, res) => {
  if (!gaClient) return res.status(500).json({ error: 'GA4 client not configured' });
  if (!PROPERTY_ID) return res.status(400).json({ error: 'GA4_PROPERTY_ID not set' });
  try {
    const requestedDims = [
      { name: 'date' },
      { name: 'city' },
      { name: 'country' },
      { name: 'deviceCategory' },
      { name: 'pageLocation' },
      { name: 'pageReferrer' },
      { name: 'source' }
    ];

    const metrics = [{ name: 'eventCount' }];
    const dimensionFilter = {
      filter: {
        fieldName: 'eventName',
        stringFilter: { value: 'page_view', matchType: 'EXACT' }
      }
    };

    // Try progressively smaller dimension sets until GA accepts the combination.
    // This avoids hard-failing when some dimensions are incompatible with metrics.
    let dimsToTry = requestedDims.slice();
    let lastError = null;
    let report = null;
    while (true) {
      try {
        const [r] = await gaClient.runReport({
          property: `properties/${PROPERTY_ID}`,
          dateRanges: [{ startDate: req.query.startDate || '30daysAgo', endDate: req.query.endDate || 'today' }],
          dimensions: dimsToTry,
          metrics,
          dimensionFilter,
          limit: Number(req.query.limit || 1000),
        });
        report = r;
        break;
      } catch (err) {
        lastError = err;
        // If it's an INVALID_ARGUMENT about incompatible dimensions & metrics,
        // drop the least-important dimension and retry. Otherwise rethrow.
        const isIncompat = err && err.details && String(err.details).includes('incompatible');
        if (!isIncompat) {
          console.error('GA4 recent-pageviews error', err);
          return res.status(500).json({ error: err.message });
        }

        if (dimsToTry.length === 0) break;
        // Remove the last (least important) dimension and retry
        dimsToTry.pop();
        console.warn('Retrying recent-pageviews with fewer dimensions:', dimsToTry.map(d => d.name));
      }
    }

    if (!report) {
      console.error('GA4 recent-pageviews final error', lastError);
      return res.status(500).json({ error: lastError.message });
    }

    // Return the report and which dimensions were used so the client can adapt if needed
    res.json({ report, usedDimensions: dimsToTry.map(d => d.name) });
  } catch (err) {
    console.error('GA4 recent-pageviews error', err);
    res.status(500).json({ error: err.message });
  }
});

// Event time series (group by date) - filter by eventName query param
app.get('/api/ga4/event-timeseries', async (req, res) => {
  if (!gaClient) return res.status(500).json({ error: 'GA4 client not configured' });
  if (!PROPERTY_ID) return res.status(400).json({ error: 'GA4_PROPERTY_ID not set' });
  const eventName = req.query.eventName;
  if (!eventName) return res.status(400).json({ error: 'eventName query param required' });
  try {
    const [report] = await gaClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: req.query.startDate || '365daysAgo', endDate: req.query.endDate || 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          stringFilter: { value: eventName, matchType: 'EXACT' }
        }
      },
      limit: 1000,
    });
    res.json(report);
  } catch (err) {
    console.error('GA4 event-timeseries error', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`GA4 proxy listening on ${PORT}`));
