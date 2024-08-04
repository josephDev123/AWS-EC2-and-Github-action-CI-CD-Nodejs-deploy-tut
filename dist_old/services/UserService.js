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
exports.UserService = void 0;
const authDataValidation_1 = require("../utils/authDataValidation");
const GlobalErrorHandler_1 = require("../utils/GlobalErrorHandler");
const createToken_1 = require("../utils/createToken");
const generateRandomPin_1 = require("../utils/generateRandomPin");
class UserService {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
        this.UserRepository;
    }
    isUserRegistered(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.UserRepository.findByEmail(email);
            return user !== null;
        });
    }
    //Register user service ---------------------------------
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name, password } = req.body;
                const userExists = yield this.isUserRegistered(email);
                if (userExists) {
                    throw new GlobalErrorHandler_1.GlobalErrorHandler("AuthError", "Email already taken", 400, true, "error");
                }
                const validationResult = yield (0, authDataValidation_1.registercredentialValidation)(name, email, password);
                if (validationResult.error) {
                    const error = new GlobalErrorHandler_1.GlobalErrorHandler("ValidateError", validationResult.error.message, 400, true, "error");
                    next(error);
                    return;
                }
                if (userExists === false) {
                    const result = yield this.UserRepository.create(email, name, password);
                    if (result && result.email) {
                        return {
                            error: false,
                            showMessage: true,
                            message: "New user created",
                        };
                    }
                }
            }
            catch (errorObject) {
                console.log(errorObject.name, errorObject.operational, errorObject.message);
                if (errorObject.name == "AuthError" && errorObject.operational) {
                    const error = new GlobalErrorHandler_1.GlobalErrorHandler(errorObject.name, errorObject.message, errorObject.statusCode, errorObject.operational, errorObject.type);
                    return next(error);
                }
                else {
                    const error = new GlobalErrorHandler_1.GlobalErrorHandler(errorObject.name, "Something went wrong", 500, false, "error");
                    return next(error);
                }
            }
        });
    }
    //login user service ---------------------------------
    loginService(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, password } = req.body;
            const userExists = yield this.isUserRegistered(email);
            const validationResult = yield (0, authDataValidation_1.registercredentialValidation)(name, email, password);
            if (validationResult.error) {
                const error = new GlobalErrorHandler_1.GlobalErrorHandler("ValidateError", validationResult.error.message, 400, true, "error");
                next(error);
                return;
            }
            if (!userExists) {
                throw new GlobalErrorHandler_1.GlobalErrorHandler("AuthError", "The email is not yet registered", 400, true, "error");
            }
            const token = yield (0, createToken_1.createToken)(email);
            const otp = (0, generateRandomPin_1.generateRandomPIN)();
            const payload = { email: email, otp: otp };
            const updateUserOtpStatus = yield this.UserRepository.updateOne(email, "otp", otp);
            if (updateUserOtpStatus && !updateUserOtpStatus.acknowledged) {
                const error = new GlobalErrorHandler_1.GlobalErrorHandler("EmailOptError", "Otp Email fail to send", 500, true, "error");
                return next(error);
            }
            // await sendMail(payload);
            const user = yield this.UserRepository.findByEmail(email);
            res.cookie("token", token, {
                maxAge: 300000,
                secure: true,
                httpOnly: false,
            });
            res.cookie("user", JSON.stringify(user));
            return {
                success: true,
                showMessage: false,
                message: "login successful",
            };
        });
    }
    //verify otp service ---------------------------------
    verifyOtpService(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { otp, email } = req.body;
            try {
                const formatOtp = otp.split(",").join("");
                const isOtp = yield this.UserRepository.findByFields({
                    email: email,
                    otp: formatOtp,
                });
                if (!isOtp) {
                    const error = new GlobalErrorHandler_1.GlobalErrorHandler("OtpError", "User/Otp not found", 500, true, "error");
                    return next(error);
                }
                const updatedUser = yield this.UserRepository.findOneAndUpdate({ email: email }, { confirm_otp: true }, { new: true });
                res.cookie("user", JSON.stringify(updatedUser));
                return {
                    error: false,
                    showMessage: true,
                    message: "user verified",
                };
            }
            catch (error) {
                const errorFormat = error;
                const errorObj = new GlobalErrorHandler_1.GlobalErrorHandler(errorFormat.name, "Something went wrong", 500, false, "error");
                return next(errorObj);
            }
        });
    }
    ShowUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.UserRepository.find();
                return response;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map