import express from "express";
import {
    getAllUser,
    getUserByid,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/UserController.js";

const router = express.Router();

router.get('/users', getAllUser);
router.get('/users/:id', getUserByid);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;