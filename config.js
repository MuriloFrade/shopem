var testPort        = 3333,
    devPort         = 3000,
    productionPort  = '';

module.exports = {
  db: {
    test: 'mongodb://localhost/shopping-list-tests',
    development: 'mongodb://localhost/shopping-list-dev',
    production: ''
  },
  port: {
    test: 3333,
    development: 3000,
    production: ''
  },
  url: {
    test: 'http://localhost:' + testPort,
    development: 'http://localhost:' + devPort,
    production: ''
  }
};
