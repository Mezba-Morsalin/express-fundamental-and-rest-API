import config from "../config";
import { Pool } from 'pg';

export const port = config.port

const databaseString = config.connection_string

export const pool= new Pool({
    connectionString : databaseString
});

// console.log(pool);

export const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        age INTEGER,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS profiles(
      id SERIAL PRIMARY KEY,
      user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,

      bio TEXT,
      address TEXT,
      date_of_birth DATE,
      city VARCHAR (100),
      country VARCHAR (100),


      phone VARCHAR(15),
      gender VARCHAR(15),

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )
      `)

    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed:", error);
    throw error;
  }
};