"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseFactory_1 = require("./responseFactory");
const fakeData = {
    testProp: "testy"
};
const fakeRes = {
    Send: jest.fn()
};
const getFakeResponse = (status, data, statusCode) => {
    const response = {
        status,
        data,
        statusCode
    };
    return response;
};
describe("responseFactory", () => {
    beforeEach(() => {
        fakeRes.Send.mockReset();
    });
    describe("createResponse", () => {
        it("should return a formatted response", () => {
            const status = "success";
            const data = { name: "name" };
            const statusCode = 200;
            expect(responseFactory_1.ResponseFactory.createResponse(status, data, statusCode)).toEqual({
                status,
                data,
                statusCode
            });
        });
    });
    describe("success", () => {
        it("should create the response body", () => {
            const spy = jest.spyOn(responseFactory_1.ResponseFactory, "success");
            const fakeStatusCode = 201;
            responseFactory_1.ResponseFactory.success(fakeData, fakeRes, fakeStatusCode);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(fakeData, fakeRes, fakeStatusCode);
            spy.mockRestore();
        });
        it("should send the response", () => {
            const fakeStatusCode = 201;
            const fakeResponse = getFakeResponse("success", fakeData, fakeStatusCode);
            const spy = jest
                .spyOn(responseFactory_1.ResponseFactory, "createResponse")
                .mockImplementationOnce(() => fakeResponse);
            responseFactory_1.ResponseFactory.success(fakeData, fakeRes, fakeStatusCode);
            expect(fakeRes.Send).toHaveBeenCalledTimes(1);
            expect(fakeRes.Send).toHaveBeenCalledWith(fakeResponse);
            // @ts-ignore
            spy.mockRestore();
        });
    });
    describe("error", () => {
        it("should create the response body", () => {
            const spy = jest.spyOn(responseFactory_1.ResponseFactory, "error");
            const fakeStatusCode = 408;
            responseFactory_1.ResponseFactory.error(fakeData, fakeRes, fakeStatusCode);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(fakeData, fakeRes, fakeStatusCode);
            spy.mockRestore();
        });
        it("should send the response", () => {
            const fakeStatusCode = 408;
            const fakeResponse = getFakeResponse("error", fakeData, fakeStatusCode);
            const spy = jest
                .spyOn(responseFactory_1.ResponseFactory, "createResponse")
                .mockImplementationOnce(() => fakeResponse);
            responseFactory_1.ResponseFactory.error(fakeData, fakeRes, fakeStatusCode);
            expect(fakeRes.Send).toHaveBeenCalledTimes(1);
            expect(fakeRes.Send).toHaveBeenCalledWith(fakeResponse);
            // @ts-ignore
            spy.mockRestore();
        });
    });
    describe("fail", () => {
        it("should create the response body", () => {
            const spy = jest.spyOn(responseFactory_1.ResponseFactory, "fail");
            const fakeStatusCode = 408;
            responseFactory_1.ResponseFactory.fail(fakeData, fakeRes, fakeStatusCode);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(fakeData, fakeRes, fakeStatusCode);
            spy.mockRestore();
        });
        it("should send the response", () => {
            const fakeStatusCode = 408;
            const fakeResponse = getFakeResponse("fail", fakeData, fakeStatusCode);
            const spy = jest
                .spyOn(responseFactory_1.ResponseFactory, "createResponse")
                .mockImplementationOnce(() => fakeResponse);
            responseFactory_1.ResponseFactory.fail(fakeData, fakeRes, fakeStatusCode);
            expect(fakeRes.Send).toHaveBeenCalledTimes(1);
            expect(fakeRes.Send).toHaveBeenCalledWith(fakeResponse);
            // @ts-ignore
            spy.mockRestore();
        });
    });
    describe("responseByStatusCode", () => {
        it("should return null if no type is passed", () => {
            // @ts-ignore
            expect(responseFactory_1.ResponseFactory.responseByStatusCode()).toBe(null);
        });
        it("should call success given a status code of 200", () => {
            const spy = jest.spyOn(responseFactory_1.ResponseFactory, "success");
            responseFactory_1.ResponseFactory.responseByStatusCode(fakeData, fakeRes, 200);
            expect(spy).toHaveBeenCalledTimes(1);
            spy.mockRestore();
        });
        it("should call error given a status code of 400", () => {
            const spy = jest.spyOn(responseFactory_1.ResponseFactory, "error");
            responseFactory_1.ResponseFactory.responseByStatusCode(fakeData, fakeRes, 400);
            expect(spy).toHaveBeenCalledTimes(1);
            spy.mockRestore();
        });
    });
});
// write integration tests to test that everything works together ( no mocking except for res.Send )
