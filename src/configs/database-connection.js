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
const pg_1 = require("pg");
class DatabaseConnection {
    constructor() {
        this.pool = new pg_1.Pool({
            // host: process.env.DB_HOST,
            // user: process.env.DB_USER,
            // database: process.env.DB_NAME,
            // password: process.env.DB_PASSWORD,
            // port: parseInt(process.env.DB_PORT || "5432")
            host: 'ep-soft-shadow-82863304.us-east-2.aws.neon.tech',
            user: 'gabrielatomaz',
            database: 'AffectOn',
            password: 'mTli3sWyw4zf',
            port: parseInt('5432'),
            ssl: true,
        });
    }
    connectToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.connect();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    ;
}
exports.default = new DatabaseConnection();
