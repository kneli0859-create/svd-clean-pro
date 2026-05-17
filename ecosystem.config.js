// PM2 process definitions for SVD Clean Pro
// Run: pm2 start ecosystem.config.js
//
// Port mapping:
//   3000 = app.svd-clean.de        (main SaaS landing + kalkulator + booking)
//   3001 = demo.svd-clean.de       (live demo)
//   3002 = musterfirma.svd-clean.de (Linie 3 sample site — coming next session)

const path = require('node:path');
const cwd = __dirname;

module.exports = {
  apps: [
    {
      name: 'svd-clean-app',
      script: path.join(cwd, 'node_modules/next/dist/bin/next'),
      args: 'start -p 3000 -H 127.0.0.1',
      cwd,
      env: { NODE_ENV: 'production' },
      max_memory_restart: '700M',
      autorestart: true,
      time: true,
    },
    {
      name: 'svd-clean-demo',
      script: path.join(cwd, 'node_modules/next/dist/bin/next'),
      args: 'start -p 3001 -H 127.0.0.1',
      cwd,
      env: { NODE_ENV: 'production' },
      max_memory_restart: '500M',
      autorestart: true,
      time: true,
    },
  ],
};
