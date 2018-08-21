import { startUpDb, emptyDb, addTestDoc, closeDb } from "../test/integrationTestHelpers";
import { testModel} from "../test/testModel";
import { RepositoryBase } from "./repositoryBase";
import { fakeDoc } from "../test/fakeOptions";

global.Promise = require.requireActual('promise');

beforeAll(async (done) => {
    jest.setTimeout(120000);
    await startUpDb();
    done();
});

beforeEach(async (done) => {
    await emptyDb();
    done();
});

afterEach(async (done) => {
    await closeDb();
    done();
});

afterAll(async (done) => {
    await closeDb();
    done();
});

describe("repositoryBase", () => {

    it("should add a new document to the db", async (done) => {
    const testDoc = fakeDoc;

    const rb = new RepositoryBase(testModel);

    const createdDoc : any = await rb.create(testDoc);
    const findByIdResult = await testModel.findById(createdDoc._id);

    expect(createdDoc).toHaveProperty('_id');
    expect(findByIdResult._id).toEqual(createdDoc._id);
    done();

  });

    it('should get all the documents in the db', async (done) => {
      const testDocs = [await addTestDoc(testModel), await addTestDoc(testModel), await addTestDoc(testModel)];


      const rb = new RepositoryBase(testModel);

      const allDocs = await rb.getAll();

      expect(allDocs[2]._id).toEqual(testDocs[2]._id);
        done();
    });

    it('should get a doc by id' ,async (done) => {
      const testDoc = await addTestDoc(testModel);
      const rb = new RepositoryBase(testModel);

      const result = await rb.getById(testDoc._id);

      expect(result._id).toEqual(testDoc._id);
      done();
    });

    it('should update a doc by id', async (done) => {
        const testDoc = await addTestDoc(testModel);
        const update = { firstName: 'keith' };
        const rb = new RepositoryBase(testModel);


        await rb.updateById(testDoc._id, update);

        const findByIdResult = await testModel.findById(testDoc._id);

        expect(findByIdResult._id).toEqual(testDoc._id);
        expect(findByIdResult.firstName).toEqual(update.firstName);
        done();
    });

    it('should delete a doc by id', async (done) => {
        const testDocs = [await addTestDoc(testModel), await addTestDoc(testModel)];
        const rb = new RepositoryBase(testModel);

        await rb.deleteById(testDocs[0]._id);

        const allDocs = await testModel.find();

        expect(allDocs.length).toBe(1);
        expect(allDocs[0]._id).toEqual(testDocs[1]._id);
        done();
    });
});