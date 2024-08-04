"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Define the validation schema for the username
const usernameSchema = joi_1.default.string().alphanum().min(3).max(30).required();
// Function to validate a username
function validateUsername(username) {
    var _a;
    const { error, value } = usernameSchema.validate(username);
    return error ? (_a = error.details[0]) === null || _a === void 0 ? void 0 : _a.message : null;
}
//# sourceMappingURL=validateUsername.js.map