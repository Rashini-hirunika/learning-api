import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resetDatabase = async () => {
  let connection;
  try {
    const dbName = process.env.DB_NAME;
    if (!dbName) {
      throw new Error("DB_NAME environment variable is not defined");
    }

    console.log(`Connecting to MySQL to drop and recreate database "${dbName}"...`);

    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
    });

    await connection.query(`DROP DATABASE IF EXISTS \`${dbName}\`;`);
    console.log(`✓ Database "${dbName}" dropped.`);

    await connection.query(`CREATE DATABASE \`${dbName}\`;`);
    console.log(`✓ Database "${dbName}" created.`);

    await connection.end();
    connection = null;

    console.log("\n--- Running Migrations ---");
    execSync(`node "${path.join(__dirname, "migrate.js")}"`, { stdio: "inherit" });

    console.log("\n--- Running Seeds ---");
    execSync(`node "${path.join(__dirname, "seed.js")}"`, { stdio: "inherit" });

    console.log("\n✓ Database reset, migrated, and seeded successfully.");
  } catch (error) {
    console.error("Database reset failed:", error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

resetDatabase();
