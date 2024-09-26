import express from "express";
import { 
    getAllCart,
    getCartById,
    createCart,
    updateCart,
    deleteCart,
} from "../controllers/CartController.js";
import upload from '../config/multerConfig.js'; // Sesuaikan dengan path ke multerConfig.js

const router = express.Router();

router.get('/carts', getAllCart);
router.get('/carts/:id', getCartById);
router.post('/carts', upload.single('gambar'), createCart);
router.patch('/carts/:id', upload.single('gambar'), updateCart);
router.delete('/carts/:id', deleteCart);

export default router;
