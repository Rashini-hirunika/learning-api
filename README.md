# Express.js + MySQL MVC Backend Boilerplate

A clean, modular REST API boilerplate built with Node.js, Express, and MySQL2 using the Model-View-Controller (MVC) architecture, featuring zero-dependency database migrations and seeding.

## Tech Stack

- **Node.js** — JavaScript runtime environment
- **Express.js** — Fast, unopinionated web framework for Node.js
- **MySQL2** — Fast MySQL driver with connection pooling and Promises support
- **dotenv** — Environment configuration management
- **CORS** — Cross-Origin Resource Sharing middleware
- **Helmet** — HTTP header security middleware
- **Nodemon** — Development auto-reloading

## Architecture & Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js              # MySQL connection pool setup
│   ├── controllers/
│   │   └── user.controller.js       # Request handling and response formatting
│   ├── database/
│   │   ├── migrations/              # SQL migration files
│   │   │   └── 001_create_users_table.sql
│   │   ├── seeds/                   # SQL seed files
│   │   │   └── 001_seed_users.sql
│   │   ├── migrate.js               # Zero-dependency migration runner
│   │   ├── seed.js                  # Zero-dependency seed runner
│   │   └── reset.js                 # Drops, recreates, migrates & seeds database
│   ├── middlewares/                 # Custom middlewares (auth, validation, etc.)
│   ├── models/
│   │   └── user.model.js            # SQL queries and data access layer
│   ├── routes/
│   │   └── user.routes.js           # API endpoint definitions
│   ├── services/                    # Optional business logic layer
│   ├── validators/                  # Request validation schemas
│   ├── app.js                       # Express application and middleware configuration
│   └── server.js                    # Entry point, database health check, server listener
├── tests/                           # Automated test suites
├── .env.example                     # Sample environment configuration
├── .gitignore                       # Git ignore rules
├── package.json
└── README.md
```

## Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MySQL Server](https://dev.mysql.com/downloads/) (v8.0+)

### 2. Environment Configuration

Copy `.env.example` to `.env` and fill in your database credentials:

```bash
cp .env.example .env
```

Default variables in `.env`:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=mern_boilerplate

FRONTEND_URL=http://localhost:5173
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Database Migrations & Seeds (No ORM or extra packages required)

The database runner uses standard Node.js and `mysql2` to automatically create the database (if not exists), track executed migrations in `_migrations`, and apply seeds:

```bash
# Run pending migrations (automatically creates DB & _migrations table)
npm run migrate

# Run data seeds
npm run seed

# Run migrations and seeds in one command
npm run db:setup

# Reset database from scratch (drop, recreate, migrate, seed)
npm run db:reset
```

### 5. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check endpoint |
| `GET` | `/api/users` | Retrieve all users from MySQL |
