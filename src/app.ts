import cors from "cors";
import express from "express";

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

app.get("/", (req, res) => {
  res.json(`Welcome to Wahed Nur's portfolio! WS Portfolio site is running`);
});

export default app;
