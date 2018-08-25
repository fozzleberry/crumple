import mongoose from "mongoose";
import { Mockgoose } from "mockgoose";
import {fakeDoc} from "./fakeOptions";

const mockgoose: Mockgoose = new Mockgoose(mongoose);

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