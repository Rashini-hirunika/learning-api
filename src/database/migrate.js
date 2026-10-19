import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runMigrations = async () => {
  let connection;
  try {
    const dbName = process.env.DB_NAME;
    if (!dbName) {
      throw new Error("DB_NAME environment variable is not defined");
    }

    console.log(`Connecting to MySQL at ${process.env.DB_HOST || "localhost"}:${process.env.DB_PORT || 3306}...`);

    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      multipleStatements: true,
    });

    // Ensure database exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.query(`USE \`${dbName}\`;`);

    // Ensure migrations tracking table exists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Get executed migrations
    const [rows] = await connection.query("SELECT name FROM _migrations");
    const executedMigrations = new Set(rows.map((r) => r.name));

    const migrationsDir = path.join(__dirname, "migrations");
    const dirEntries = await fs.readdir(migrationsDir, { withFileTypes: true });
    const files = dirEntries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".sql"))
      .map((entry) => entry.name)
      .sort();

    const pendingMigrations = files.filter((file) => !executedMigrations.has(file));

    if (pendingMigrations.length === 0) {
      console.log("No pending migrations. Database is up to date.");
      return;
    }

    console.log(`Found ${pendingMigrations.length} pending migration(s)...`);

    for (const file of pendingMigrations) {
      const filePath = path.join(migrationsDir, file);
      const sql = await fs.readFile(filePath, "utf-8");

      console.log(`Applying migration: ${file}...`);
      if (sql.trim()) {
        await connection.query(sql);
      }
      await connection.query("INSERT INTO _migrations (name) VALUES (?)", [file]);
      console.log(`✓ Migration applied: ${file}`);
    }

    console.log("All migrations executed successfully.");
  } catch (error) {
    console.error("Migration failed:", error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

runMigrations();
