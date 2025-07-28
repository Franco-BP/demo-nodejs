Here's a complete `README.md` file in Markdown format that explains all the requested steps and includes technology listing based on your `package.json`:

---

````md
# 🚀 Node.js Backend with Firebase Emulator & PostgreSQL

This project is a Node.js backend built with TypeScript, Express, Sequelize, and Firebase Authentication Emulator for local development and testing.

---

## 🧰 Technologies Used

**Runtime Dependencies**
- `express` — Web server framework
- `sequelize` — ORM for SQL databases
- `pg` — PostgreSQL client for Node.js
- `pg-hstore` — Required by Sequelize for PostgreSQL
- `sqlite3` — Optional local DB (used by Sequelize)
- `firebase-admin` — Firebase Admin SDK to verify ID tokens and manage users
- `zod` — Schema validation

**Development Dependencies**
- `typescript` — Static typing for JavaScript
- `ts-node` — Runs TypeScript files directly
- `nodemon` — Hot-reload for development
- `eslint` — Linter for code quality
- `prettier` — Code formatter
- `dotenv` — Load environment variables from `.env`
- `@types/express`, `@types/node` — TypeScript type definitions

---

## 📦 Install Dependencies

```bash
npm install
````

This command installs all required packages listed in `package.json`.

---

## 🛠️ Database Setup

This project uses PostgreSQL. To initialize the database schema:

1. Make sure PostgreSQL is running.
2. Create your database manually or via SQL.
3. Run the SQL file:

```bash
psql <your_database_url> -f scripts/databaseCreation.sql
```

> Replace `<your_database_url>` with the value of your `DATABASE` variable from `.env`.

Example:

```bash
psql postgres://user:pass@localhost:5432/dbname -f scripts/databaseCreation.sql
```

---

## 🔐 Firebase Authentication Emulator

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Initialize Emulator

```bash
firebase init emulators
```

Select **Authentication Emulator** and follow prompts.

It will generate a `firebase.json` like:

```json
{
  "emulators": {
    "auth": {
      "port": 9099
    }
  }
}
```

### 3. Start Emulator

```bash
firebase emulators:start
```

You should see:

```
auth: Local Authentication emulator running at http://localhost:9099/
```

---

## 🌐 Environment Variables

Create a `.env` file in the root of your project with the following content:

```env
PORT=3000
NODE_ENV=development

# PostgreSQL Database URL
# Format: postgres://user:password@host:port/database_name
DATABASE="postgres://user:pass@localhost:5432/dbname"

# Firebase Emulator
FIREBASE_AUTH_EMULATOR_HOST="localhost:9099"
```

> Make sure to replace the database credentials with your actual PostgreSQL values.

---

## 🧪 Development Scripts

```bash
npm run dev       # Start server with ts-node and hot reload
npm run build     # Compile TypeScript to JavaScript
npm start         # Run compiled JavaScript server
npm run lint      # Lint TypeScript code
```

---

## 🧼 Code Formatting

Run ESLint:

```bash
npm run lint
```

Prettier runs automatically if configured in your editor or Git hooks.

---
