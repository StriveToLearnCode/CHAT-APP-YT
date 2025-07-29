import express from "express";

// 引入控制器 
import { signup, login, logout } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

export default router