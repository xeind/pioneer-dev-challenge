import { Request, Response, Router } from "express";
import { executeHandler } from "../handlers/execute";

const router = Router();

router.get("/execute", async (req: Request, res: Response) => {
  const { message, code } = req.query;

  if (typeof message !== "string")
    return res.status(404).json({ error: "Message must be a string" });

  if (code !== "pioneerdevai")
    return res.status(401).send({ message: "Unauthorized" });

  try {
    const result = await executeHandler(message);
    // console.log(result);
    res.json(result);
  } catch (e) {
    res.status(500);
  }
});

export default router;
