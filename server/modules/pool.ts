import pg, { Pool } from "pg";
let pool: Pool;
if (process.env.DATABASE_URL) {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  pool = new pg.Pool({
    host: "localhost",
    port: 5432,
    database: "draftbot",
  });
}

export default pool;
