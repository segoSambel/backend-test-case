import { NextFunction, Request, Response } from "express";
import { BorrowBookUseCase } from "../usecases/borrow/BorrowBookUseCase";
import { ReturnBookUseCase } from "../usecases/borrow/ReturnBookUseCase";

export class BorrowController {
    constructor(
        private borrowUseCase: BorrowBookUseCase,
        private returnUseCase: ReturnBookUseCase
    ) { }

    async borrow(req: Request, res: Response, next: NextFunction) {
        try {
            const { memberCode, bookCode } = req.body;
            await this.borrowUseCase.execute(memberCode, bookCode);

            res.status(200).json({ message: 'Book borrowed successfully' });
        } catch (e) {
            next(e);
        }
    }

    async return(req: Request, res: Response, next: NextFunction) {
        try {
            const { memberCode, bookCode } = req.body;
            await this.returnUseCase.execute(bookCode, memberCode);

            res.status(200).json({ message: 'Book returned successfully' });
        } catch (e) {
            next(e);
        }
    }
}
