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
exports.authenticateToken = authenticateToken;
const VerifyToken_1 = __importDefault(require("../utils/VerifyToken"));
function authenticateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const tokenHeader = req.headers.cookie;
            // const tokenHeader = req.headers.authorization;
            if (!tokenHeader) {
                return res.status(403).json({
                    error: true,
                    showMessage: false,
                    message: "Missing authorization header",
                });
            }
            const tokenParts = tokenHeader.split(" ");
            // console.log(tokenParts);
            // const [tokenCredential, user] = tokenParts;
            const tokenCredential = tokenParts.filter((token) => token.startsWith("token"));
            // console.log(tokenCredential);
            let token = (_a = tokenCredential[0]) === null || _a === void 0 ? void 0 : _a.split("=")[1];
            // console.log(token);
            // Here you can add code to validate the token, such as checking it against a database or decoding it.
            //check if token is present
            if (!token) {
                return res.status(403).json({
                    error: true,
                    showMessage: false,
                    message: "token not provided",
                });
            }
            // verify the token
            const verifyToken = yield (0, VerifyToken_1.default)(token ? token : "");
            // console.log(verifyToken);
            // If the token is valid, you can proceed to the next middleware or the route handler.
            // If the token is invalid, you can return a 401 response or handle it as needed.
            next();
        }
        catch (error) {
            // Handle any errors that occur within the try block here.
            console.log(error.message);
            if ((error === null || error === void 0 ? void 0 : error.message) === "jwt expired") {
                return res.status(403).json({
                    error: true,
                    showMessage: false,
                    message: "jwt expired",
                });
            }
            else if ((error === null || error === void 0 ? void 0 : error.message) === "jwt malformed") {
                return res.status(403).json({
                    error: true,
                    showMessage: false,
                    message: "Json Web Token error/improper jwt structure",
                });
            }
            else {
                return res.status(500).json({
                    error: true,
                    showMessage: false,
                    message: "server internal error",
                });
            }
        }
    });
}
//# sourceMappingURL=authenticateToken.js.map