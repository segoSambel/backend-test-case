import {Router} from 'express';
import {BookRepository} from "../../infrastructure/persistence/BookRepository";
import {BookController} from "../controllers/BookController";
import {GetAllBooks} from "../../application/usecases/book/GetAllBooks";

const router = Router();
const bookRepository = new BookRepository();
const bookController = new BookController(
    new GetAllBooks(bookRepository)
);

router.get('/books', bookController.getAll.bind(bookController));

export default router;
