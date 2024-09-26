import express from "express";
import { 
    getAllProduct,
    getProductByid,
    createProduct,
    deleteProduct,
    updateProduct
} from "../controllers/ProductController.js";
import upload from '../config/multerConfig.js'; // Sesuaikan dengan path ke multerConfig.js

const router = express.Router();

router.get('/products', getAllProduct);
router.get('/products/:id', getProductByid);
router.post('/products', upload.single('gambar'), createProduct);
router.delete('/products/:id', deleteProduct);
router.patch('/products/:id', upload.single('gambar'), updateProduct); // Route untuk update product

export default router;
