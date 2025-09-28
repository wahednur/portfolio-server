import dotenv from "dotenv";
import http, { Server } from "http";
import app from "./app";
import { prisma } from "./app/config/db";

dotenv.config();

let server: Server | null = null;

async function connectDB() {
  try {
    await prisma.$connect();
    console.log(`PostgreSQL Database connected successfully`);
  } catch (error) {
    console.log(`PostgreSQL Database connection failed`);
    process.exit(1);
  }
}

async function startServer() {
  try {
    await connectDB();
    server = http.createServer(app);
    server.listen(process.env.PORT, () => {
      console.log(
        `Wahed Nur portfolios server running on ${process.env.PORT} port`
      );
    });
  } catch (error) {
    console.error("Error during server startup", error);
  }
}

startServer();
