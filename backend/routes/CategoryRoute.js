import express from "express";
import { 
    getAllCategory,
    getCategoryByid,
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/CategoryController.js";

const router = express.Router();

router.get('/categories', getAllCategory);
router.get('/categories/:id', getCategoryByid);
router.post('/categories', createCategory);
router.patch('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;
