import express from 'express';
import { login, register, logout } from '../controllers/user.controller.js';
import { isLoggedIn } from '../middlewares/isLoggedin.js';

const router = express.Router();

router.route('/signup').post(register);
router.route('/login').post(login);
router.route('/logout').get(isLoggedIn, logout);

export default router