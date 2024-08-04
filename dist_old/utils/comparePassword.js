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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmailAlreadyUsed = exports.isPasswordAlreadyTaken = void 0;
const Users_1 = require("../models/Users");
const hashPassword_1 = require("./hashPassword");
const GlobalErrorHandler_1 = require("./GlobalErrorHandler");
const isPasswordAlreadyTaken = (newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashNewPassword = yield (0, hashPassword_1.hashPassword)(newPassword);
        const isPasswordRegistered = yield Users_1.UserModel.findOne({
            password: hashNewPassword,
        });
        // const isPasswordRegistered = await bcrypt.compare(hashNewPassword, user.password);
        if (isPasswordRegistered)
            throw new Error();
        return false;
    }
    catch (error) {
        throw error;
    }
});
exports.isPasswordAlreadyTaken = isPasswordAlreadyTaken;
const isEmailAlreadyUsed = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isemail = yield Users_1.UserModel.findOne({ email: email });
        if (isemail) {
            // throw new Error("Email already taken");
            throw new GlobalErrorHandler_1.GlobalErrorHandler("AuthError", "Email already taken", 400, true, "error");
        }
        return false;
    }
    catch (error) {
        throw error;
    }
});
exports.isEmailAlreadyUsed = isEmailAlreadyUsed;
//# sourceMappingURL=comparePassword.js.map