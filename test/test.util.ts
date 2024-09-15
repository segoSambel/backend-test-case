import { prismaClient } from "../src/infrastructure/config/database";

export class MemberTestUtil {
    static async createMembers() {
        const members = [
            { code: 'M01T', name: 'Member Test 1', penaltyEndDate: null },
            { code: 'M02T', name: 'Member Test 2', penaltyEndDate: null },
            { code: 'M03T', name: 'Member Test 3', penaltyEndDate: null }
        ];

        await prismaClient.member.createMany({
            data: members
        });
    }

    static async deleteMembers() {
        await prismaClient.member.deleteMany(
            {
                where: {
                    code: {
                        in: ['M01T', 'M02T', 'M03T']
                    }
                }
            }
        );
    }

    static async findMemberByCode(memberCode: string) {
        return await prismaClient.member.findUnique({
            where: {
                code: memberCode
            }
        });
    }

    static async updateMemberPenalty(memberCode: string, penaltyEndDate: Date = new Date()) {
        await prismaClient.member.update({
            data: {
                penaltyEndDate: penaltyEndDate
            },
            where: {
                code: memberCode
            }
        });
    }
}

export class BookTestUtil {
    static async createBooks() {
        const books = [
            { code: 'B01T', title: 'Book Test 1', author: 'Author 1', stock: 1 },
            { code: 'B02T', title: 'Book Test 2', author: 'Author 2', stock: 1 },
            { code: 'B03T', title: 'Book Test 3', author: 'Author 3', stock: 1 }
        ];

        await prismaClient.book.createMany({
            data: books
        });
    }

    static async deleteBooks() {
        await prismaClient.book.deleteMany(
            {
                where: {
                    code: {
                        in: ['B01T', 'B02T', 'B03T']
                    }
                }
            }
        );
    }

    static async findBookByCode(bookCode: string) {
        return await prismaClient.book.findUnique({
            where: {
                code: bookCode
            }
        });
    }
}

export class BorrowTestUtil {
    static async createBorrows(memberCode: string, bookCode: string, borrowDate: Date = new Date(), dueDate: Date = new Date()) {
        await prismaClient.borrow.create({
            data: {
                bookCode: bookCode,
                memberCode: memberCode,
                borrowDate: borrowDate,
                dueDate: dueDate,
                returnedDate: null
            }
        });
    }

    static async deleteBorrows() {
        await prismaClient.borrow.deleteMany();
    }

    static async findBorrow(bookCode: string, memberCode: string) {
        return await prismaClient.borrow.findFirst({
            where: {
                bookCode: bookCode,
                memberCode: memberCode
            }
        });
    }
}
