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
exports.registercredentialValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const registercredentialValidation = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = joi_1.default.object({
            name: joi_1.default.string()
                .min(2)
                .max(30)
                .pattern(/^[a-zA-Z\s]+$/)
                .trim()
                .required(),
            // password: Joi.string()
            //   .min(8)
            //   .max(15)
            //   .pattern(
            //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
            //   )
            //   .message(
            //     "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
            //   )
            //   .required(),
            email: joi_1.default.string()
                .email({ tlds: { allow: false } })
                .required(),
        });
        return schema.validate({ name, email }); //password
    }
    catch (error) {
        // console.log(error + " here");
        throw new Error("Validation error: " + error.message);
    }
});
exports.registercredentialValidation = registercredentialValidation;
//# sourceMappingURL=authDataValidation.js.map