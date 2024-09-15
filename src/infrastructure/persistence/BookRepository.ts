import { Book } from "../../domain/book/Book";
import { IBookRepository } from "../../domain/book/IBookRepository";
import { prismaClient } from "../config/database";

export class BookRepository implements IBookRepository {
    async updateBookState(book: Book): Promise<void> {
        await prismaClient.book.update({
            data: {
                stock: book.stock
            },
            where: {
                code: book.bookCode
            }
        });

    }

    async findAllAvailableBook(): Promise<Book[]> {
        const books = await prismaClient.book.findMany({
            where: {
                stock: {
                    gt: 0
                }
            }
        });

        return books.map(book => new Book(book.code, book.title, book.author, book.stock));
    }

    async findBookByCode(bookCode: string): Promise<Book | null> {
        const book = await prismaClient.book.findUnique({
            where: {
                code: bookCode
            }
        });

        if (book) {
            return new Book(book.code, book.title, book.author, book.stock);
        }

        return null
    }


}
