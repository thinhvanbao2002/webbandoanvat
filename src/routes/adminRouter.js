import Express from "express";
import adminController from "../controllers/adminController.js";

const router = Express.Router();

router.get('/', adminController.getUser);

router.get('/:id', adminController.getUserByID);

router.post('/', adminController.createUser);

router.put('/:id', adminController.updateUser);

router.delete('/:id', adminController.deleteUser);

export default router;

