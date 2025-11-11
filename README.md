# 📚 GraphQL Book Management API

## 1️⃣ Project Name and Description

**GraphQL Book Management System** is a modern GraphQL API built with Express.js and MongoDB that manages authors, books, and categories with pagination support. This project demonstrates core GraphQL concepts including queries, mutations, resolvers, and pagination patterns for handling complex data relationships.

---

## 2️⃣ Live Link

Currently running locally. To deploy, consider platforms like:

- Heroku
- Vercel
- Railway
- Render

---

## 3️⃣ Tech Stack

### Backend:

- **Node.js** - JavaScript runtime
- **Express.js** (v5.1.0) - Web framework
- **GraphQL** (v16.12.0) - API query language
- **Express-GraphQL** (v0.12.0) - GraphQL middleware for Express
- **MongoDB** - NoSQL database
- **Mongoose** (v8.19.3) - MongoDB ODM

### Development Tools:

- **Nodemon** (v3.1.10) - Auto-restart during development
- **dotenv** (v17.2.3) - Environment variables management
- **CORS** (v2.8.5) - Cross-Origin Resource Sharing
- **Body-parser** (v2.2.0) - Request body parsing

---

## 4️⃣ Features

✨ **Core Features:**

- 📖 **Author Management** - Create and manage authors with pagination
- 📚 **Book Management** - Add books linked to authors and categories with pagination
- 🏷️ **Category System** - Organize books into categories
- 📄 **Pagination Support** - Efficient data fetching with page navigation
- 🔄 **Relational Data** - Navigate between authors, books, and categories
- ⚡ **GraphQL Queries & Mutations** - Full CRUD operations
- 🛡️ **Error Handling** - Graceful error handling and database error formatting
- 🔌 **Graceful Shutdown** - Proper connection cleanup on process termination
- 💾 **Memory Monitoring** - Track memory usage during runtime

---

## 5️⃣ Installation and Setup

### Prerequisites:

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas connection)
- pnpm or npm package manager

### Installation Steps:

1. **Clone the repository:**

   ```bash
   git clone <https://github.com/kaziahosunhabibripon/GraphQL>
   cd graphql
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Create `.env` file:**

   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**

   ```env
   PORT=5000
   NODE_ENV=development
   DB_URL=mongodb://localhost:27017/graphql-db
   # or for MongoDB Atlas:
   # DB_URL=mongodb+srv://username:password@cluster.mongodb.net/graphql-db
   ```

5. **Start the server:**

   ```bash
   # Development mode with auto-reload
   pnpm dev

   # Production mode
   pnpm start
   ```

6. **Access GraphQL Playground:**
   ```
   http://localhost:5000/graphql
   ```

---

## 6️⃣ Project Folder Structure

```
graphql/
├── config/
│   └── database.js              # MongoDB connection & error handling
├── models/
│   ├── Author.js                # Author schema
│   ├── Book.js                  # Book schema with category references
│   └── User.js                  # User schema
├── types/
│   ├── AuthorType.js            # Author GraphQL type definition
│   ├── AuthorPaginationType.js  # Paginated author response type
│   ├── BookType.js              # Book GraphQL type definition
│   ├── BookPaginationType.js    # Paginated book response type
│   └── CategoryTypes.js         # Category GraphQL type with book resolver
├── schema/
│   └── index.js                 # Main GraphQL schema with queries & mutations
├── app.js                       # Express app configuration
├── server.js                    # Server startup & connection management
├── package.json                 # Project dependencies
├── .env                         # Environment variables (not in git)
├── .gitignore                   # Git ignore rules
└── README.md                    # This file
```

---

## 7️⃣ API Endpoints

### GraphQL Endpoint:

```
POST http://localhost:4000/graphql
```

### Example Queries:

**1. Get All Authors (Paginated):**

```graphql
query {
  authors(page: 1) {
    authors {
      id
      name
      books {
        title
      }
    }
    totalPages
    currentPage
    isNextPage
    isPreviousPage
  }
}
```

**2. Get All Books (Paginated):**

```graphql
query {
  books(page: 1) {
    books {
      id
      title
      authorId
    }
    totalPages
    currentPage
    isNextPage
    isPreviousPage
  }
}
```

**3. Get Books by Author:**

```graphql
query {
  books(authorId: "author-id-here", page: 1) {
    books {
      id
      title
    }
    totalPages
    currentPage
  }
}
```

**4. Get All Categories with Books:**

```graphql
query {
  categories {
    id
    name
    books {
      id
      title
      authorId
    }
  }
}
```

**5. Get Single Category:**

```graphql
query {
  category(id: "category-id-here") {
    id
    name
    books {
      title
    }
  }
}
```

### Example Mutations:

**1. Add Author:**

```graphql
mutation {
  addAuthor(name: "John Doe") {
    id
    name
  }
}
```

**2. Add Book:**

```graphql
mutation {
  addBook(
    title: "GraphQL Essentials"
    authorId: "author-id-here"
    categoryId: ["category-id-1", "category-id-2"]
  ) {
    id
    title
    authorId
  }
}
```

**3. Add Category:**

```graphql
mutation {
  addCategory(name: "Programming") {
    id
    name
  }
}
```

---

## 8️⃣ Website's Screenshot (Optional)

### GraphQL Playground Interface:

The API runs on `http://localhost:4000/graphql` and provides an interactive GraphQL explorer where you can:

- Write and test queries
- View schema documentation
- Execute mutations
- See real-time results

---

## 9️⃣ Author/Contact

**Project Author:** Kazi Ahosunhabib Ripon

📧 **Email:** [habibkazi92@gmail.com]
🔗 **GitHub:** [github.com/kaziahosunhabibripon](https://github.com/kaziahosunhabibripon/GraphQL)
💼 **LinkedIn:** [(https://www.linkedin.com/in/kazi-ahosun-habib-ripon/)]

---

## 🔟 Acknowledgments/Credits

- **GraphQL Documentation:** [graphql.org](https://graphql.org)
- **Express.js:** [expressjs.com](https://expressjs.com)
- **MongoDB & Mongoose:** [mongodb.com](https://mongodb.com) | [mongoosejs.com](https://mongoosejs.com)
- **Community & Stack Overflow** for troubleshooting and best practices

---

## 📝 License

This project is open source and available under the MIT License.

---

**Happy coding! 🚀**
