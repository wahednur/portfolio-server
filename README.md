# 📁 Portfolio Website

A full-stack personal portfolio website built with modern technologies, including **Next.js**, **Node.js**, **Express**, **PostgreSQL**, and **Prisma**. This application allows users to manage their posts and portfolios with secure authentication.

---

## 🚀 Features

- 🔐 User Authentication (JWT + BcryptJS)
- 📝 Create, Read, Update, Delete (CRUD) for:
  - Posts (with tags, featured flag, view count)
  - Portfolios (with category support)
- 🖼️ Optional profile photo for users
- 🧠 Role-based Access Control (Admin & User)
- 📊 View count tracking for posts
- 📁 Organized by Categories
- 🍪 Secure Cookie-based session handling
- 🌐 CORS enabled for frontend-backend communication

---

## 🛠️ Tech Stack

| Category        | Technology                    |
| --------------- | ----------------------------- |
| Language        | TypeScript                    |
| Frontend        | [Next.js](https://nextjs.org) |
| Backend         | Node.js, Express.js           |
| Database        | PostgreSQL via Prisma ORM     |
| Hosting DB      | [Neon](https://neon.tech)     |
| Auth & Security | JWT, BcryptJS, Cookies        |
| Middleware      | CORS                          |

---

## 🧩 Database Schema (Prisma Models)

### `User`

```prisma
model User {
  id         String      @id @default(cuid())
  name       String
  email      String      @unique
  password   String
  photo      String?
  role       Role        @default(USER)
  createdAt  DateTime    @default(now())
  updatedAt  DateTime    @updatedAt
  Posts      Post[]
  Portfolios Portfolio[]
}

enum Role {
  ADMIN
  USER
}
```

## `Portfolio and Category`

```
model Category {
  id   String @id @default(cuid())
  name String

  Portfolios Portfolio[]
}

model Portfolio {
  id          String   @id @default(cuid())
  catId       String
  title       String
  description String?
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  category    Category @relation(fields: [catId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([userId])
  @@index([catId])
}


```

## `Blog Post`

```
model Post {
  id         String   @id @default(cuid())
  title      String
  content    String
  thumbnail  String
  isFeatured Boolean  @default(false)
  tags       String[]
  views      Int      @default(0)
  authorId   String
  author     User     @relation(fields: [authorId], references: [id])
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

## Getting Started

### 1. Clone the Repository

```
git clone https://github.com/wahednur/portfolio-server.git
cd portfolio-server

```

### 2. Install Dependencies

```
bun install
# or
npm install
# or
yarn install

```

### 3. Set Up Environment Variables

```
DATABASE_URL="your_neon_database_url"
JWT_SECRET="your_jwt_secret_key"

```

### 4. Prisma Setup

```
bux prisma generate
bux prisma migrate dev --name init

```

### 5. Run the Server

package.json

```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "bun --watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  },


bun  dev
```
