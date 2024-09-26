import express from "express";
import { 
    getAllSubcategory,
    getSubcategoryByid,
    createSubcategory,
    deleteSubcategory,
    updateSubcategory
} from "../controllers/SubcategoryController.js";
import upload from '../config/multerConfig.js'; // Sesuaikan dengan path ke multerConfig.js

const router = express.Router();

router.get('/subcategories', getAllSubcategory);
router.get('/subcategories/:id', getSubcategoryByid);
router.post('/subcategories', upload.single('gambar'), createSubcategory);
router.delete('/subcategories/:id', deleteSubcategory);
router.patch('/subcategories/:id', upload.single('gambar'), updateSubcategory);

export default router;
