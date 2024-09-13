import {Book} from "./Book";

export interface IBookRepository {
    findAllAvailableBook(): Promise<Book[]>;
}
