const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'motorolalgetim1',
  host: 'localhost',
  port: 5432,
  database: 'url_shortener'
});

module.exports = pool;