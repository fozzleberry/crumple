import { ServiceBase } from "./serviceBase";
import * as testHelpers from "../test/integrationTestHelpers";
import { RepositoryBase } from "../repository/repositoryBase";
import { testModel } from "../test/testModel";
import { fakeDoc } from "../test/fakeOptions";

describe("serviceBase", () => {
  beforeAll(async (done) => {
    await testHelpers.startUpDb();
    done();
  });

  afterEach(async (done) => {
    await testHelpers.emptyDb();
    done();
  });

    afterEach(async (done) => {
        await testHelpers.closeDb();
        done();
    });

    afterAll(async (done) => {
        await testHelpers.closeDb();
        done();
    });

  it("should add a new document to the db", async (done) => {
    const testDoc = fakeDoc;
    const repo = new RepositoryBase(testModel);

    const sb = new ServiceBase(repo);

    const createdDoc: any = await sb.create(testDoc);
    const findByIdResult = await testModel.findById(createdDoc._id);

    expect(createdDoc).toHaveProperty("_id");
    expect(findByIdResult._id).toEqual(createdDoc._id);
    done();
  });

  it("should get all the documents in the db", async (done) => {
    const testDocs = [
      await testHelpers.addTestDoc(testModel),
      await testHelpers.addTestDoc(testModel),
      await testHelpers.addTestDoc(testModel)
    ];
    const repo = new RepositoryBase(testModel);

    const sb = new ServiceBase(repo);

    const allDocs = await sb.getAll(undefined);

    expect(allDocs[2]._id).toEqual(testDocs[2]._id);
    done();
  });

  it("should get a doc by id", async (done) => {
    const testDoc = await testHelpers.addTestDoc(testModel);
    const repo = new RepositoryBase(testModel);

    const sb = new ServiceBase(repo);

    const result = await sb.getById(testDoc._id);

    expect(result._id).toEqual(testDoc._id);
    done();
  });

  it("should update a doc by id", async (done) => {
    const testDoc = await testHelpers.addTestDoc(testModel);
    const update = { firstName: "keith" };
    const repo = new RepositoryBase(testModel);
    const sb = new ServiceBase(repo);

    await sb.updateById(testDoc._id, update);

    const findByIdResult = await testModel.findById(testDoc._id);

    expect(findByIdResult._id).toEqual(testDoc._id);
    expect(findByIdResult.firstName).toEqual(update.firstName);
    done();
  });

  it("should delete a doc by id", async (done) => {
    const testDocs = [await testHelpers.addTestDoc(testModel), await testHelpers.addTestDoc(testModel)];
    const repo = new RepositoryBase(testModel);
    const sb = new ServiceBase(repo);

    await sb.deleteById(testDocs[0]._id);

    const allDocs = await testModel.find();

    expect(allDocs.length).toBe(1);
    expect(allDocs[0]._id).toEqual(testDocs[1]._id);
    done();
  });
});
