import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import AdminRoute from "./routes/AdminRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import SubcategoryRoute from "./routes/SubcategoryRoute.js";
import CartRoute from "./routes/CartRoute.js";
import CheckoutInformationRoute from "./routes/CheckoutInformationRoute.js";
import CheckoutHistoryRoute from "./routes/CheckoutHistoryRoute.js";
dotenv.config();

const app = express();

(async()=>{
    await db.sync();
})();

app.use(session({
    secret:process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Menambahkan middleware untuk menyajikan file statis dari direktori uploads
app.use(UserRoute);
app.use(AdminRoute);
app.use(AuthRoute);
app.use(CategoryRoute);
app.use(ProductRoute);
app.use(SubcategoryRoute);
app.use(CartRoute);
app.use(CheckoutInformationRoute);
app.use(CheckoutHistoryRoute);

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...');
});
