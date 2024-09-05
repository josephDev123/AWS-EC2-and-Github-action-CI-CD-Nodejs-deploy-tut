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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Oauth = googleapis_1.google.auth.OAuth2;
const OauthClient = new Oauth(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
OauthClient.setCredentials({ refresh_token: process.env.EMAIL_REFRESH_TOKEN });
// Define a function to send emails
const sendMail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ otp, email }) {
    try {
        const access_token = yield OauthClient.getAccessToken();
        // Create a reusable transporter
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.MYEMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.EMAIL_REFRESH_TOKEN,
                accessToken: access_token.token,
            },
        });
        const info = yield transporter.sendMail({
            from: process.env.MYEMAIL,
            to: email,
            subject: "Confirmation OTP",
            text: otp,
            html: `<p>Pls don't expose this otp: ${otp}</p>`,
        });
        console.log("Email sent:", info.messageId);
        return info.messageId;
    }
    catch (error) {
        console.error("Failed to send email:", error);
        throw error; // Rethrow the error so it can be handled by the caller
    }
});
exports.sendMail = sendMail;
//# sourceMappingURL=sendMail.js.map