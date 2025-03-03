import { Router } from "express";
import type { Request, Response } from "express";
import { prisma } from "../server";

const router = Router();

// get color by id
router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const color = prisma.color.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!color) {
    res.status(404).json({ message: "Color not found" });
    return;
  }

  res.status(200).json(color);
});

// create color
router.post("/", (req: Request, res: Response) => {
  const { name, hex } = req.body;

  if (!name || !hex) {
    res.status(400).json({ message: "Name and hex are required" });
    return;
  }

  const color = prisma.color.create({
    data: {
      name,
      value: hex,
    },
  });

  if (!color) {
    res.status(500).json({ message: "Failed to create color" });
    return;
  }

  res.status(201).json(color);
});

export default router;
