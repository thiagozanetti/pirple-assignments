const common = {
  headers: { 
    'Content-Type': 'application/json' 
  }
};

const config = {
  staging: {
    httpPort: 3000,
    httpsPort: 3001,
    envName: 'staging'
  },
  production: {
    httpPort: 5000,
    httpsPort: 5001,
    envName: 'production'
  }
};

const currentEnvironment = Object.keys(config).includes(process.env.NODE_ENV) ? process.env.NODE_ENV : 'staging'; 

module.exports = { ...common, ...config[currentEnvironment] };