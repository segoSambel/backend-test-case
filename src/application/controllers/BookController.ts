import {NextFunction, Request, Response} from "express";
import {GetAllBooks} from "../usecases/book/GetAllBooks";
import {BookResponse} from "../resources/BookResponse";

export class BookController {

    constructor(private getAllBooks: GetAllBooks) {
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const books = (await this.getAllBooks.execute()).map(b => new BookResponse(b.code, b.title, b.author, b.stock));
            res.status(200).json(books);
        } catch (e) {
            next(e);
        }
    }
}
