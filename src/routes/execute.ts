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
    console.error("Error in executeHandler:", e);
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    res.status(500).json({
      error: "Internal server error",
      message: errorMessage,
    });
  }
});

export default router;
