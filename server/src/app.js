import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from "./routes/todo-routes.js";
import { errorHandler } from "./middlewares/error-handler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes)

app.use(errorHandler);

export default app;

