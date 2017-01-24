module.exports = {
  test: {
    debug: true,
    client: 'postgresql',
    connection: {
      database: 'test',
      host: 'mdillon__postgis',
      port: 5432,
      user: 'test',
      password: ''
    }
  },
  development: {
    debug: true,
    client: 'postgresql',
    connection: {
      database: 'gulag'
    }
  },
  production: {
    debug: false,
    client: 'postgresql',
    connection: {
      database: 'gulag',
      host: '/var/run/postgresql',
      port: 5432,
      user: 'gulag'
    },
    pool: {
      min: 2,
      max: 50,
      requestTimeout: 60000
    },
    acquireConnectionTimeout: 60000
  }
};
