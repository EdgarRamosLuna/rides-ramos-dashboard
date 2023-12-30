// lib/db.js
import mysql from 'serverless-mysql';

const db = mysql({
  config: {
    host: '3.82.47.203',
    port: '3306',
    database: 'transportationdb',
    user: 'devadmin',
    password: 'H13477dm**'
  }
});

export default async function executeQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}
