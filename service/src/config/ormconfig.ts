import { DataSource } from "typeorm";
import dotenv from "dotenv";
import {Report} from "../feature/report/entities/Report.ts";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_HOST,
    entities: [Report],
    synchronize: true,
    logging: false,
});
