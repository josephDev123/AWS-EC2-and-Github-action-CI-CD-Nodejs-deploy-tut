"use strict";
// import jwt from "jsonwebtoken";
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
// export default function tokenIsVerify(token: string) {
//   return jwt.verify(token, process.env.SECRET as string, (err, decoded) => {
//     if (err) {
//       throw new Error(err.message);
//     } else {
//       console.log(decoded);
//       return decoded as string;
//     }
//     // });
//   });
// }
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function tokenIsVerify(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    reject(new Error(err.message));
                }
                else {
                    // console.log(decoded.data);
                    resolve(decoded === null || decoded === void 0 ? void 0 : decoded.data);
                }
            });
        });
    });
}
exports.default = tokenIsVerify;
//# sourceMappingURL=VerifyToken.js.map