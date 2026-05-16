import sql from "mssql";

let pool: sql.ConnectionPool | null = null;

export async function getSqlPool(): Promise<sql.ConnectionPool | null> {
  const connStr = process.env.SQL_CONNECTION_STRING;
  if (!connStr) return null;
  if (!pool) {
    pool = await new sql.ConnectionPool(connStr).connect();
  }
  return pool;
}

export { sql };
