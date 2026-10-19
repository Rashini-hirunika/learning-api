INSERT INTO users (name, email) VALUES
  ('John Doe', 'john.doe@example.com'),
  ('Jane Smith', 'jane.smith@example.com'),
  ('Bob Johnson', 'bob.johnson@example.com')
ON DUPLICATE KEY UPDATE name = VALUES(name);
