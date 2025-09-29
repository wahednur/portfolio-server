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
    console.log(`PostgreSQL Database connection failed`, error);
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

(async () => {
  startServer();
})();

process.on("SIGTERM", () => {
  console.log("SIGTERM signal recieved... Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal recieved... Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejecttion detected... Server shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected... Server shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
