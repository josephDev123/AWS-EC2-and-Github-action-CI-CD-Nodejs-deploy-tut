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
exports.UserController = void 0;
class UserController {
    constructor(UserService) {
        this.UserService = UserService;
        this.UserService;
    }
    // register users
    Register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseRes = yield this.UserService.create(req, res, next);
            return res.status(201).json(responseRes).end();
        });
    }
    // login users
    Login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseRes = yield this.UserService.loginService(req, res, next);
            return res.status(200).json(responseRes);
        });
    }
    //verify confirm otp
    verifyOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseRes = yield this.UserService.verifyOtpService(req, res, next);
            return res.status(200).json(responseRes);
        });
    }
    //get users
    show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const responseRes = yield this.UserService.ShowUser();
                return res.status(200).json(responseRes);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map