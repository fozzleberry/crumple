"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const integrationTestHelpers_1 = require("../test/integrationTestHelpers");
const testModel_1 = require("../test/testModel");
const repositoryBase_1 = require("./repositoryBase");
const fakeOptions_1 = require("../test/fakeOptions");
describe("repositoryBase", () => {
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        yield integrationTestHelpers_1.startUpDb();
    }));
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield integrationTestHelpers_1.emptyDb();
    }));
    it("should add a new document to the db", () => __awaiter(this, void 0, void 0, function* () {
        const testDoc = fakeOptions_1.fakeDoc;
        const rb = new repositoryBase_1.RepositoryBase(testModel_1.testModel);
        const createdDoc = yield rb.create(testDoc);
        const findByIdResult = yield testModel_1.testModel.findById(createdDoc._id);
        expect(createdDoc).toHaveProperty('_id');
        expect(findByIdResult._id).toEqual(createdDoc._id);
    }));
    it('should get all the documents in the db', () => __awaiter(this, void 0, void 0, function* () {
        const testDocs = [yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel), yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel), yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel)];
        const rb = new repositoryBase_1.RepositoryBase(testModel_1.testModel);
        const allDocs = yield rb.getAll();
        expect(allDocs[2]._id).toEqual(testDocs[2]._id);
    }));
    it('should get a doc by id', () => __awaiter(this, void 0, void 0, function* () {
        const testDoc = yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel);
        const rb = new repositoryBase_1.RepositoryBase(testModel_1.testModel);
        const result = yield rb.getById(testDoc._id);
        expect(result._id).toEqual(testDoc._id);
    }));
    it('should update a doc by id', () => __awaiter(this, void 0, void 0, function* () {
        const testDoc = yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel);
        const update = { firstName: 'keith' };
        const rb = new repositoryBase_1.RepositoryBase(testModel_1.testModel);
        yield rb.updateById(testDoc._id, update);
        const findByIdResult = yield testModel_1.testModel.findById(testDoc._id);
        expect(findByIdResult._id).toEqual(testDoc._id);
        expect(findByIdResult.firstName).toEqual(update.firstName);
    }));
    it('should delete a doc by id', () => __awaiter(this, void 0, void 0, function* () {
        const testDocs = [yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel), yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel)];
        const rb = new repositoryBase_1.RepositoryBase(testModel_1.testModel);
        yield rb.deleteById(testDocs[0]._id);
        const allDocs = yield testModel_1.testModel.find();
        expect(allDocs.length).toBe(1);
        expect(allDocs[0]._id).toEqual(testDocs[1]._id);
    }));
});
