import express, { Express } from "express";
import { environment } from "./environment.js";
import cors from "cors";
import errorHandler from "./middlewares/errorMiddleware.js";
import { checkConnection } from "./database/check-connection.js";

const app: Express = express();
const port = environment.PORT;
app.use(express.json());
app.use(cors());

checkConnection();
// Public routes
import authRoutes from "./routes/publicAccess/auth.routes.js";
import tagRoutes from "./routes/publicAccess/tag.routes.js";
import categoryRoutes from "./routes/publicAccess/category.routes.js";
import promocodeRoutes from "./routes/publicAccess/promocode.routes.js";
import reviewsRoutes from "./routes/publicAccess/review.routes.js";
// Customer routes
import customerRoutes from "./routes/customerAccess/customer.routes.js";
import reviewRoutesCustomer from "./routes/customerAccess/review.routes.js";
// Admin routes
import customerRoutesAdmin from "./routes/adminAccess/customer.routes.js";
import tagRoutesAdmin from "./routes/adminAccess/tag.routes.js";
import categoryRoutesAdmin from "./routes/adminAccess/category.routes.js";
import promocodeRoutesAdmin from "./routes/adminAccess/promocode.routes.js";
import reviewRoutesAdmin from "./routes/adminAccess/review.routes.js";

// Public routes
app.use("/api/auth", authRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/promocodes", promocodeRoutes);
app.use("/api/reviews", reviewsRoutes);
// Customer routes
app.use("/api/customers", customerRoutes);
app.use("/api/reviews", reviewRoutesCustomer);
// Admin routes
app.use("/api/admin/customers", customerRoutesAdmin);
app.use("/api/admin/tags", tagRoutesAdmin);
app.use("/api/admin/categories", categoryRoutesAdmin);
app.use("/api/admin/promocodes", promocodeRoutesAdmin);
app.use("/api/admin/reviews", reviewRoutesAdmin);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
