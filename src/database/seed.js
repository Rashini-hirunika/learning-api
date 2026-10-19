import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runSeeds = async () => {
  let connection;
  try {
    const dbName = process.env.DB_NAME;
    if (!dbName) {
      throw new Error("DB_NAME environment variable is not defined");
    }

    console.log(`Connecting to MySQL database "${dbName}"...`);

    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: dbName,
      multipleStatements: true,
    });

    const seedsDir = path.join(__dirname, "seeds");
    const dirEntries = await fs.readdir(seedsDir, { withFileTypes: true });
    const files = dirEntries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".sql"))
      .map((entry) => entry.name)
      .sort();

    if (files.length === 0) {
      console.log("No seed files found.");
      return;
    }

    console.log(`Found ${files.length} seed file(s)...`);

    for (const file of files) {
      const filePath = path.join(seedsDir, file);
      const sql = await fs.readFile(filePath, "utf-8");

      console.log(`Executing seed: ${file}...`);
      if (sql.trim()) {
        await connection.query(sql);
      }
      console.log(`✓ Seed completed: ${file}`);
    }

    console.log("All seeds executed successfully.");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

runSeeds();
