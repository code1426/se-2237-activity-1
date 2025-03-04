import { Router } from "express";
import type { Request, Response } from "express";
import { employeeDatas } from "../db";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const employees = await new Promise((resolve) => setTimeout(() => resolve(employeeDatas), 1000));
  if (!employees) {
    res.status(404).json({ message: "Employees not found" });
    return;
  }
  res.status(200).json(employees);
});

export default router;
