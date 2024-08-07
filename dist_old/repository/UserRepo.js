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
exports.UserRepository = void 0;
const GlobalErrorHandler_1 = require("../utils/GlobalErrorHandler");
class UserRepository {
    constructor(db) {
        this.db = db;
        this.db = db;
    }
    create(email, name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new this.db({
                    name: name,
                    email: email,
                    password: password,
                    // profile_id: new mongoose.Types.ObjectId(),
                });
                return yield newUser.save();
            }
            catch (errorObject) {
                new GlobalErrorHandler_1.GlobalErrorHandler(errorObject.name, "Something went wrong", 500, false, "error");
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            // Assuming you're using an ORM like Sequelize or Mongoose
            return yield this.db.findOne({ email });
        });
    }
    findByFields(field_values) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.findOne(field_values);
        });
    }
    updateOne(email, fieldToUpdate, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateObject = { [fieldToUpdate]: value };
            return yield this.db.updateOne({ email }, updateObject);
        });
    }
    findOneAndUpdate(condition, fieldToUpdate, option) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.findOneAndUpdate(condition, fieldToUpdate, option // This option returns the updated document
            );
            // console.log(updatedUser)
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.db.find({});
                return response;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepo.js.map