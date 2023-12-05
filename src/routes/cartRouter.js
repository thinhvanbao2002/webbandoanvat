import express from "express";
import cartController from "../controllers/cartController.js";

const router = express.Router();

router.get('/get/:ID', cartController.getCart);

router.post('/add', cartController.addCart);

router.delete('/delete/:id', cartController.deleteCart);

export default router;
