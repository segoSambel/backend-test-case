import { Borrow } from "./Borrow";

export interface IBorrowRepository {
    saveBorrow(borrow: Borrow): Promise<void>;
    findBorrow(bookCode: string, memberCode: string): Promise<Borrow | null>;
    updateBorrow(borrow: Borrow): Promise<void>;
}
