"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = __importDefault(require("faker"));
const mongoose_1 = require("mongoose");
exports.fakeId = mongoose_1.Types.ObjectId();
exports.fakeProjection = "name address";
exports.fakeOptions = { skip: 1 };
exports.fakeUpdateValue = {
    firstName: faker_1.default.name.firstName()
};
function getFakeDoc() {
    const fakeDoc = {
        firstName: faker_1.default.name.firstName(),
        lastName: faker_1.default.name.lastName()
    };
    return fakeDoc;
}
exports.getFakeDoc = getFakeDoc;
exports.fakeInvalidDoc = {
    lastName: faker_1.default.name.lastName()
};
exports.fakeDoc = getFakeDoc();
exports.fakeRes = {
    Send: jest.fn()
};
exports.fakeErrorDoc = {
    firstName: faker_1.default.name.firstName(),
    lastName: 'smith'
};
