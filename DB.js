import mysql2 from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.on("connect", () => {
  console.log("Database connected");
});

db.on("error", (err) => {
  console.log("Failed to connect. ERROR: ", err.message);
});

export default db;
