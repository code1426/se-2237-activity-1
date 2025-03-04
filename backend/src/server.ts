import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import colorRoutes from "./routes/color";
import employeeRoutes from "./routes/employee";

dotenv.config();
const app = express();
export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use("/colors", colorRoutes);
app.use("/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
