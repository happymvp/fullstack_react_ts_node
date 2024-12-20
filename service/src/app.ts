import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/ormconfig";
import reportRoutes from "./feature/report/routes.ts";
import { securityMiddlewares } from "./middleware/security";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

// Security middlewares
securityMiddlewares(app);

// Routes
app.use("/api", reportRoutes);

// File uploads & static serving
app.use("/uploads", express.static("uploads"));

// Database Initialization
AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => console.log(error));

export default app;
