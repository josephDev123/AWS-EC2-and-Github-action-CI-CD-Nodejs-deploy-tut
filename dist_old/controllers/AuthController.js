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
exports.MiddlewareTesting = exports.refresh_token = exports.ConfirmOtp = exports.loginController = exports.register = void 0;
const comparePassword_1 = require("../utils/comparePassword");
const Users_1 = require("../models/Users");
const authDataValidation_1 = require("../utils/authDataValidation");
const isRegisteredEmail_1 = require("../utils/isRegisteredEmail");
const isNameRegistered_1 = require("../utils/isNameRegistered");
const createToken_1 = require("../utils/createToken");
const mongoose_1 = __importDefault(require("mongoose"));
const sendMail_1 = require("../utils/sendMail");
const generateRandomPin_1 = require("../utils/generateRandomPin");
const GlobalErrorHandler_1 = require("../utils/GlobalErrorHandler");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password } = req.body;
        // const hashedPassword = await hashPassword(password);
        const isPasswordAlreadyUsed = yield (0, comparePassword_1.isPasswordAlreadyTaken)(password);
        const isEmailUsed = yield (0, comparePassword_1.isEmailAlreadyUsed)(email);
        const validationResult = yield (0, authDataValidation_1.registercredentialValidation)(name, email, password);
        if (validationResult.error) {
            const error = new GlobalErrorHandler_1.GlobalErrorHandler("ValidateError", validationResult.error.message, 400, true, "error");
            next(error);
            return;
        }
        if (isPasswordAlreadyUsed === false && isEmailUsed === false) {
            const newUser = new Users_1.UserModel({
                name: name,
                email: email,
                password: password,
                profile_id: new mongoose_1.default.Types.ObjectId(),
            });
            const user = yield newUser.save();
            // note: user and profile should not be save in the cookie  when it has not be confirm
            // const userAndProfile = await UserModel.findOne({ email });
            // const userAndProfileJSON = JSON.stringify(userAndProfile);
            // res.cookie("user", userAndProfileJSON, {});
            return res.status(201).json({
                error: false,
                showMessage: true,
                message: "New user created",
                // data: userAndProfile,
            });
        }
        else {
            const error = new GlobalErrorHandler_1.GlobalErrorHandler("AuthError", "Already registered", 400, true, "error");
            return next(error);
        }
    }
    catch (errorObject) {
        // console.log(error);
        const error = new GlobalErrorHandler_1.GlobalErrorHandler(errorObject.name, "Something went wrong", 500, false, "error");
        return next(error);
    }
});
exports.register = register;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const validationResult = yield (0, authDataValidation_1.registercredentialValidation)(name, email, "Password@123");
        if (validationResult.error) {
            // Handle validation error
            console.log("validation error");
            // return res.json({
            //   error: true,
            //   showMessage: true,
            //   message: validationResult.error.message,
            // });
            const error = new GlobalErrorHandler_1.GlobalErrorHandler("ValidateError", validationResult.error.message, 400, true, "error");
            next(error);
            return;
        }
        const new_Email = yield (0, isRegisteredEmail_1.isRegisteredEmail)(email);
        if (new_Email === false) {
            const error = new GlobalErrorHandler_1.GlobalErrorHandler("AuthError", "The email is not yet registered", 500, true, "error");
            return next(error);
        }
        const checkNameAlreadyRegistered = yield (0, isNameRegistered_1.isNameAlreadyReqistered)(name);
        if (checkNameAlreadyRegistered === false) {
            const error = new GlobalErrorHandler_1.GlobalErrorHandler("AuthError", "The name is not yet registered", 500, true, "error");
            return next(error);
        }
        const token = yield (0, createToken_1.createToken)(email);
        // console.log(token);
        // const user_id = await UserModel.findOne({ email }, "_id");
        // const userProfile = await UserProfile.findOne({
        //   user_id: user_id?._id,
        // }).populate("user_id");
        // send otp to mail for 2FA
        const otp = (0, generateRandomPin_1.generateRandomPIN)();
        const payload = { email: email, otp: otp };
        const MAILTRAPstoredOtp = yield Users_1.UserModel.updateOne(
        // { _id: user._id },
        { email }, { otp: otp });
        if (MAILTRAPstoredOtp) {
            // Email sent successfully
            yield (0, sendMail_1.sendMail)(payload);
            console.log("Email sent successfully!");
        }
        else {
            const error = new GlobalErrorHandler_1.GlobalErrorHandler("EmailOptError", "Otp Email fail to send", 500, true, "error");
            return next(error);
        }
        const user = yield Users_1.UserModel.findOne({ email: email });
        // check whether the user is real by checking for OTP status
        // if (user?.confirm_otp == false) {
        //   return res.json({
        //     error: true,
        //     showMessage: true,
        //     message: "Otp unconfirmed",
        //   });
        // }
        res.cookie("token", token, {
            maxAge: 300000,
            secure: true,
            httpOnly: false,
        });
        res.cookie("user", JSON.stringify(user));
        return res.json({
            success: true,
            showMessage: false,
            message: "login successful",
        });
    }
    catch (error) {
        const errorObj = error;
        const errorHandler = new GlobalErrorHandler_1.GlobalErrorHandler("Unknown", errorObj.message, 500, false, "error");
        return next(error);
    }
});
exports.loginController = loginController;
const ConfirmOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp, email } = req.body;
        const formatOtp = otp.split(",").join("");
        // console.log(formatOtp);
        const confirmOtp = yield Users_1.UserModel.findOne({
            email: email,
            otp: formatOtp,
        });
        // console.log(confirmOtp);
        if (!confirmOtp) {
            const error = new GlobalErrorHandler_1.GlobalErrorHandler("OtpError", "User/Otp not found", 500, true, "error");
            next(error);
            return;
        }
        else {
            const updatedUser = yield Users_1.UserModel.findOneAndUpdate({ email: email }, { confirm_otp: true }, { new: true } // This option returns the updated document
            );
            res.cookie("user", JSON.stringify(updatedUser));
            return (res
                .status(200)
                // .json({ error: false, showMessage: true, message: "Otp confirm" });
                .json({
                error: false,
                showMessage: true,
                message: "New user created",
            }));
        }
    }
    catch (error) {
        const errorFormat = error;
        const errorObj = new GlobalErrorHandler_1.GlobalErrorHandler(errorFormat.name, "Something went wrong", 500, false, "error");
        return next(errorObj);
    }
});
exports.ConfirmOtp = ConfirmOtp;
const refresh_token = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    try {
        //  1. check whether the user exist
        const userExists = yield Users_1.UserModel.findOne({ email });
        if (userExists) {
            // The user with the specified email exists
            // You can add your logic here
            const token = yield (0, createToken_1.createToken)(email);
            // console.log(token);
            res.cookie("token", token, {
                maxAge: 300000,
                secure: true,
                httpOnly: false,
            });
            return res.status(200).json({
                error: false,
                showMessage: true,
                message: "token created successful",
                data: token,
            });
        }
        else {
            // The user with the specified email does not exist
            // You can add your logic here
            return res.status(400).json({
                error: true,
                showMessage: false,
                message: "User doesn't exist",
                data: "",
            });
        }
    }
    catch (error) {
        // Handle any errors, such as a database connection issue
        console.error(`Error checking if the user exists: ${error}`);
        return res.status(200).json({
            error: true,
            showMessage: false,
            message: error.message,
        });
    }
});
exports.refresh_token = refresh_token;
const MiddlewareTesting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json({
            error: false,
            showMessage: true,
            message: "hello world from the middleware testing",
        });
    }
    catch (error) {
        return res.json({
            error: true,
            showMessage: true,
            message: error.message,
        });
    }
});
exports.MiddlewareTesting = MiddlewareTesting;
//# sourceMappingURL=AuthController.js.map