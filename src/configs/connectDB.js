// get the client
import mysql from "mysql2/promise";
// const mysql = require('mysql2/promise');
// create the connection to database

console.log('connectDB ....')
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejsbasic',
  // password: 'password'
})

export default pool;
