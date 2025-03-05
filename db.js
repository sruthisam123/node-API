const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'node_crud',
    password: 'sruthi',
    port: 5432,
});

module.exports = pool;
