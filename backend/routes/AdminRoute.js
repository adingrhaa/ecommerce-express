import express from "express";
import {
    getAllAdmin,
    getAdminByid,
    createAdmin,
    updateAdmin,
    deleteAdmin
} from "../controllers/AdminController.js";

const router = express.Router();

router.get('/admin', getAllAdmin);
router.get('/admin/:id', getAdminByid);
router.post('/admin', createAdmin);
router.patch('/admin/:id', updateAdmin);
router.delete('/admin/:id', deleteAdmin);

export default router;