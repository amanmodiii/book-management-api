import { Book } from '../models/book';

export function validateBookFields(book: any): string[] {
  const errors: string[] = [];
  if (!book.title) errors.push('Missing title');
  if (!book.author) errors.push('Missing author');
  if (!book.publishedYear || isNaN(book.publishedYear)) {
    errors.push('Invalid or missing publishedYear');
  }
  return errors;
}
