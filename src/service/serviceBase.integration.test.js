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
const serviceBase_1 = require("./serviceBase");
const testHelpers = __importStar(require("../test/integrationTestHelpers"));
const repositoryBase_1 = require("../repository/repositoryBase");
const testModel_1 = require("../test/testModel");
const fakeOptions_1 = require("../test/fakeOptions");
const integrationTestHelpers_1 = require("../test/integrationTestHelpers");
describe('serviceBase', () => {
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        yield testHelpers.startUpDb();
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        yield testHelpers.emptyDb();
    }));
    it('should add a new document to the db', () => __awaiter(this, void 0, void 0, function* () {
        const testDoc = fakeOptions_1.fakeDoc;
        const repo = new repositoryBase_1.RepositoryBase(testModel_1.testModel);
        const sb = new serviceBase_1.ServiceBase(repo);
        const createdDoc = yield sb.create(testDoc);
        const findByIdResult = yield testModel_1.testModel.findById(createdDoc._id);
        expect(createdDoc).toHaveProperty('_id');
        expect(findByIdResult._id).toEqual(createdDoc._id);
    }));
    it('should get all the documents in the db', () => __awaiter(this, void 0, void 0, function* () {
        const testDocs = [yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel), yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel), yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel)];
        const repo = new repositoryBase_1.RepositoryBase(testModel_1.testModel);
        const sb = new serviceBase_1.ServiceBase(repo);
        const allDocs = yield sb.getAll(undefined);
        expect(allDocs[2]._id).toEqual(testDocs[2]._id);
    }));
    it('should get a doc by id', () => __awaiter(this, void 0, void 0, function* () {
        const testDoc = yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel);
        const repo = new repositoryBase_1.RepositoryBase(testModel_1.testModel);
        const sb = new serviceBase_1.ServiceBase(repo);
        const result = yield sb.getById(testDoc._id);
        expect(result._id).toEqual(testDoc._id);
    }));
    it('should update a doc by id', () => __awaiter(this, void 0, void 0, function* () {
        const testDoc = yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel);
        const update = { firstName: 'keith' };
        const repo = new repositoryBase_1.RepositoryBase(testModel_1.testModel);
        const sb = new serviceBase_1.ServiceBase(repo);
        yield sb.updateById(testDoc._id, update);
        const findByIdResult = yield testModel_1.testModel.findById(testDoc._id);
        expect(findByIdResult._id).toEqual(testDoc._id);
        expect(findByIdResult.firstName).toEqual(update.firstName);
    }));
    it('should delete a doc by id', () => __awaiter(this, void 0, void 0, function* () {
        const testDocs = [yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel), yield integrationTestHelpers_1.addTestDoc(testModel_1.testModel)];
        const repo = new repositoryBase_1.RepositoryBase(testModel_1.testModel);
        const sb = new serviceBase_1.ServiceBase(repo);
        yield sb.deleteById(testDocs[0]._id);
        const allDocs = yield testModel_1.testModel.find();
        expect(allDocs.length).toBe(1);
        expect(allDocs[0]._id).toEqual(testDocs[1]._id);
    }));
});
