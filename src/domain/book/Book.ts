
export class Book {
    constructor(
        public bookCode: string,
        public title: string,
        public author: string,
        public stock: number,
    ) { }

    canBeBorrowed(): boolean {
        return this.stock > 0;
    }

    decreaseStock() {
        if (this.canBeBorrowed()) {
            this.stock--;
        }
    }

    increaseStock() {
        this.stock++;
    }
}
