import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Add a root route handler
app.get('/', (req, res) => {
  res.send('Warranty Claim API is running');
});

// Database setup
let db;

async function setupDatabase() {
  db = await open({
    filename: ':memory:',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS claims (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      name TEXT,
      phoneNumber TEXT,
      orderNumber TEXT,
      returnAddress TEXT,
      brand TEXT,
      problem TEXT,
      claimNumber TEXT UNIQUE
    )
  `);
}

setupDatabase();

// ... (rest of your server code remains the same)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});