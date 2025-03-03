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

export default router;
