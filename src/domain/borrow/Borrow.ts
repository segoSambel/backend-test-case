import { Book } from "../book/Book";
import { Member } from "../member/Member";

export class Borrow {
    constructor(
        public id: number | null,
        public book: Book,
        public member: Member,
        public borrowDate: Date,
        public dueDate: Date,
        public returnDate: Date | null = null,
    ) {
    }

    isLateReturn(): boolean {
        return this.returnDate !== null && this.returnDate > new Date();
    }

    returnBook(): void {
        this.returnDate = new Date();
        this.book.increaseStock();

        if (this.isLateReturn()) {
            this.member.applyPenalty(3)
        }
    }
}
