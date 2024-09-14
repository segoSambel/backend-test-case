const supertest = require("supertest");
import { app } from "../src/app";
import { logger } from "../src/infrastructure/logger/logger";

describe('GET /api/books', () => {
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

    });
});

describe('GET /api/members', () => {
    it('should success to show list of members', async () => {
        const response = await supertest(app)
            .get('/api/members');

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].memberCode).toBeDefined();
        expect(response.body[0].name).toBeDefined();
        expect(response.body[0].penaltyEndDate).toBeDefined();
    });

    it('should show a valid quantity of borrowed book', async () => {

    });
});
