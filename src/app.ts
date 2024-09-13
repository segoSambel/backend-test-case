import express from "express";
import bookRoutes from "./interfaces/routes/BookRoutes";
import swaggerUi from 'swagger-ui-express';
import {errorMiddleware} from "./common/middleware/error-middleware";

const swaggerDoc = require('../docs/swagger.json');

export const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api', bookRoutes);

app.use(errorMiddleware);
