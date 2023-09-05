"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var controllers_1 = require("../controllers/controllers");
var body_parser_1 = __importDefault(require("body-parser"));
var router_1 = __importDefault(require("./router"));
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
    }
    UserRoutes.prototype.setRoutes = function () {
        var userPath = '/usuario';
        var jsonParser = body_parser_1.default.json();
        router_1.default.post("".concat(userPath, "/login"), jsonParser, controllers_1.UserController.loginRequestHandler);
        router_1.default.get("".concat(userPath, "/todos"), controllers_1.UserController.findAll);
        router_1.default.get("".concat(userPath, "/email"), controllers_1.UserController.findByEmail);
        router_1.default.get(userPath, controllers_1.UserController.findBy);
        return router_1.default;
    };
    return UserRoutes;
}());
exports.default = new UserRoutes().setRoutes();
