export class Member {
    constructor(
        public memberCode: string,
        public name: string,
        public penaltyEndDate: Date | null = null,
        public borrowedBooks: number,
    ) {
    }

    hasMaximumBorrowedBooks(): boolean {
        return this.borrowedBooks < 2
    }

    isPenalized(): boolean {
        if (this.penaltyEndDate === null) {
            return false;
        } else {
            return this.penaltyEndDate < new Date();
        }
    }

    applyPenalty(days: number): void {
        this.penaltyEndDate = new Date();
        this.penaltyEndDate.setDate(this.penaltyEndDate.getDate() + days);
    }
}
