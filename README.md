# User Management API

A simple RESTful User Management API built with **Node.js, Express.js, TypeScript, and PostgreSQL**. This project demonstrates basic CRUD operations, database integration, and API error handling.

## 🚀 Technologies Used

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- pg (node-postgres)

## ✨ Features

- Create a new user
- Retrieve all users
- Retrieve a single user by ID
- Update user information
- Delete a user
- Prevent duplicate email addresses
- Handle database errors
- Use PostgreSQL parameterized queries

## 📌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/users` | Get all users |
| GET | `/api/v1/users/:id` | Get a single user |
| POST | `/api/v1/users` | Create a new user |
| PUT | `/api/v1/users/:id` | Update a user |
| DELETE | `/api/v1/users/:id` | Delete a user |

## ⚙️ Installation & Setup

**1. Clone the repository**

```bash
git clone YOUR_REPOSITORY_URL
```

**2. Navigate to the project directory**

```bash
cd YOUR_PROJECT_NAME
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
```

**5. Start the development server**

```bash
npm run dev
```

## 🗄️ Database

This project uses PostgreSQL to store user information.

The `users` table includes:

- `id`
- `name`
- `email`
- `password`
- `age`
- `is_active`
- `created_at`
- `updated_at`

## 👨‍💻 Author

**Mezba Morsalin**

- GitHub: [Mezba-Morsalin](https://github.com/Mezba-Morsalin)
- Portfolio: [mezba-portfolio.vercel.app](https://mezba-portfolio.vercel.app)
- LinkedIn: [Mezba Morsalin](https://www.linkedin.com/in/mezba-morsalin/)

---

⭐ If you find this project useful, feel free to explore the repository!
