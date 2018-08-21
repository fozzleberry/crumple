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
const repositoryBase_1 = require("./repositoryBase");
const mongoose_1 = require("mongoose");
const faker_1 = __importDefault(require("faker"));
const testModel_1 = require("../test/testModel");
const fakeId = mongoose_1.Types.ObjectId();
const fakeProjection = "name address";
const fakeOptions = { skip: 10 };
const fakeCallback = expect.any(Function);
const fakeUpdateValue = {
    firstName: faker_1.default.name.firstName()
};
const fakeReturnValue = {
    firstName: faker_1.default.name.firstName(),
    lastName: faker_1.default.name.lastName()
};
describe("Repository Base", () => {
    let repoBase;
    beforeEach(() => {
        repoBase = new repositoryBase_1.RepositoryBase(testModel_1.testModel);
    });
    describe("create", () => {
        it("should call the model method with the right args", () => __awaiter(this, void 0, void 0, function* () {
            const mockMethod = (testModel_1.testModel.create = jest
                .fn()
                .mockReturnValue(fakeReturnValue));
            const result = yield repoBase.create(fakeReturnValue, fakeOptions);
            expect(mockMethod).toHaveBeenCalledTimes(1);
            expect(mockMethod).toHaveBeenCalledWith(fakeReturnValue, undefined, fakeOptions);
            expect(result).toBe(fakeReturnValue);
        }));
        it("should return the result from the model method", () => __awaiter(this, void 0, void 0, function* () {
            testModel_1.testModel.create = jest.fn().mockReturnValueOnce(fakeReturnValue);
            const result = yield repoBase.create(fakeReturnValue, fakeOptions);
            expect(result).toBe(fakeReturnValue);
        }));
    });
    describe("getAll", () => {
        it("should call the model method with the right args", () => __awaiter(this, void 0, void 0, function* () {
            const mockMethod = (testModel_1.testModel.find = jest
                .fn()
                .mockReturnValue(fakeReturnValue));
            const result = yield repoBase.getAll(fakeProjection, fakeOptions);
            expect(mockMethod).toHaveBeenCalledTimes(1);
            expect(mockMethod).toHaveBeenCalledWith({}, fakeProjection, fakeOptions);
            expect(result).toBe(fakeReturnValue);
        }));
        it("should return the result from the model method", () => __awaiter(this, void 0, void 0, function* () {
            testModel_1.testModel.find = jest.fn().mockReturnValueOnce(fakeReturnValue);
            const result = yield repoBase.getAll(fakeProjection, fakeOptions);
            expect(result).toBe(fakeReturnValue);
        }));
    });
    describe("getById", () => {
        it("should call the model method with the right args", () => __awaiter(this, void 0, void 0, function* () {
            const mockMethod = (testModel_1.testModel.findById = jest
                .fn()
                .mockReturnValue(fakeReturnValue));
            yield repoBase.getById(fakeId, fakeProjection, fakeOptions);
            expect(mockMethod).toHaveBeenCalledTimes(1);
            expect(mockMethod).toHaveBeenCalledWith(fakeId, fakeProjection, fakeOptions);
        }));
        it("should return the result from the model method", () => __awaiter(this, void 0, void 0, function* () {
            testModel_1.testModel.find = jest.fn().mockReturnValueOnce(fakeReturnValue);
            const result = yield repoBase.getById(fakeId);
            expect(result).toBe(fakeReturnValue);
        }));
    });
    describe("updateById", () => {
        it("should call the model method with the right args", () => __awaiter(this, void 0, void 0, function* () {
            const mockMethod = (testModel_1.testModel.findByIdAndUpdate = jest
                .fn()
                .mockReturnValueOnce(fakeReturnValue));
            yield repoBase.updateById(fakeId, fakeUpdateValue, fakeOptions);
            expect(mockMethod).toHaveBeenCalledTimes(1);
            expect(mockMethod).toHaveBeenCalledWith(fakeId, fakeUpdateValue, fakeOptions);
        }));
        it("should return the result from the model method", () => __awaiter(this, void 0, void 0, function* () {
            testModel_1.testModel.findByIdAndUpdate = jest
                .fn()
                .mockReturnValueOnce(fakeReturnValue);
            const result = yield repoBase.updateById(fakeId, fakeUpdateValue);
            expect(result).toBe(fakeReturnValue);
        }));
    });
    describe("deleteById", () => {
        it("should call the model method with the right args", () => __awaiter(this, void 0, void 0, function* () {
            const mockMethod = (testModel_1.testModel.findByIdAndRemove = jest
                .fn()
                .mockReturnValue(fakeReturnValue));
            yield repoBase.deleteById(fakeId, fakeOptions);
            expect(mockMethod).toHaveBeenCalledTimes(1);
            expect(mockMethod).toHaveBeenCalledWith(fakeId, fakeOptions);
        }));
        it("should return the result from the model method", () => __awaiter(this, void 0, void 0, function* () {
            testModel_1.testModel.findByIdAndRemove = jest.fn().mockReturnValue(fakeReturnValue);
            const result = yield repoBase.deleteById(fakeId);
            expect(result).toBe(fakeReturnValue);
        }));
    });
});
