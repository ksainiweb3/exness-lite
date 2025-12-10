import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter";
import tradeRouter from "./routes/tradeRouter";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/trade", tradeRouter);

app.listen(3000, () => console.log("Server listening on 3000"));
