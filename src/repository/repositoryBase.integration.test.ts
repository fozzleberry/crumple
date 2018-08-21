import { integrationTestHelpers } from "../test/integrationTestHelpers";
import { testModel} from "../test/testModel";
import { RepositoryBase } from "./repositoryBase";
import { fakeDoc } from "../test/fakeOptions";

beforeAll(async () => {
    await integrationTestHelpers.setup();
});

beforeEach(async () => {
    await integrationTestHelpers.reset();
});

afterAll(async () => {
    await integrationTestHelpers.teardown();
});

describe("repositoryBase", () => {

    it("should add a new document to the db", async () => {
    const testDoc = fakeDoc;

    const rb = new RepositoryBase(testModel);

    const createdDoc : any = await rb.create(testDoc);
    const findByIdResult = await testModel.findById(createdDoc._id);

    expect(createdDoc).toHaveProperty('_id');
    expect(findByIdResult._id).toEqual(createdDoc._id);

  });

    it('should get all the documents in the db', async () => {
      const testDocs = [await integrationTestHelpers.addTestDoc(testModel), await integrationTestHelpers.addTestDoc(testModel), await integrationTestHelpers.addTestDoc(testModel)];

      const rb = new RepositoryBase(testModel);

      const allDocs = await rb.getAll();

      expect(allDocs[2]._id).toEqual(testDocs[2]._id);
    });

    it('should get a doc by id' ,async () => {
      const testDoc = await integrationTestHelpers.addTestDoc(testModel);
      const rb = new RepositoryBase(testModel);

      const result = await rb.getById(testDoc._id);

      expect(result._id).toEqual(testDoc._id);
    });

    it('should update a doc by id', async () => {
        const testDoc = await integrationTestHelpers.addTestDoc(testModel);
        const update = { firstName: 'keith' };
        const rb = new RepositoryBase(testModel);


        await rb.updateById(testDoc._id, update);

        const findByIdResult = await testModel.findById(testDoc._id);

        expect(findByIdResult._id).toEqual(testDoc._id);
        expect(findByIdResult.firstName).toEqual(update.firstName);
    });

    it('should delete a doc by id', async () => {
        const testDocs = [await integrationTestHelpers.addTestDoc(testModel), await integrationTestHelpers.addTestDoc(testModel)];
        const rb = new RepositoryBase(testModel);

        await rb.deleteById(testDocs[0]._id);

        const allDocs = await testModel.find();

        expect(allDocs.length).toBe(1);
        expect(allDocs[0]._id).toEqual(testDocs[1]._id);
    });
});