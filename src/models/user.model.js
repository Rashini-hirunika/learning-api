import pool from "../config/database.js";

export const findAllUsers = async () => {
  const [rows] = await pool.query(
    "SELECT id, name, email FROM users"
  );

  return rows;
};
