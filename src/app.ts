import cors from "cors";
import express from "express";
import { router } from "./app/routes";

//App initialization
const app = express();

//Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.json(`Welcome to Wahed Nur's portfolio! WS Portfolio site is running`);
});

export default app;
