import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorMiddleware.js";
import { checkConnection } from "./database/check-connection.js";
import { adminAccess } from "./middlewares/adminAccessMiddleware.js";
import { onRequest } from "firebase-functions/v2/https";
const app = express();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
checkConnection();
// Public routes
import authRoutes from "./routes/publicAccess/auth.routes.js";
import tagRoutes from "./routes/publicAccess/tag.routes.js";
import categoryRoutes from "./routes/publicAccess/category.routes.js";
import collectionRoutes from "./routes/publicAccess/collection.routes.js";
import promocodeRoutes from "./routes/publicAccess/promocode.routes.js";
import reviewsRoutes from "./routes/publicAccess/review.routes.js";
import productRoutes from "./routes/publicAccess/product.routes.js";
import giftcardRoutes from "./routes/publicAccess/giftcard.routes.js";
import paymentRoutes from "./routes/publicAccess/payment.routes.js";
import visualRoutes from "./routes/publicAccess/visual.routes.js";
// Customer routes
import customerRoutes from "./routes/customerAccess/customer.routes.js";
import reviewRoutesCustomer from "./routes/customerAccess/review.routes.js";
import giftcardRoutesCustomer from "./routes/customerAccess/giftcard.routes.js";
import paymentRoutesCustomer from "./routes/customerAccess/payment.routes.js";
import orderRoutesCustomer from "./routes/customerAccess/order.routes.js";
// Admin routes
import customerRoutesAdmin from "./routes/adminAccess/customer.routes.js";
import tagRoutesAdmin from "./routes/adminAccess/tag.routes.js";
import categoryRoutesAdmin from "./routes/adminAccess/category.routes.js";
import collectionRoutesAdmin from "./routes/adminAccess/collection.routes.js";
import promocodeRoutesAdmin from "./routes/adminAccess/promocode.routes.js";
import reviewRoutesAdmin from "./routes/adminAccess/review.routes.js";
import campaignRoutesAdmin from "./routes/adminAccess/campaign.routes.js";
import productRoutesAdmin from "./routes/adminAccess/product.routes.js";
import giftcardRoutesAdmin from "./routes/adminAccess/giftcard.routes.js";
import paymentStatusAdmin from "./routes/adminAccess/paymentStatus.routes.js";
import orderStatusAdmin from "./routes/adminAccess/orderStatus.routes.js";
import orderRoutesAdmin from "./routes/adminAccess/order.routes.js";
import visualRoutesAdmin from "./routes/adminAccess/visual.routes.js";
import chiffreRoutes from "./routes/adminAccess/chiffre.routes.js";
import { verifyToken } from "./middlewares/authMiddleware.js";
// Public routes
app.use("/api/auth", authRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/promocodes", promocodeRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/products", productRoutes);
app.use("/api/giftcards", giftcardRoutes);
app.use("/api/visuals", visualRoutes);
app.use("/api/payment", paymentRoutes);
// Customer routes
app.use("/api/customer", customerRoutes);
app.use("/api/reviews", reviewRoutesCustomer);
app.use("/api/giftcards", giftcardRoutesCustomer);
app.use("/api/payment", paymentRoutesCustomer);
app.use("/api/orders", orderRoutesCustomer);
// Admin routes
app.use("/api/admin/customers", verifyToken, adminAccess, customerRoutesAdmin);
app.use("/api/admin/tags", verifyToken, adminAccess, tagRoutesAdmin);
app.use("/api/admin/categories", verifyToken, adminAccess, categoryRoutesAdmin);
app.use(
  "/api/admin/collections",
  verifyToken,
  adminAccess,
  collectionRoutesAdmin
);
app.use(
  "/api/admin/promocodes",
  verifyToken,
  adminAccess,
  promocodeRoutesAdmin
);
app.use("/api/admin/reviews", verifyToken, adminAccess, reviewRoutesAdmin);
app.use(
  "/api/admin/marketing/campaigns",
  verifyToken,
  adminAccess,
  campaignRoutesAdmin
);
app.use("/api/admin/products", verifyToken, adminAccess, productRoutesAdmin);
app.use("/api/admin/giftcards", verifyToken, adminAccess, giftcardRoutesAdmin);
app.use(
  "/api/admin/payment-status",
  verifyToken,
  adminAccess,
  paymentStatusAdmin
);
app.use("/api/admin/order-status", verifyToken, adminAccess, orderStatusAdmin);
app.use("/api/admin/orders", verifyToken, adminAccess, orderRoutesAdmin);
app.use("/api/admin/visuals", verifyToken, adminAccess, visualRoutesAdmin);
app.use("/api/admin/chiffres", verifyToken, adminAccess, chiffreRoutes);
app.use(errorHandler);

// Pour travailler en localhost avec firebase emulator
app.get("/", (req, res) => {
  res.status(200).send("Hello from Express.js!");
});
// Export de l'application en tant que fonction Firebase
export const api = onRequest(app);
