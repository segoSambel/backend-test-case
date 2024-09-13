import {IBookRepository} from "../../domain/book/IBookRepository";
import {Book} from "../../domain/book/Book";
import {prismaClient} from "../config/database";

export class BookRepository implements IBookRepository {

    async findAllAvailableBook(): Promise<Book[]> {
        const books = await prismaClient.book.findMany();
        return books.map(b => new Book(b.code, b.title, b.author, b.stock));
    }
}
