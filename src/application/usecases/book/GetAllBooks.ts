import {IBookRepository} from "../../../domain/book/IBookRepository";
import {Book} from "../../../domain/book/Book";

export class GetAllBooks {
    constructor(private repository: IBookRepository) {
    }

    async execute(): Promise<Book[]> {
        return await this.repository.findAllAvailableBook();
    }
}
