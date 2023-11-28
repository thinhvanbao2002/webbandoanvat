import express from "express";
import orderController from "../controllers/orderController.js";

const router = express.Router();

router.get('/get', orderController.getOrder);

router.get('/search', orderController.searchOrder);

router.post('/create', orderController.createOrder);

router.put('/update/:id', orderController.updateOrder);

router.delete('/delete/:id', orderController.deleteOrder);

export default router;
