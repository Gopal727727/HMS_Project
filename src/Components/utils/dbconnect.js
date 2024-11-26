import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'django_hms',
  password: 'admin',
  port: 5433,
});

export default pool;
export const db = {
  query: (text, params) => pool.query(text, params),
};
