import { Book } from "../../domain/book/Book";
import { Borrow } from "../../domain/borrow/Borrow";
import { IBorrowRepository } from "../../domain/borrow/IBorrowRepository";
import { Member } from "../../domain/member/Member";
import { prismaClient } from "../config/database";

export class BorrowRepository implements IBorrowRepository {
    async findBorrow(bookCode: string, memberCode: string): Promise<Borrow | null> {
        const borrow = await prismaClient.borrow.findFirst({
            where: {
                bookCode: bookCode,
                memberCode: memberCode,
                returnedDate: null
            },
            orderBy: {
                borrowDate: 'desc'
            },
            include: {
                Book: true,
                Member: true
            }
        });

        if (borrow) {
            const borrowedBookByMember = await prismaClient.borrow.findMany({
                where: {
                    memberCode: memberCode
                }
            });

            const book = new Book(borrow.Book.code, borrow.Book.title, borrow.Book.author, borrow.Book.stock);
            const member = new Member(borrow.Member.code, borrow.Member.name, borrow.Member.penaltyEndDate, borrowedBookByMember.length);

            return new Borrow(borrow.id, book, member, borrow.borrowDate, borrow.dueDate, borrow.returnedDate);
        }

        return null;
    }

    async saveBorrow(borrow: Borrow): Promise<void> {
        await prismaClient.borrow.create({
            data: {
                bookCode: borrow.book.bookCode,
                memberCode: borrow.member.memberCode,
                borrowDate: borrow.borrowDate,
                dueDate: borrow.dueDate,
                returnedDate: borrow.returnDate
            }
        });
    }

    async updateBorrow(borrow: Borrow): Promise<void> {
        if (borrow.id === null) return;
        await prismaClient.borrow.update({
            where: {
                id: borrow.id
            },
            data: {
                returnedDate: borrow.returnDate
            }
        });
    }
}
