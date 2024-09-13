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
