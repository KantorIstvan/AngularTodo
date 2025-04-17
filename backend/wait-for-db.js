const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function waitForDb() {
  let retries = 5;
  while (retries) {
    try {
      console.log("Attempting database connection...");
      await pool.query("SELECT NOW()");
      console.log("Database is ready!");
      return;
    } catch (err) {
      console.log("Database not ready, retrying...");
      retries -= 1;
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  console.error("Max retries reached. Could not connect to database.");
  process.exit(1);
}

waitForDb().then(() => {
  require("./server");
});
