INSERT INTO users (name, email, dob, password) VALUES
('John Doe', 'john.doe@example.com', '2000-01-01', 'password123'),
('Jane Smith', 'jane.smith@example.com', '1995-05-12', 'password123'),
('Bob Johnson', 'bob.johnson@example.com', '1998-10-20', 'password123')
ON DUPLICATE KEY UPDATE name = VALUES(name);