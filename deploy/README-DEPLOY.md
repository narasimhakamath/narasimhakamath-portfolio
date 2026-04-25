# Deploy notes — Nginx + systemd (no Docker)

Steps to expose your backend and serve the built frontend on an EC2 instance.

1) Build frontend and copy files

```bash
# from repo
npm ci
npm run build
sudo mkdir -p /var/www/my-portfolio
sudo cp -r dist/* /var/www/my-portfolio/
sudo chown -R www-data:www-data /var/www/my-portfolio
```

2) Secure GA service account JSON

```bash
sudo mkdir -p /opt/keys
sudo mv ~/narasimhakamath-portfolio-*.json /opt/keys/ga-sa.json
sudo chown root:www-data /opt/keys/ga-sa.json
sudo chmod 640 /opt/keys/ga-sa.json
```

3) Create environment file `/etc/my-portfolio.env`

```
GA4_PROPERTY_ID=523122722
GOOGLE_SERVICE_ACCOUNT_PATH=/opt/keys/ga-sa.json
PORT=4000
NODE_ENV=production
```

Set permissions:

```bash
sudo chmod 600 /etc/my-portfolio.env
```

4) Install systemd unit

Copy `deploy/portfolio-backend.service` to `/etc/systemd/system/` and enable:

```bash
sudo cp deploy/portfolio-backend.service /etc/systemd/system/portfolio-backend.service
sudo systemctl daemon-reload
sudo systemctl enable --now portfolio-backend
sudo journalctl -u portfolio-backend -f
```

5) Nginx

Copy `deploy/nginx-portfolio.conf` to `/etc/nginx/sites-available/portfolio`, update `server_name`, then:

```bash
sudo cp deploy/nginx-portfolio.conf /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

6) HTTPS with Certbot

```bash
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

7) Firewall

```bash
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

Verification:

```bash
curl -I https://your-domain.com/api/ga4/top-countries
sudo journalctl -u portfolio-backend -n 200
```

Notes:
- Keep the GA service account JSON out of the repo and rotate keys if they were ever public.
- If you run under a different user, update `User=` and file perms accordingly.
- If your Vite output folder is not `dist`, adjust the commands above.

Optional: Deploy with PM2 (process manager)

PM2 simplifies process management and startup on reboot. Example steps:

```bash
# install pm2 (run as a user with permission to run the app)
sudo npm i -g pm2

# copy the ecosystem file from the repo (already present at deploy/ecosystem.config.js)
cp deploy/ecosystem.config.cjs /home/ubuntu/ecosystem.config.cjs

# start with the production env defined in the ecosystem
pm2 start /home/ubuntu/ecosystem.config.cjs --env production

# ensure PM2 restarts on reboot (systemd)
pm2 startup systemd -u $(whoami) --hp $(eval echo ~$USER)
pm2 save

# view logs
pm2 status
pm2 logs portfolio-backend --lines 200
```

Notes for PM2 usage:
- The `ecosystem.config.js` in the repo contains example `env_production` values. Edit it if you prefer to keep secrets out of the repo and instead set environment variables on the server.
- You can also source `/etc/my-portfolio.env` before starting pm2 if you want to keep environment values in that file: `source /etc/my-portfolio.env && pm2 start ecosystem.config.js --env production`.

