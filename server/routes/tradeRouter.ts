import { Router } from "express";
import { authMiddleware } from "../middleware";

const tradeRouter = Router();

tradeRouter.use(authMiddleware);

tradeRouter.get("/test", async (req, res) => {
  res.json({ message: "/test ", id: req.id });
});

export default tradeRouter;
