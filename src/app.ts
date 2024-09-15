import express from "express";
import swaggerUi from 'swagger-ui-express';
import { errorMiddleware } from "./application/common/middleware/error-middleware";
import bookRoutes from "./application/routes/BookRoutes";
import borrowRoutes from "./application/routes/BorrowRoutes";
import memberRoutes from "./application/routes/MemberRoutes";

const swaggerDoc = require('../docs/swagger.json');

export const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api', bookRoutes);
app.use('/api', memberRoutes);
app.use('/api', borrowRoutes);

app.use(errorMiddleware);
