// get the client
import mysql from "mysql2/promise";

console.log("connectDB ....");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nodejsbasic",
  // password: 'password'
});

export default pool;
