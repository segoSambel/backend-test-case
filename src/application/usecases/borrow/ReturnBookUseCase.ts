import { IBookRepository } from "../../../domain/book/IBookRepository";
import { IBorrowRepository } from "../../../domain/borrow/IBorrowRepository";
import { IMemberRepository } from "../../../domain/member/IMemberRepository";
import { ResponseError } from "../../common/error/ResponseError";

export class ReturnBookUseCase {
    constructor(
        private borrowRepository: IBorrowRepository,
        private bookRepository: IBookRepository,
        private memberRepository: IMemberRepository
    ) { }

    async execute(bookCode: string, memberCode: string) {
        const borrow = await this.borrowRepository.findBorrow(bookCode, memberCode);

        if (!borrow) {
            throw new ResponseError(400, 'Borrow not found, this member did not borrow this book');
        }

        borrow.returnBook()

        await this.borrowRepository.updateBorrow(borrow);
        await this.bookRepository.updateBookState(borrow.book);
        await this.memberRepository.updateMemberState(borrow.member);
    }
}
