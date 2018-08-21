import mongoose from "mongoose";
import { Mockgoose } from "mockgoose-fix";
import {fakeDoc} from "./fakeOptions";

const mockgoose: Mockgoose = new Mockgoose(mongoose);


// export async function startUpDb() {
// //     return await  mockgoose
// //         .prepareStorage()
// //         .then(async () =>  {
// //             await mongoose.connect("mongodb://localhost/test" );
// //         });
// // }
// //
// // export function emptyDb() {
// //     return mockgoose.helper.reset();
// // }
// //
// // export function addTestDoc(model: any) {
// //     const createdDoc = model.create(fakeDoc);
// //
// //     return createdDoc;
// // }
// //
// // export async function closeDb() {
// //     await mockgoose.connection.close();
// //     await mockgoose.disconnect();
// //     return;
// // }

export const integrationTestHelpers = {
    setup: async function setup() {
        await mockgoose.prepareStorage();
        await mongoose.connect('mongodb://test');
    },
    reset: async function reset() {
        await mockgoose.helper.reset();
    },
    teardown: async function teardown() {
        await mockgoose.helper.reset();
        await mongoose.disconnect();
        const retval = new Promise(resolve => {
            mockgoose.mongodHelper.mongoBin.childProcess.on('exit', resolve);
        });
        mockgoose.mongodHelper.mongoBin.childProcess.kill('SIGTERM');
        return retval;
    },
    addTestDoc: function addTestDoc(model: any) {
        return model.create(fakeDoc);
    }
};