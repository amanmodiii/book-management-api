# Book Management API

A RESTful API built with Express, TypeScript, and PostgreSQL (via Prisma ORM) for managing a collection of books.  
This API allows you to create, read, update, delete, and bulk import books.

## Features

- **CRUD operations** for books
- **Bulk import** books from a CSV file
- **Validation** for book data
- **UUID** as book ID
- **Timestamps** for creation and updates

## Endpoints ([View postman collection](https://app.getpostman.com/join-team?invite_code=ff250381591a67c5974e5f12de271ca806fda850d9eac1be1c4e5faf2a5a27ce&target_code=0a12e799382ad21488ea007f2e722cfd) )

- `GET    /books`           — List all books
- `GET    /books/:id`       — Get a book by ID
- `POST   /books`           — Add a new book
- `PUT    /books/:id`       — Update a book
- `DELETE /books/:id`       — Delete a book
- `POST   /books/import`    — Import books from CSV (multipart/form-data, field: `file`)

## Setup

1. **Clone the repository**
   ```sh
   git clone <repo-url>
   cd book-management-api
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory and add your PostgreSQL connection string:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
   ```

4. **Set up the database**

   Run Prisma migrations to create the database tables:
   ```sh
   npx prisma migrate dev --name init
   ```

5. **Generate Prisma client**
   ```sh
   npx prisma generate
   ```

6. **Start the server**
   ```sh
   npm run dev
   ```
   The API will be available at `http://localhost:3000`.

## Development

- Source code is in the `src/` directory.
- Prisma schema is in `prisma/schema.prisma`.
- To build for production: `npm run build`

## License

MIT
