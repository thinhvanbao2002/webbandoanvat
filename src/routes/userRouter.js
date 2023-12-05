import Express from "express";
import userController from "../controllers/userController.js";
import authentication from "../authentication/index.js";

const router = Express.Router();

router.get('/get', userController.getUser);

router.get('/search', authentication.userCheckToken, userController.searchUser);

router.get('/acceptverifymail/:id/:token', userController.verifyEmail);

router.post('/signin', userController.signin);

router.post('/login', userController.login);

router.put('/update/:id', userController.updateUser);

router.delete('/delete/:id', userController.deleteUser);

router.put('/updateavt/:id', authentication.userCheckToken, userController.updateAvtUser);

// router.put('/abc/:id', userController.test);


export default router;