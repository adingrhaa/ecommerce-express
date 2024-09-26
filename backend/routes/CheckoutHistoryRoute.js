import express from 'express';
import { createCheckoutHistory } from '../controllers/CheckoutHistoryController.js';

const router = express.Router();

router.post('/checkout_histories', createCheckoutHistory);

export default router;
