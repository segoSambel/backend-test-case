export class BookResponse {
    constructor(
        public bookCode: string,
        public title: string,
        public author: string,
        public stock: number
    ) {
    }
}
