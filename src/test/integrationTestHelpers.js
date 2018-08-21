"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mockgoose_fix_1 = require("mockgoose-fix");
const fakeOptions_1 = require("./fakeOptions");
const mockgoose = new mockgoose_fix_1.Mockgoose(mongoose_1.default);
function startUpDb() {
    mongoose_1.default.connection.close();
    return mockgoose
        .prepareStorage()
        .then(() => __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb://localhost/test");
    }));
}
exports.startUpDb = startUpDb;
function emptyDb() {
    return mockgoose.helper.reset();
}
exports.emptyDb = emptyDb;
function addTestDoc(model) {
    const createdDoc = model.create(fakeOptions_1.fakeDoc);
    return createdDoc;
}
exports.addTestDoc = addTestDoc;
