# Node.js Backend with Firebase Emulator & PostgreSQL

This project is a Node.js backend built with TypeScript, Express, Sequelize, and Firebase Authentication Emulator for local development and testing.

---

## Technologies Used

**Runtime Dependencies**
- `express` _v 5.1.0_ — Web server framework
- `sequelize` _v 6.37.7_ — ORM for SQL databases
- `pg` _v 8.16.3_ — PostgreSQL client for Node.js
- `pg-hstore` _v 2.3.4_ — Required by Sequelize for PostgreSQL
- `sqlite3` _v 5.1.7_ — Optional local DB (used by Sequelize)
- `firebase-admin` _v 13.4.0_ — Firebase Admin SDK to verify ID tokens and manage users
- `zod` _v 4.0.9_ — Schema validation

**Development Dependencies**
- `typescript` _v 5.8.3_ — Static typing for JavaScript
- `ts-node` _v 10.9.2_ — Runs TypeScript files directly
- `nodemon` _v 3.1.10_ — Hot-reload for development
- `eslint` _v 9.31.0_ — Linter for code quality
- `prettier` _v 3.6.2_ — Code formatter
- `dotenv` _v 17.2.1_ — Load environment variables from `.env`
- `@types/express` _v 5.0.3_, `@types/node` _v 24.1.0_ — TypeScript type definitions

---

## Install Dependencies

```bash
npm install
````

This command installs all required packages listed in `package.json`.

---

## Database Setup

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

## Firebase Authentication Emulator

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

## Firebase Admin SDK Private Key Setup

To initialize Firebase Admin SDK:

1. Go to [Firebase Console → Project Settings → Service accounts](https://console.firebase.google.com/).
2. Click **Generate new private key** under the **Firebase Admin SDK** section.
3. Save the `.json` file renamed as `API-PKey.json` in the `src/config` folder).

When using the emulator locally, it will automatically use:

```ts
process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
```

---

## Environment Variables

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

## Development Scripts

```bash
npm run dev       # Start server with ts-node and hot reload
npm run build     # Compile TypeScript to JavaScript
npm start         # Run compiled JavaScript server
npm run lint      # Lint TypeScript code
```

---

## Security

**Never commit `API-PKey.json` or `.env` to version control.**
Use `.gitignore` to exclude them:

```
.env
API-PKey.json
```

## Code Formatting

Run ESLint:

```bash
npm run lint
```

Prettier runs automatically if configured in your editor or Git hooks.

---
