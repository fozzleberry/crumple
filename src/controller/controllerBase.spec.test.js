"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const controllerBase_1 = require("./controllerBase");
const repositoryBase_1 = require("../repository/repositoryBase");
const testModel_1 = require("../test/testModel");
const fakeOptions = __importStar(require("../test/fakeOptions"));
const fakeOptions_1 = require("../test/fakeOptions");
let service;
let controller;
function optionsFactory(type) {
    const serviceOptions = {
        returnAll: {
            projection: fakeOptions.fakeProjection,
            options: fakeOptions.fakeOptions
        },
        getById: {
            projection: fakeOptions.fakeProjection,
            options: fakeOptions.fakeOptions
        },
        updateById: {
            update: fakeOptions.fakeUpdateValue,
            options: fakeOptions.fakeOptions
        },
        deleteById: {
            options: fakeOptions.fakeOptions
        }
    };
    // @ts-ignore
    return serviceOptions[type];
}
exports.optionsFactory = optionsFactory;
describe("ControllerBase", () => {
    beforeAll(() => {
        service = new repositoryBase_1.RepositoryBase(testModel_1.testModel);
        controller = new controllerBase_1.ControllerBase(service);
    });
    afterEach(() => {
        // @ts-ignore
        service.getAll.mockClear();
    });
    describe("getAll", () => {
        it("should call the service with the default callback", () => {
            const mockMethod = (service.getAll = jest.fn());
            const options = optionsFactory("returnAll");
            controller.getAll({}, {}, options);
            expect(mockMethod).toHaveBeenCalledTimes(1);
            expect(mockMethod).toHaveBeenCalledWith(options.projection, options.options);
        });
        it("should call the service with the passed callback", () => {
            const mockMethod = (service.getAll = jest.fn());
            const options = optionsFactory("returnAll");
            controller.getAll({}, {}, options);
            expect(mockMethod).toHaveBeenCalledTimes(1);
            expect(mockMethod).toHaveBeenCalledWith(options.projection, options.options);
        });
        it("should call the service and pass null as the callback", () => {
            const mockMethod = (service.getAll = jest.fn());
            const options = optionsFactory("returnAll");
            controller.getAll({}, {}, options);
            expect(mockMethod).toHaveBeenCalledTimes(1);
            expect(mockMethod).toHaveBeenCalledWith(options.projection, options.options);
        });
        it("should return the value from the service when null is passed as the callback", () => {
            const mockReturnValue = "returned";
            service.getAll = jest.fn().mockReturnValueOnce(mockReturnValue);
            const options = optionsFactory("returnAll");
            expect(controller.getAll({}, {}, options)).toBe(mockReturnValue);
        });
    });
    describe("getById", () => {
        it("should call the service with the default callback", () => {
            const mockMethod = (service.getById = jest.fn());
            const options = optionsFactory("getById");
            controller.getById({}, {}, fakeOptions.fakeId, options);
            expect(mockMethod).toHaveBeenCalledTimes(1);
            expect(mockMethod).toHaveBeenCalledWith(fakeOptions.fakeId, options.projection, options.options);
        });
        it("should call the service with the passed callback", () => {
            const mockMethod = (service.getById = jest.fn());
            const options = optionsFactory("getById");
            controller.getById({}, {}, fakeOptions.fakeId, options);
            expect(mockMethod).toHaveBeenCalledTimes(1);
            expect(mockMethod).toHaveBeenCalledWith(fakeOptions.fakeId, options.projection, options.options);
        });
        it("should call the service and pass null as the callback", () => {
            const mockMethod = (service.getById = jest.fn());
            const options = optionsFactory("getById");
            controller.getById({}, {}, fakeOptions_1.fakeId, options);
            expect(mockMethod).toHaveBeenCalledTimes(1);
            expect(mockMethod).toHaveBeenCalledWith(fakeOptions.fakeId, options.projection, options.options);
        });
        it("should return the value from the service when null is passed as the callback", () => {
            const mockReturnValue = "returned";
            service.getById = jest.fn().mockReturnValueOnce(mockReturnValue);
            const options = optionsFactory("getById");
            expect(controller.getById({}, {}, fakeOptions_1.fakeId, options)).toBe(mockReturnValue);
        });
    });
    describe("updateById", () => {
        it("should call the service with the default callback", () => {
            const mockMethod = (service.updateById = jest.fn());
            const options = optionsFactory("getById");
            controller.updateById({}, {}, fakeOptions.fakeId, options);
            expect(mockMethod).toHaveBeenCalledTimes(1);
            expect(mockMethod).toHaveBeenCalledWith(fakeOptions.fakeId, options.update, options.options);
        });
        it("should call the service with the passed callback", () => {
            const mockMethod = (service.updateById = jest.fn());
            const options = optionsFactory("updateById");
            controller.updateById({}, {}, fakeOptions.fakeId, options);
            expect(mockMethod).toHaveBeenCalledTimes(1);
            expect(mockMethod).toHaveBeenCalledWith(fakeOptions.fakeId, options.update, options.options);
        });
        it("should call the service and pass null as the callback", () => {
            const mockMethod = (service.updateById = jest.fn());
            const options = optionsFactory("updateById");
            controller.updateById({}, {}, fakeOptions.fakeId, options);
            expect(mockMethod).toHaveBeenCalledTimes(1);
            expect(mockMethod).toHaveBeenCalledWith(fakeOptions.fakeId, options.update, options.options);
        });
        it("should return the value from the service when null is passed as the callback", () => {
            const mockReturnValue = "returned";
            service.updateById = jest.fn().mockReturnValueOnce(mockReturnValue);
            const options = optionsFactory("updateById");
            expect(controller.updateById({}, {}, fakeOptions_1.fakeId, options)).toBe(mockReturnValue);
        });
    });
    describe("deleteById", () => {
        it("should call the service with the default callback", () => {
            const mockMethod = (service.deleteById = jest.fn());
            const options = optionsFactory("deleteById");
            controller.deleteById({}, {}, fakeOptions.fakeId, options);
            expect(mockMethod).toHaveBeenCalledTimes(1);
            expect(mockMethod).toHaveBeenCalledWith(fakeOptions.fakeId, options.options);
        });
        it("should call the service with the passed callback", () => {
            const mockMethod = (service.deleteById = jest.fn());
            const options = optionsFactory("deleteById");
            controller.deleteById({}, {}, fakeOptions.fakeId, options);
            expect(mockMethod).toHaveBeenCalledTimes(1);
            expect(mockMethod).toHaveBeenCalledWith(fakeOptions.fakeId, options.options);
        });
        it("should call the service and pass null as the callback", () => {
            const mockMethod = (service.deleteById = jest.fn());
            const options = optionsFactory("deleteById");
            controller.deleteById({}, {}, fakeOptions.fakeId, options);
            expect(mockMethod).toHaveBeenCalledTimes(1);
            expect(mockMethod).toHaveBeenCalledWith(fakeOptions.fakeId, options.options);
        });
        it("should return the value from the service when null is passed as the callback", () => {
            const mockReturnValue = "returned";
            service.deleteById = jest.fn().mockReturnValueOnce(mockReturnValue);
            const options = optionsFactory("deleteById");
            expect(controller.deleteById({}, {}, fakeOptions_1.fakeId, options)).toBe(mockReturnValue);
        });
    });
});
