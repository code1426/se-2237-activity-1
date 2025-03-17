import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import colorRoutes from "./routes/color";
import employeeRoutes from "./routes/employee";
import studentRoutes from "./routes/student";

dotenv.config();
const app = express();
export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use("/colors", colorRoutes);
app.use("/employees", employeeRoutes);
app.use("/students", studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
