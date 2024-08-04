import express, { Express, Request, Response, NextFunction } from "express";
import { DbConfig } from "./db";
import cors from "cors";
import dotenv from "dotenv";
import { AuthRoute } from "./routes/auths/authRoute";
import cookieParser from "cookie-parser";
import { authenticateToken } from "./middleware/authenticateToken";
import { ErrorHandlerMiddleware } from "./middleware/ErrorHandlerMiddleware";

dotenv.config();

const allowedOrigins = [
  "http://localhost:5173",
  "https://aws-client.netlify.app/",
];

const corsOption = {
  // origin: "http://localhost:5173",
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(String(origin))) {
      return callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const app: Express = express();
const db = new DbConfig(process.env.DATABASE_URL!);

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

const startApp = async () => {
  try {
    await db.connect();
    app.use("/auth/", AuthRoute);
    app.use("/", (req: Request, res: Response) => res.send("Testing..."));
    app.use(ErrorHandlerMiddleware);

    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
