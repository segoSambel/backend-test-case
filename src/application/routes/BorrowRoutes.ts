import { Router } from 'express';
import { BookRepository } from "../../infrastructure/persistence/BookRepository";
import { BorrowRepository } from "../../infrastructure/persistence/BorrowRepository";
import { MemberRepository } from "../../infrastructure/persistence/MemberRepository";
import { BorrowController } from "../controllers/BorrowController";
import { BorrowBookUseCase } from "../usecases/borrow/BorrowBookUseCase";
import { ReturnBookUseCase } from "../usecases/borrow/ReturnBookUseCase";

const router = Router();
const bookRepository = new BookRepository();
const memberRepository = new MemberRepository();
const borrowRepository = new BorrowRepository();

const borrowController = new BorrowController(
    new BorrowBookUseCase(memberRepository, bookRepository, borrowRepository),
    new ReturnBookUseCase(borrowRepository, bookRepository, memberRepository)
);

router.post('/borrow', borrowController.borrow.bind(borrowController));
router.post('/return', borrowController.return.bind(borrowController));

export default router;
