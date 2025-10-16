import express from 'express';
import * as todoController from "../controllers/todo-сontroller.js";
import { validateReqPropsMiddleware } from "../middlewares/validate.js";
import {createTodoSchema, idParamSchema, searchQuerySchema, updateTodoSchema} from "../utils/todo-schema.js";


const router = express.Router();

router.get(
    "/",
    validateReqPropsMiddleware(searchQuerySchema, 'query'),
    todoController.getAll
);

router.get(
    "/:id",
    validateReqPropsMiddleware(idParamSchema, 'params'),
    todoController.getById
);

router.post(
    "/",
    validateReqPropsMiddleware(createTodoSchema, 'body'),
    todoController.create
);

router.put(
    "/:id",
    validateReqPropsMiddleware(idParamSchema, 'params'),
    validateReqPropsMiddleware(updateTodoSchema, 'body'),
    todoController.update
);

router.delete(
    "/:id",
    validateReqPropsMiddleware(idParamSchema, 'params'),
    todoController.remove
);

export default router;