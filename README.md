# Book Management API

A RESTful API built with Express, TypeScript, and PostgreSQL (via Prisma ORM) for managing a collection of books.  
This API allows you to create, read, update, delete, and bulk import books.

## Features

- **CRUD operations** for books
- **Bulk import** books from a CSV file
- **Validation** for book data
- **UUID** as book ID
- **Timestamps** for creation and updates

## Endpoints ([View postman collection](https://www.postman.com/presentation-01/workspace/book-management/collection/41517412-b7d976ca-d686-4e96-a237-3111a17b9951?action=share&creator=41517412) )

- `GET    /books`           — List all books
- `GET    /books/:id`       — Get a book by ID
- `POST   /books`           — Add a new book
- `PUT    /books/:id`       — Update a book
- `DELETE /books/:id`       — Delete a book
- `POST   /books/import`    — Import books from CSV (multipart/form-data, field: `file`)

## Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/amanmodiii/book-management-api
   cd book-management-api
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory and add your PostgreSQL connection string:
   ```
   PORT=3000
   DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
   ```
   Use your actual PostgreSQL username, password, and database name.

4. **Set up the database**

   Run Prisma migrations to create the database tables:
   ```sh
   npx prisma migrate dev
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
