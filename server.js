import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// router importing
import UserRouter from "./routers/user/UserRouter.js";
import BoardRouter from "./routers/board/BoardRouter.js";

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log("Server is running....");
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend is live" });
});

// User endpoint
app.use("/api/user", UserRouter);

// Board Endpoint
app.use("/api/board", BoardRouter);
