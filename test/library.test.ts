const supertest = require("supertest");
import {app} from "../src/app";
import {logger} from "../src/infrastructure/logger/logger";

describe('GET /api/books', () => {
    it('should success to show list of books', async () => {
        const response = await supertest(app)
            .get('/api/books');

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
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
    });

    it('should show a valid quantity of borrowed book', async () => {

    });
});
