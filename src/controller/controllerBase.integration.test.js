"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const integrationTestHelpers_1 = require("../test/integrationTestHelpers");
const testModel_1 = require("../test/testModel");
const controllerBase_1 = require("./controllerBase");
const fakeHelpers = __importStar(require("../test/fakeOptions"));
const repositoryBase_1 = require("../repository/repositoryBase");
const serviceBase_1 = require("../service/serviceBase");
describe("controllerBase", () => {
    let service;
    let cb;
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        yield integrationTestHelpers_1.startUpDb();
        service = new serviceBase_1.ServiceBase(new repositoryBase_1.RepositoryBase(testModel_1.testModel));
    }));
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield integrationTestHelpers_1.emptyDb();
        cb = new controllerBase_1.ControllerBase(service);
    }));
    afterEach(() => {
        fakeHelpers.fakeRes.Send.mockReset();
    });
    it("should add a valid document to the db and create a success response", () => __awaiter(this, void 0, void 0, function* () {
        const testDoc = fakeHelpers.fakeDoc;
        yield cb.create(fakeHelpers.fakeRes, testDoc);
        expect(fakeHelpers.fakeRes.Send).toHaveBeenCalledTimes(1);
        expect(fakeHelpers.fakeRes.Send).toHaveBeenCalledWith({
            status: "success",
            data: expect.objectContaining(testDoc),
            statusCode: 201
        });
    }));
    it("should fail validation and create a fail response", () => __awaiter(this, void 0, void 0, function* () {
        const testDoc = fakeHelpers.fakeInvalidDoc;
        yield cb.create(fakeHelpers.fakeRes, testDoc);
        expect(fakeHelpers.fakeRes.Send).toHaveBeenCalledTimes(1);
        expect(fakeHelpers.fakeRes.Send).toHaveBeenCalledWith({
            status: "fail",
            data: expect.objectContaining({ errors: expect.any(Object) }),
            statusCode: 422
        });
    }));
    // @todo - figure out how the fuck to make it error! in-fact fuck that. just create a single error type
    it.skip("should encounter an error and create an error response", () => __awaiter(this, void 0, void 0, function* () {
        const testDoc = fakeHelpers.fakeErrorDoc;
        yield cb.create(fakeHelpers.fakeRes, testDoc);
        yield cb.create(fakeHelpers.fakeRes, testDoc);
        expect(fakeHelpers.fakeRes.Send).toHaveBeenCalledTimes(2);
        expect(fakeHelpers.fakeRes.Send.mock.calls[0][0]).toEqual({
            // to have been last called with
            status: "success",
            data: expect.objectContaining(testDoc),
            statusCode: 201
        });
        expect(fakeHelpers.fakeRes.Send.mock.calls[1][0]).toEqual({
            status: "error",
            data: expect.objectContaining({ errors: expect.any(Object) }),
            statusCode: 500
        });
    }));
    it("should get all documents from the db and create a success response", () => __awaiter(this, void 0, void 0, function* () {
        const testDocs = [
            yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel),
            yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel),
            yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel)
        ];
        const testAssertion = [
            expect.objectContaining(testDocs[0]._doc),
            expect.objectContaining(testDocs[1]._doc),
            expect.objectContaining(testDocs[2]._doc)
        ];
        yield cb.getAll(fakeHelpers.fakeRes);
        expect(fakeHelpers.fakeRes.Send).toHaveBeenCalledTimes(1);
        expect(fakeHelpers.fakeRes.Send).toHaveBeenCalledWith({
            status: "success",
            data: expect.arrayContaining(testAssertion),
            statusCode: 200
        });
    }));
    it("should create a success response with an empty array when no docs are found", () => __awaiter(this, void 0, void 0, function* () {
        yield cb.getAll(fakeHelpers.fakeRes);
        expect(fakeHelpers.fakeRes.Send).toHaveBeenCalledTimes(1);
        expect(fakeHelpers.fakeRes.Send).toHaveBeenCalledWith({
            status: "success",
            data: [],
            statusCode: 200
        });
    }));
    it("should retrieve a document by id and create a response ", () => __awaiter(this, void 0, void 0, function* () {
        const testDoc = yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel);
        yield cb.getById(fakeHelpers.fakeRes, testDoc._id);
        expect(fakeHelpers.fakeRes.Send).toHaveBeenCalledTimes(1);
        expect(fakeHelpers.fakeRes.Send).toHaveBeenCalledWith({
            status: "success",
            data: expect.objectContaining(testDoc._doc),
            statusCode: 200
        });
    }));
    it("should update a document by its id an create a new response with the updated data", () => __awaiter(this, void 0, void 0, function* () {
        const testDoc = yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel);
        const update = fakeHelpers.fakeUpdateValue;
        yield cb.updateById(fakeHelpers.fakeRes, testDoc._id, update, {
            new: true
        });
        expect(fakeHelpers.fakeRes.Send).toHaveBeenCalledTimes(1);
        expect(fakeHelpers.fakeRes.Send).toHaveBeenCalledWith({
            status: "success",
            data: expect.objectContaining(update),
            statusCode: 200
        });
        const updatedDoc = yield testModel_1.testModel.findById(testDoc._id);
        expect(updatedDoc).toHaveProperty("firstName", update.firstName);
        expect(updatedDoc).toHaveProperty("lastName", testDoc._doc.lastName);
    }));
    it("should delete a document by its id and create a success response", () => __awaiter(this, void 0, void 0, function* () {
        const testDocs = [yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel), yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel)];
        yield cb.deleteById(fakeHelpers.fakeRes, testDocs[0]._id);
        expect(fakeHelpers.fakeRes.Send).toHaveBeenCalledTimes(1);
        expect(fakeHelpers.fakeRes.Send).toHaveBeenCalledWith({
            status: "success",
            data: expect.objectContaining(testDocs[0]._doc),
            statusCode: 200
        });
        const allDocs = yield testModel_1.testModel.find();
        expect(allDocs).toHaveLength(1);
        expect(allDocs[0]._id).toEqual(testDocs[1]._id);
    }));
});
