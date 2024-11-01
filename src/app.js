import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import { ROUTE_LINK } from "./config.js";
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(ROUTE_LINK, authRoutes);
app.use(ROUTE_LINK, taskRoutes);

export default app;
