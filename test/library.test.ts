const supertest = require("supertest");
import { app } from "../src/app";
import { prismaClient } from "../src/infrastructure/config/database";
import { logger } from "../src/infrastructure/logger/logger";
import { BookTestUtil, BorrowTestUtil, MemberTestUtil } from "./test.util";

describe('GET /api/books', () => {

    beforeEach(async () => {
        await BookTestUtil.createBooks();
    });

    afterEach(async () => {
        await BookTestUtil.deleteBooks();
    });

    it('should success to show list of books', async () => {
        const response = await supertest(app)
            .get('/api/books');

        logger.debug(response.body);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].bookCode).toBeDefined();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].author).toBeDefined();
        expect(response.body[0].stock).toBeDefined();
    });

    it('should show only available books', async () => {
        const inDb = await BookTestUtil.findBookByCode('B01T');

        await prismaClient.book.update({
            data: {
                stock: 0
            },
            where: {
                code: inDb?.code
            }
        });

        const response = await supertest(app)
            .get('/api/books');


        logger.debug(response.body);
        logger.debug(inDb);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].bookCode).toBeDefined();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].author).toBeDefined();
        expect(response.body[0].stock).toBeDefined();
        expect(response.body[0].stock).toBeGreaterThan(0);
        expect(response.body.filter((book: any) => book.bookCode === inDb?.code).length).toBe(0);
    });
});

describe('GET /api/members', () => {

    beforeEach(async () => {
        await MemberTestUtil.createMembers();
        await BookTestUtil.createBooks();
    });

    afterEach(async () => {
        await BorrowTestUtil.deleteBorrows();
        await MemberTestUtil.deleteMembers();
        await BookTestUtil.deleteBooks();
    });

    it('should success to show list of members', async () => {
        const inDb = await MemberTestUtil.findMemberByCode('M01T');

        const response = await supertest(app)
            .get('/api/members');

        logger.debug(response.body);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].memberCode).toBeDefined();
        expect(response.body[0].name).toBeDefined();
        expect(response.body[0].penaltyEndDate).toBeDefined();
        expect(response.body[0].borrowedBooks).toBeDefined();

        expect(response.body.filter((member: any) => member.memberCode === inDb?.code).length).toBeGreaterThan(0);
    });

    it('should show a valid quantity of borrowed book', async () => {
        await BorrowTestUtil.createBorrows('M01T', 'B01T');

        const inDb = await MemberTestUtil.findMemberByCode('M01T');

        const response = await supertest(app)
            .get('/api/members');

        logger.debug(response.body);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].memberCode).toBeDefined();
        expect(response.body[0].name).toBeDefined();
        expect(response.body[0].penaltyEndDate).toBeDefined();
        expect(response.body[0].borrowedBooks).toBeDefined();
        expect(response.body.filter((member: any) => member.memberCode === inDb?.code)[0].borrowedBooks).toBeGreaterThan(0);
    });
});

describe('POST /api/borrow', () => {

    beforeEach(async () => {
        await MemberTestUtil.createMembers();
        await BookTestUtil.createBooks();
    });

    afterEach(async () => {
        await BorrowTestUtil.deleteBorrows();
        await MemberTestUtil.deleteMembers();
        await BookTestUtil.deleteBooks();
    });

    it('should success to borrow a book', async () => {
        const response = await supertest(app)
            .post('/api/borrow')
            .send({
                memberCode: 'M01T',
                bookCode: 'B01T'
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe('Book borrowed successfully');
    });

    it('should fail to borrow a book when member not found', async () => {
        const response = await supertest(app)
            .post('/api/borrow')
            .send({
                memberCode: 'M999',
                bookCode: 'B01T'
            });

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body).toBeDefined();
        expect(response.body.errors).toBe('Member not found');
    });

    it('should fail to borrow a book when book not found', async () => {
        const response = await supertest(app)
            .post('/api/borrow')
            .send({
                memberCode: 'M01T',
                bookCode: 'B999'
            });

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body).toBeDefined();
        expect(response.body.errors).toBe('Book not found');
    });

    it('should fail to borrow a book when book is not available', async () => {
        await prismaClient.book.update({
            data: {
                stock: 0
            },
            where: {
                code: 'B02T'
            }
        });

        const response = await supertest(app)
            .post('/api/borrow')
            .send({
                memberCode: 'M01T',
                bookCode: 'B02T'
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body.errors).toBe('Book is not available');
    });

    it('should fail to borrow a book when member has borrowed maximum amount of book', async () => {
        await BorrowTestUtil.createBorrows('M02T', 'B01T');
        await BorrowTestUtil.createBorrows('M02T', 'B02T');

        const response = await supertest(app)
            .post('/api/borrow')
            .send({
                memberCode: 'M02T',
                bookCode: 'B03T'
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body.errors).toBe('Member has borrowed maximum amount of  book');
    });

    it('should fail to borrow a book when member is penalized', async () => {
        await MemberTestUtil.updateMemberPenalty('M03T');
        const response = await supertest(app)
            .post('/api/borrow')
            .send({
                memberCode: 'M03T',
                bookCode: 'B01T'
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body.errors).toBe('Member is penalized');
    });
});
