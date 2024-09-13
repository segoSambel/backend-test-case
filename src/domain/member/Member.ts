export class Member {
    constructor(
        public code: string,
        public name: string,
        public borrowedBookTotal: number,
        public penaltyStatus: boolean,
        public penaltyEndDate: string,
    ) {
    }
}
