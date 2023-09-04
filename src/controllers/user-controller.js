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
const services_1 = require("../services/services");
class UserController {
    getUser(requet, respone) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                email: 'email',
                name: 'name',
                password: 'password',
                phone: 'phone',
            };
            services_1.UserService
                .findUser(user)
                .then((foundUser) => respone.send(foundUser));
        });
    }
}
exports.default = new UserController();
