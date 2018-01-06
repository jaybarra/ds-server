module.exports = {
  apps : [
    {
      name      : 'ds-server',
      script    : 'bin/www',
      env_production : {
        NODE_ENV: 'production',
	SECRET: 'invalid_secret'
      }
    },
  ],
  deploy : {
    production : {
      user : 'deploy',
      host : 'draconicsystems.com',
      ref  : 'origin/master',
      repo : 'git@github.com:jaybarra/ds-server.git',
      path : '/home/deploy/ds-server', 
      "post-deploy" : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
  }
};

