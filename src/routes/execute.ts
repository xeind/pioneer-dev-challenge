import { Request, Response, Router } from "express";
import { executeHandler } from "../handlers/execute";

const router = Router();

router.get("/execute", (req: Request, res: Response) => {
  const { message, code } = req.query;

  if (code !== "pioneerdevai")
    return res.status(401).send({ message: "Unauthorized" });

  try {
    const restaurants = await executeHandler(message);
    res.json({ message, code });
  } catch (e) {
    res.status(500);
  }

  res.json({ message, code });
});

export default router;
