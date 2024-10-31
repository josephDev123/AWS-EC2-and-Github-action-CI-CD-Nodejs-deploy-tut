"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoute_1 = require("./routes/auths/authRoute");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const ErrorHandlerMiddleware_1 = require("./middleware/ErrorHandlerMiddleware");
dotenv_1.default.config();
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://aws-client.netlify.app",
// ];
// const corsOption = {
//   origin: (
//     origin: string | undefined,
//     callback: (err: Error | null, allow?: boolean) => void
//   ) => {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(String(origin))) {
//       return callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };
const app = (0, express_1.default)();
const db = new db_1.DbConfig(process.env.DATABASE_URL);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.connect();
        app.use("/auth", authRoute_1.AuthRoute);
        app.use("/testing", (req, res) => res.send("Testing...."));
        app.use("/users", (req, res) => res.send("users...."));
        app.use(ErrorHandlerMiddleware_1.ErrorHandlerMiddleware);
        app.listen(process.env.PORT || 5000, () => {
            console.log(`listening on port ${process.env.PORT || 5000}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
startApp();
//# sourceMappingURL=index.js.map