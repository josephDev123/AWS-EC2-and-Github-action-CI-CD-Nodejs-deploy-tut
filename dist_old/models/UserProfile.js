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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userProfileSchema = new mongoose_1.Schema({
    // user_id: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User", // Reference to the User model
    //   required: true,
    //   unique: true,
    // },
    fullName: {
        type: String,
        // required: true,
    },
    // email: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true,
    //   lowercase: true,
    // },
    phoneNumber: {
        type: String,
        // required: true,
    },
    Bio: {
        type: String,
        maxlength: 50,
    },
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
    },
    dateOfBirth: {
        type: Date,
        // required: true,
    },
    photo: String,
    identification: String,
    // accountBalance: {
    //   type: Number,
    //   default: 0,
    // },
    // transactions: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Transaction", // Reference to the Transaction model
    //   },
    // ],
    // linkedBankAccounts: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "BankAccount", // Reference to the BankAccount model
    //   },
    // ],
    // Add more fields as needed
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
const UserProfile = mongoose_1.default.model("UserProfile", userProfileSchema);
exports.default = UserProfile;
//# sourceMappingURL=UserProfile.js.map