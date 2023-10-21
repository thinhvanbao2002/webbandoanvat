import Express from "express";
import userController from "../controllers/userController.js";

const router = Express.Router();

router.get('/', userController.getUser);

router.get('/:id', userController.getUserByID);

router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

export default router;