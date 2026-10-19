import dotenv from "dotenv";

dotenv.config();

const { default: app } = await import("./app.js");
const { default: pool } = await import("./config/database.js");

const startServer = async () => {
  try {
    await pool.query("SELECT 1");

    console.log("MySQL connected successfully");

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
