import express from 'express';
import * as todoController from "../controllers/todo-сontroller.js";

const router = express.Router();

// RESTful endpoints for tasks
router.get("/", todoController.getAll);
router.get("/:id", todoController.getById);
router.post("/", todoController.create);
router.put("/:id", todoController.update);
router.delete("/:id", todoController.remove);

export default router;