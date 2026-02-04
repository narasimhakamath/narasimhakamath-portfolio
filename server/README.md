# GA4 Proxy Server

This small Express server proxies requests to the Google Analytics Data API using a service account. It is intended for local development or to be deployed on AWS (Lambda/EC2) or other hosts.

Setup (local):

1. Create a GA4 service account in Google Cloud and download the JSON key.
2. Set environment variables (see `.env.example`) or set `GOOGLE_SERVICE_ACCOUNT_PATH` to the downloaded file path.
3. Install dependencies and run:

```bash
cd server
npm install
npm run server
```

Endpoints:
- `GET /api/ga4/overview` - returns a simple runReport response for the configured property (30 days by default).

Notes:
- Do NOT commit your service account JSON to git. Use environment variables or Secrets Manager when deploying.
