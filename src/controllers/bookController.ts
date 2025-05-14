import { Request, Response } from 'express';
import { Book } from '../models/book';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import readline from 'readline';
import { validateBookFields } from '../utils/validateBooks';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const getBooks = async (req: Request, res: Response): Promise<any> => {
    const books = await prisma.book.findMany();
    return res.json(books);
};

export const getBookById = async (req: Request, res: Response): Promise<any> => {
  const bookId = req.params.id;
    const book = await prisma.book.findFirst({
    where: {
      id: bookId,
    },
  });
  if (!book) return res.status(404).json({ error: 'Book not found' });
  return res.json(book);
};

export const addBook = async (req: Request, res: Response): Promise<void> => {
  const { title, author, publishedYear } = req.body;
  const errors = validateBookFields({ title, author, publishedYear });
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }
  const newBook: Book = {
    id: uuidv4(),
    title,
    author,
    publishedYear: Number(publishedYear),
  };
  const createdBook = await prisma.book.create({
    data: newBook,
  });
  res.status(201).json(createdBook);
};

export const updateBook = async (req: Request, res: Response) => {
  const { title, author, publishedYear } = req.body;
  const errors = validateBookFields({ title, author, publishedYear });
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }
  try {
    const updatedBook = await prisma.book.update({
      where: { id: req.params.id },
      data: { title, author, publishedYear },
    });
    res.json(updatedBook);
  } catch (err) {
    res.status(404).json({ error: 'Book not found or failed to update' });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    await prisma.book.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: 'Book not found or failed to delete' });
  }
};

export const importBooks = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: 'CSV file required' });
    return;
  }

  const fileStream = fs.createReadStream(req.file.path);
  const rl = readline.createInterface({ input: fileStream });

  let headers: string[] = [];
  let lineNumber = 0;
  const added: Book[] = [];
  const errors: any[] = [];

  for await (const line of rl) {
    lineNumber++;
    if (!line.trim()) continue;

    const values = line.split(',').map((v) => v.trim());
    if (lineNumber === 1) {
      headers = values;
      continue;
    }

    const row: any = {};
    headers.forEach((h, i) => (row[h] = values[i]));

    const validationErrors = validateBookFields(row);
    if (validationErrors.length > 0) {
      errors.push({ line: lineNumber, data: row, errors: validationErrors });
    } else {
      const book: Book = {
        id: uuidv4(),
        title: row.title,
        author: row.author,
        publishedYear: Number(row.publishedYear),
      };
      await prisma.book.create({ data: book });
      added.push(book);
    }
  }

  fs.unlinkSync(req.file.path); // cleanup

  res.json({ booksAdded: added.length, errors });
};
