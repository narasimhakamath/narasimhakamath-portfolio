module.exports = {
  apps: [
    {
      name: 'portfolio-backend',
      script: 'server/server.js',
      cwd: '/home/ubuntu/Projects/narasimhakamath-portfolio',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      // Keep secrets out of the repo: source your .env before starting PM2
      env_production: {
        NODE_ENV: 'production',
        PORT: 4000
      }
    }
  ]
};
