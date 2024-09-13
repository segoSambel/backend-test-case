export class MemberResponse {
    constructor(
        public memberCode: string,
        public name: string,
        public borrowedBookTotal: number,
        public penaltyStatus: boolean,
        public penaltyEndDate: string,
    ) {
    }
}
