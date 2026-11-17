import express from "express";
import cors from "cors";
import helmet from "helmet";
import contactRoutes from "./routes/contactRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin: (process.env.CLIENT_ORIGIN || "http://localhost:5173").split(","),
  }),
);
app.use(express.json({ limit: "10kb" }));
app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/contact", contactRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;
