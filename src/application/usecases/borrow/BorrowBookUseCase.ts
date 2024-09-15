import { IBookRepository } from "../../../domain/book/IBookRepository";
import { Borrow } from "../../../domain/borrow/Borrow";
import { IBorrowRepository } from "../../../domain/borrow/IBorrowRepository";
import { IMemberRepository } from "../../../domain/member/IMemberRepository";
import { ResponseError } from "../../common/error/ResponseError";

export class BorrowBookUseCase {
    constructor(
        private memberRepository: IMemberRepository,
        private bookRepository: IBookRepository,
        private borrowRepository: IBorrowRepository
    ) {
    }

    async execute(memberCode: string, bookCode: string) {
        const member = await this.memberRepository.findMemberByCode(memberCode);
        const book = await this.bookRepository.findBookByCode(bookCode);

        if (!member) {
            throw new ResponseError(404, 'Member not found');
        }

        if (!book) {
            throw new ResponseError(404, 'Book not found');
        }

        if (!book.canBeBorrowed()) {
            throw new ResponseError(400, 'Book is not available');
        }

        if (!member.hasMaximumBorrowedBooks()) {
            throw new ResponseError(400, 'Member has borrowed maximum amount of  book');
        }

        if (member.isPenalized()) {
            throw new ResponseError(400, 'Member is penalized');
        }

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7);

        const borrow = new Borrow(null, book, member, new Date(), dueDate, null);

        await this.borrowRepository.saveBorrow(borrow)
        book.decreaseStock();
        await this.bookRepository.updateBookState(book);
    }
}
