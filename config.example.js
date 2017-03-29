module.exports = {
  production: {
    client: 'postgresql',
    connection: {
      database: 'velobike',
      host: '/var/run/postgresql',
      port: 5432,
      user: '<USER>',
      password: '<PASSWORD>'
    },
    pool: {
      min: 2,
      max: 50,
      requestTimeout: 60000
    },
    acquireConnectionTimeout: 60000
  }
};
