import Express from "express";
import adminController from "../controllers/adminController.js";

const router = Express.Router();

router.post('/login', adminController.login);

export default router;

