import { IRepositoryBase, RepositoryBase } from "./repositoryBase";
import { Types } from "mongoose";
import faker from "faker";

import { testModel, ITestModel } from "../test/testModel";

const fakeId = Types.ObjectId();
const fakeProjection = "name address";
const fakeOptions = { skip: 10 };
const fakeUpdateValue = {
  firstName: faker.name.firstName()
};

const fakeReturnValue = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
};

describe("Repository Base", () => {
  let repoBase: RepositoryBase<ITestModel>;

  beforeEach(() => {
    repoBase = new RepositoryBase(testModel);
  });

  describe("create", () => {
    it("should call the model method with the right args", async () => {
      const mockMethod = (testModel.create = jest
        .fn()
        .mockReturnValue(fakeReturnValue));

      const result = await repoBase.create(fakeReturnValue, fakeOptions);
      expect(mockMethod).toHaveBeenCalledTimes(1);

      expect(mockMethod).toHaveBeenCalledWith(fakeReturnValue, fakeOptions);
      expect(result).toBe(fakeReturnValue);
    });

    it("should return the result from the model method", async () => {
      testModel.create = jest.fn().mockReturnValueOnce(fakeReturnValue);

      const result = await repoBase.create(fakeReturnValue, fakeOptions);

      expect(result).toBe(fakeReturnValue);
    });
  });
  describe("getAll", () => {
    it("should call the model method with the right args", async () => {
      const mockMethod = (testModel.find = jest
        .fn()
        .mockReturnValue(fakeReturnValue));

      const result = await repoBase.getAll(fakeProjection, fakeOptions);

      expect(mockMethod).toHaveBeenCalledTimes(1);
      expect(mockMethod).toHaveBeenCalledWith({}, fakeProjection, fakeOptions);
      expect(result).toBe(fakeReturnValue);
    });

    it("should return the result from the model method", async () => {
      testModel.find = jest.fn().mockReturnValueOnce(fakeReturnValue);

      const result = await repoBase.getAll(fakeProjection, fakeOptions);

      expect(result).toBe(fakeReturnValue);
    });
  });

  describe("getById", () => {
    it("should call the model method with the right args", async () => {
      const mockMethod = (testModel.findById = jest
        .fn()
        .mockReturnValue(fakeReturnValue));

      await repoBase.getById(fakeId, fakeProjection, fakeOptions);
      expect(mockMethod).toHaveBeenCalledTimes(1);
      expect(mockMethod).toHaveBeenCalledWith(
        fakeId,
        fakeProjection,
        fakeOptions
      );
    });

    it("should return the result from the model method", async () => {
      testModel.find = jest.fn().mockReturnValueOnce(fakeReturnValue);

      const result = await repoBase.getById(fakeId);

      expect(result).toBe(fakeReturnValue);
    });
  });

  describe("updateById", () => {
    it("should call the model method with the right args", async () => {
      const mockMethod = (testModel.findByIdAndUpdate = jest
        .fn()
        .mockReturnValueOnce(fakeReturnValue));
      await repoBase.updateById(fakeId, fakeUpdateValue, fakeOptions);

      expect(mockMethod).toHaveBeenCalledTimes(1);
      expect(mockMethod).toHaveBeenCalledWith(
        fakeId,
        fakeUpdateValue,
        fakeOptions
      );
    });

    it("should return the result from the model method", async () => {
      testModel.findByIdAndUpdate = jest
        .fn()
        .mockReturnValueOnce(fakeReturnValue);

      const result = await repoBase.updateById(fakeId, fakeUpdateValue);

      expect(result).toBe(fakeReturnValue);
    });
  });

  describe("deleteById", () => {
    it("should call the model method with the right args", async () => {
      const mockMethod = (testModel.findByIdAndRemove = jest
        .fn()
        .mockReturnValue(fakeReturnValue));
      await repoBase.deleteById(fakeId, fakeOptions);

      expect(mockMethod).toHaveBeenCalledTimes(1);
      expect(mockMethod).toHaveBeenCalledWith(fakeId, fakeOptions);
    });

    it("should return the result from the model method", async () => {
      testModel.findByIdAndRemove = jest.fn().mockReturnValue(fakeReturnValue);
      const result = await repoBase.deleteById(fakeId);

      expect(result).toBe(fakeReturnValue);
    });
  });
});
