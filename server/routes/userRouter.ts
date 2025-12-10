import { Router } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../prisma";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware";
const userRouter = Router();

userRouter.post("/signin", async (req, res) => {
  const { email, password } = await req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.json({ message: "Invalid Email" }).status(400);
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.json({ message: "Invalid password" }).status(400);
    return;
  }
  const token = jwt.sign(user.id, process.env.JWT_SECRET || "random");
  res.cookie("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/trade",
  });
  res.json({ message: "Sigin success", token });
});

userRouter.post("/signup", async (req, res) => {
  const { email, password } = await req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    res.json({ message: "Email exists" }).status(400);
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  res.json({ message: "Account created", id: newUser.id });
});

export default userRouter;
