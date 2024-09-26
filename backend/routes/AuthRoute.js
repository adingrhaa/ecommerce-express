import express from "express";
import {
    loginAdmin,
    logoutAdmin,
    loginUser,
    logoutUser,
    me
} from "../controllers/AuthController.js";
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.delete('/logout', logoutAdmin);
router.post('/login_user', loginUser);
router.delete('/logout_user', logoutUser);
router.get('/me', verifyToken, me);

export default router;