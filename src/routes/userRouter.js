import Express from "express";
import userController from "../controllers/userController.js";

const router = Express.Router();

router.get('/get', userController.getUser);

router.get('/search', userController.searchUser);

router.post('/acceptverifymail/:id/:token', userController.verifyEmail);

router.post('/signin', userController.signin);

router.post('/login', userController.login);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.put('/updateavt/:id', userController.updateAvtUser);

// router.put('/abc/:id', userController.test);


export default router;