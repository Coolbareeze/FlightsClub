import mysql from 'mysql2/promise';

// Reuses a single connection pool across requests (and across hot-reloads in
// dev) so we don't exhaust MySQL's connection limit on shared Hostinger
// hosting. Configure via environment variables — see .env.example.
declare global {
  // eslint-disable-next-line no-var
  var __fcukPool: mysql.Pool | undefined;
}

function createPool() {
  const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

  if (!DB_HOST || !DB_NAME || !DB_USER) {
    throw new Error(
      'Missing database environment variables (DB_HOST, DB_NAME, DB_USER, DB_PASSWORD). ' +
        'See .env.example and the README "Admin Panel" section.'
    );
  }

  return mysql.createPool({
    host: DB_HOST,
    port: DB_PORT ? Number(DB_PORT) : 3306,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD ?? '',
    waitForConnections: true,
    connectionLimit: 5,
    maxIdle: 5,
    idleTimeout: 60000,
    dateStrings: true,
  });
}

export function getPool() {
  if (!global.__fcukPool) {
    global.__fcukPool = createPool();
  }
  return global.__fcukPool;
}
