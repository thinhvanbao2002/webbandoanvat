import Express from "express";
import userController from "../controllers/userController.js";

const router = Express.Router();

router.get('/get', userController.getUser);

router.get('/search', userController.searchUser);

router.get('/acceptverifymail/:id/:token', userController.verifyEmail);

router.post('/signin', userController.signin);

router.post('/login', userController.login);

router.put('/update/:id', userController.updateUser);

router.delete('/delete/:id', userController.deleteUser);

router.put('/updateavt/:id', userController.updateAvtUser);

// router.put('/abc/:id', userController.test);


export default router;