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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var faker_1 = require("@faker-js/faker");
var roles = ["admin", "member"];
var statuses = ["online", "offline"];
function generateFakeUser() {
    var name = faker_1.faker.person.fullName();
    return {
        uid: faker_1.faker.string.uuid(),
        name: name,
        avatar: faker_1.faker.image.avatar(),
        status: faker_1.faker.helpers.arrayElement(statuses),
        role: faker_1.faker.helpers.arrayElement(roles),
        lastActiveAt: faker_1.faker.date.recent({ days: 10 }).getTime(),
        createdAt: faker_1.faker.date.past({ years: 1 }).getTime(),
        meta: {
            email: faker_1.faker.internet.email({
                firstName: name.split(" ")[0],
                lastName: name.split(" ")[1] || "",
            }),
        },
    };
}
var users = Array.from({ length: 10 }, generateFakeUser);
var url = "https://276612fa406fbcb2.api-us.cometchat.io/v3/users";
var apiKey = "4d8f2d73610960bed258ef53abae650d624a7a26";
function uploadUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, users_1, user, payload, response, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0, users_1 = users;
                    _b.label = 1;
                case 1:
                    if (!(_i < users_1.length)) return [3 /*break*/, 6];
                    user = users_1[_i];
                    payload = {
                        uid: user.uid,
                        name: user.name,
                        avatar: user.avatar,
                        metadata: {
                            "@private": {
                                email: ((_a = user.meta) === null || _a === void 0 ? void 0 : _a.email) || "",
                                contactNumber: faker_1.faker.phone.number(),
                            },
                        },
                    };
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, axios_1.default.post(url, payload, {
                            headers: {
                                accept: "application/json",
                                "content-type": "application/json",
                                apikey: apiKey,
                            },
                        })];
                case 3:
                    response = _b.sent();
                    console.log("User ".concat(user.uid, " created:"), response.data);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
uploadUsers();
