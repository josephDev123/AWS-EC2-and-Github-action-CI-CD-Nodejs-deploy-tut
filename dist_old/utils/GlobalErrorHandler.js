"use strict";
// import { extend } from "joi";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorHandler = void 0;
class GlobalErrorHandler extends Error {
    constructor(name, msg, statusCode, operational, type) {
        super(name);
        this.message = msg;
        this.name = name;
        this.statusCode = statusCode;
        this.operational = operational;
        this.type = type;
    }
}
exports.GlobalErrorHandler = GlobalErrorHandler;
//# sourceMappingURL=GlobalErrorHandler.js.map