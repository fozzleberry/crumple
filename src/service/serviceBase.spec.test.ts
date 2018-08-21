import { ServiceBase } from "./serviceBase";
import { RepositoryBase } from "../repository/repositoryBase";
import { testModel, ITestModel } from "../test/testModel";
import { fakeDoc, fakeId, fakeUpdateValue } from "../test/fakeOptions";

describe("ServiceBase", () => {
  it("should call the repository to create a doc", () => {
    const repo = new RepositoryBase<ITestModel>(testModel);
    const sb = new ServiceBase(repo);
    const fakeMethod = (repo.create = jest.fn());

    sb.create(fakeDoc);

    expect(fakeMethod).toHaveBeenCalledTimes(1);
    expect(fakeMethod).toHaveBeenCalledWith(fakeDoc, undefined);
  });

  it("should call the repository to get all docs", () => {
    const repo = new RepositoryBase<ITestModel>(testModel);
    const sb = new ServiceBase(repo);
    const fakeMethod = (repo.getAll = jest.fn());

    sb.getAll();

    expect(fakeMethod).toHaveBeenCalledTimes(1);
  });

  it("should call the repository to get a doc by id", () => {
    const repo = new RepositoryBase<ITestModel>(testModel);
    const sb = new ServiceBase(repo);
    const fakeMethod = (repo.getById = jest.fn());

    sb.getById(fakeId);

    expect(fakeMethod).toHaveBeenCalledTimes(1);
    expect(fakeMethod).toHaveBeenCalledWith(fakeId, undefined, undefined);
  });

  it("should call the repository to update a doc by id", () => {
    const repo = new RepositoryBase<ITestModel>(testModel);
    const sb = new ServiceBase(repo);
    const fakeMethod = (repo.updateById = jest.fn());

    sb.updateById(fakeId, fakeUpdateValue);

    expect(fakeMethod).toHaveBeenCalledTimes(1);
    expect(fakeMethod).toHaveBeenCalledWith(fakeId, fakeUpdateValue, undefined);
  });

  it("should call the repository to delete a doc by id", () => {
    const repo = new RepositoryBase<ITestModel>(testModel);
    const sb = new ServiceBase(repo);
    const fakeMethod = (repo.deleteById = jest.fn());

    sb.deleteById(fakeId);

    expect(fakeMethod).toHaveBeenCalledTimes(1);
    expect(fakeMethod).toHaveBeenCalledWith(fakeId, undefined);
  });
});
