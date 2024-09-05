"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt = __importStar(require("bcrypt"));
const GlobalErrorHandler_1 = require("../utils/GlobalErrorHandler");
// interface UserType extends Document {
//   name: string;
//   email: string;
//   password: string;
//   username: string;
//   profile_id: Types.ObjectId;
//   otp: string;
//   confirm_otp: boolean;
//   staging: number;
//   status: boolean;
// }
//user schema
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        maxlength: 30,
        minlength: 2,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure uniqueness
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    password: {
        type: String,
        // required: true,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
        validate: {
            validator: function (value) {
                // Alphanumeric with a length between 3 and 20 characters
                return /^[a-zA-Z0-9]{3,20}$/.test(value);
            },
            message: (props) => `${props.value} is not a valid username. Must be alphanumeric and between 3 to 20 characters.`,
        },
    },
    profile_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserProfile",
    },
    otp: String,
    confirm_otp: { type: Boolean, default: false },
    staging: { type: Number, default: 0 },
});
//user model
// middlewares
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const saltRounds = 4;
            this.password = yield bcrypt.hash(this.password, saltRounds);
        }
        catch (errorObj) {
            const error = new GlobalErrorHandler_1.GlobalErrorHandler(errorObj.name, "Something went wrong", 500, false, "error");
            return next(error);
        }
    });
});
exports.UserModel = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=Users.js.map