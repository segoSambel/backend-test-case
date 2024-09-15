import { Book } from "./Book";

export interface IBookRepository {
    findAllAvailableBook(): Promise<Book[]>;

    findBookByCode(bookCode: string): Promise<Book | null>;

    updateBookState(book: Book): Promise<void>;
}
