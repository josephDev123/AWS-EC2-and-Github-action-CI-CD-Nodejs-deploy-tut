"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerMiddleware = void 0;
const ErrorHandlerMiddleware = (error, req, res, next) => {
    console.log("middleware:" + error);
    if (error.operational) {
        return res.status(error.statusCode).json({
            name: error.name,
            message: error.message,
            operational: error.operational,
            type: error.type,
        });
    }
    return res.status(error.statusCode).json({
        name: error.name,
        message: "Something went wrong",
        operational: error.operational,
        type: error.type,
    });
};
exports.ErrorHandlerMiddleware = ErrorHandlerMiddleware;
//# sourceMappingURL=ErrorHandlerMiddleware.js.map