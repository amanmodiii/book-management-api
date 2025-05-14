import express, { Router } from 'express';
import multer from 'multer';
import {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  importBooks,
} from '../controllers/bookController';

const router: Router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.post('/books', addBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);
router.post('/books/import', upload.single('file'), importBooks);

export default router;
