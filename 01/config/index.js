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

// getting the current environment set or falling back to staging.
const currentEnvironment = Object.keys(config).includes(process.env.NODE_ENV) ? process.env.NODE_ENV : 'staging'; 

// merging common config with current one.
module.exports = { ...common, ...config[currentEnvironment] };