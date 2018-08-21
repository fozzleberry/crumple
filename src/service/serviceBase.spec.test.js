"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serviceBase_1 = require("./serviceBase");
const repositoryBase_1 = require("../repository/repositoryBase");
const testModel_1 = require("../test/testModel");
const fakeOptions_1 = require("../test/fakeOptions");
describe('ServiceBase', () => {
    it("should call the repository to create a doc", () => {
        const repo = new repositoryBase_1.RepositoryBase(testModel_1.testModel);
        const sb = new serviceBase_1.ServiceBase(repo);
        const fakeMethod = (repo.create = jest.fn());
        sb.create(fakeOptions_1.fakeDoc);
        expect(fakeMethod).toHaveBeenCalledTimes(1);
        expect(fakeMethod).toHaveBeenCalledWith(fakeOptions_1.fakeDoc, undefined);
    });
    it('should call the repository to get all docs', () => {
        const repo = new repositoryBase_1.RepositoryBase(testModel_1.testModel);
        const sb = new serviceBase_1.ServiceBase(repo);
        const fakeMethod = (repo.getAll = jest.fn());
        sb.getAll();
        expect(fakeMethod).toHaveBeenCalledTimes(1);
    });
    it('should call the repository to get a doc by id', () => {
        const repo = new repositoryBase_1.RepositoryBase(testModel_1.testModel);
        const sb = new serviceBase_1.ServiceBase(repo);
        const fakeMethod = (repo.getById = jest.fn());
        sb.getById(fakeOptions_1.fakeId);
        expect(fakeMethod).toHaveBeenCalledTimes(1);
        expect(fakeMethod).toHaveBeenCalledWith(fakeOptions_1.fakeId, undefined);
    });
    it('should call the repository to update a doc by id', () => {
        const repo = new repositoryBase_1.RepositoryBase(testModel_1.testModel);
        const sb = new serviceBase_1.ServiceBase(repo);
        const fakeMethod = (repo.updateById = jest.fn());
        sb.updateById(fakeOptions_1.fakeId, fakeOptions_1.fakeUpdateValue);
        expect(fakeMethod).toHaveBeenCalledTimes(1);
        expect(fakeMethod).toHaveBeenCalledWith(fakeOptions_1.fakeId, fakeOptions_1.fakeUpdateValue, undefined);
    });
    it('should call the repository to delete a doc by id', () => {
        const repo = new repositoryBase_1.RepositoryBase(testModel_1.testModel);
        const sb = new serviceBase_1.ServiceBase(repo);
        const fakeMethod = (repo.deleteById = jest.fn());
        sb.deleteById(fakeOptions_1.fakeId);
        expect(fakeMethod).toHaveBeenCalledTimes(1);
        expect(fakeMethod).toHaveBeenCalledWith(fakeOptions_1.fakeId, undefined);
    });
});
