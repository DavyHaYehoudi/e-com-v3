import express, { Express, Request, Response } from "express";
import { environment } from "./environment.js";
import cors from "cors";
import errorHandler from "./middlewares/errorMiddleware.js";
import { checkConnection } from "./database/check-connection.js";


const app: Express = express();
const port = environment.PORT;
app.use(express.json());
app.use(cors());

checkConnection();

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
