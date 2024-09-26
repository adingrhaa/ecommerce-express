import express from "express";
import { 
    getAllCheckoutInformation,
    getCheckoutInformationByid,
    createCheckoutInformation
} from "../controllers/CheckoutInformationController.js";

const router = express.Router();

router.get('/checkout_informations', getAllCheckoutInformation);
router.get('/checkout_informations/:id', getCheckoutInformationByid);
router.post('/checkout_informations', createCheckoutInformation);

export default router;
