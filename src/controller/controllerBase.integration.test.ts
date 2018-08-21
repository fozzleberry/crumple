import {startUpDb, emptyDb, addTestDoc, closeDb} from "../test/integrationTestHelpers";
import { testModel } from "../test/testModel";
import { ControllerBase } from "./controllerBase";
import * as fakeHelpers from "../test/fakeOptions";
import { RepositoryBase } from "../repository/repositoryBase";
import { ServiceBase } from "../service/serviceBase";
import { ResponseFactory } from "../responseFactory/responseFactory";
import { ObjectID } from "mongodb";

describe("controllerBase", () => {
  let service: ServiceBase;
  let cb: ControllerBase;
  let rf: ResponseFactory;

  beforeAll(async (done) => {
    service = new ServiceBase(new RepositoryBase(testModel));
    rf = new ResponseFactory();
      return await startUpDb();
  });

  beforeEach(async (done) => {
    cb = new ControllerBase(service);
      return await emptyDb();
  });

  afterEach(async (done) => {
    fakeHelpers.fakeRes.json.mockReset();
  });

  afterAll(async (done) => {
    return await closeDb();
  });

  describe("create", () => {
    it("should add a valid document to the db and create a success response", async (done) => {
      const testDoc = fakeHelpers.fakeDoc;
      await cb.create(fakeHelpers.fakeRes, testDoc);

      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledTimes(1);
      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: "success",
          data: expect.objectContaining(testDoc),
          statusCode: 201
        })
      );
      done();
    });

    it("should fail validation and create a fail response", async (done) => {
      const testDoc = fakeHelpers.fakeInvalidDoc;
      await cb.create(fakeHelpers.fakeRes, testDoc);

      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledTimes(1);
      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: "fail",
          data: expect.any(Object),
          statusCode: 422
        })
      );
      done();
    });

    // it.skip("should encounter an error and create an error response", async () => {
    //   const testDoc = fakeHelpers.fakeErrorDoc;
    //   await cb.create(fakeHelpers.fakeRes, testDoc);
    //   await cb.create(fakeHelpers.fakeRes, testDoc);
    //
    //   expect(fakeHelpers.fakeRes.json).toHaveBeenCalledTimes(2);
    //   expect(fakeHelpers.fakeRes.json).toHaveBeenLastCalledWith({
    //     status: "success",
    //     data: expect.objectContaining(testDoc),
    //     statusCode: 201
    //   });
    //   expect(fakeHelpers.fakeRes.json.mock.calls[1][0]).toEqual({
    //     status: "error",
    //     data: expect.objectContaining({ errors: expect.any(Object) }),
    //     statusCode: 500
    //   });
    // });
  });

  describe("getAll", () => {
    it("should get all documents from the db and create a success response", async (done) => {
      const testDocs = [
        await addTestDoc(testModel),
        await addTestDoc(testModel),
        await addTestDoc(testModel)
      ];
      const testAssertion = [
        expect.objectContaining(testDocs[0]._doc),
        expect.objectContaining(testDocs[1]._doc),
        expect.objectContaining(testDocs[2]._doc)
      ];

      await cb.getAll(fakeHelpers.fakeRes);
      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledTimes(1);
      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: "success",
          data: expect.arrayContaining(testAssertion),
          statusCode: 200
        })
      );
      done();
    });

    it("should create a success response with an empty array when no docs are found", async (done) => {
      await cb.getAll(fakeHelpers.fakeRes);
      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledTimes(1);
      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: "success",
          data: [],
          statusCode: 200
        })
      );
      done();
    });
  });

  describe("getById", () => {
    it("should retrieve a document by id and create a response ", async (done) => {
      const testDoc = await addTestDoc(testModel);

      await cb.getById(fakeHelpers.fakeRes, testDoc._id);
      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledTimes(1);
      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: "success",
          data: expect.objectContaining(testDoc._doc),
          statusCode: 200
        })
      );
      done();
    });

    it("should create a not found response when no docs match the Id", async (done) => {
      await cb.getById(fakeHelpers.fakeRes, new ObjectID());
      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledTimes(1);
      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: "error",
          statusCode: 404,
          message: expect.any(String)
        })
      );
      done();
    });
  });

  describe("updateById", () => {
    it("should update a document by its id an create a new response with the updated data", async (done) => {
      const testDoc = await addTestDoc(testModel);
      const update = fakeHelpers.fakeUpdateValue;

      await cb.updateById(fakeHelpers.fakeRes, testDoc._id, update);

      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledTimes(1);
      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: "success",
          data: expect.objectContaining(update),
          statusCode: 200
        })
      );

      const updatedDoc = await testModel.findById(testDoc._id);

      expect(updatedDoc).toHaveProperty("firstName", update.firstName);
      expect(updatedDoc).toHaveProperty("lastName", testDoc._doc.lastName);
      done();
    });

    it("should create a not found response when no docs match the Id", async (done) => {
      const update = fakeHelpers.fakeUpdateValue;

      await cb.updateById(fakeHelpers.fakeRes, new ObjectID(), update);
      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledTimes(1);
      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: "error",
          statusCode: 404,
          message: expect.any(String)
        })
      );
      done();
    });
  });

  describe("deleteById", () => {
    it("should delete a document by id and create a success response", async (done) => {
      const testDocs = [
        await addTestDoc(testModel),
        await addTestDoc(testModel)
      ];

      await cb.deleteById(fakeHelpers.fakeRes, testDocs[0]._id);

      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledTimes(1);
      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: "success",
          data: expect.objectContaining(testDocs[0]._doc),
          statusCode: 200
        })
      );

      const allDocs = await testModel.find();

      expect(allDocs).toHaveLength(1);
      expect(allDocs[0]._id).toEqual(testDocs[1]._id);
      done();
    });

    it("should create a not found response when no docs match the Id", async (done) => {
      await cb.deleteById(fakeHelpers.fakeRes, new ObjectID());
      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledTimes(1);
      expect(fakeHelpers.fakeRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: "error",
          statusCode: 404,
          message: expect.any(String)
        })
      );
      done();
    });
  });
});
