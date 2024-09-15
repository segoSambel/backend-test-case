import {NextFunction, Request, Response} from "express";
import {GetAllBooks} from "../usecases/book/GetAllBooks";

export class BookController {

    constructor(private getAllBooks: GetAllBooks) {
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const books = await this.getAllBooks.execute();
            res.status(200).json(books);
        } catch (e) {
            next(e);
        }
    }
}
