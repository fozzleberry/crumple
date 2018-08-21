import mongoose from "mongoose";
import { Mockgoose } from "mockgoose-fix";
import {fakeDoc} from "./fakeOptions";

const mockgoose: Mockgoose = new Mockgoose(mongoose);


export function startUpDb() {
    mongoose.connection.close();
    return mockgoose
        .prepareStorage()
        .then(async () =>  {
            await mongoose.connect("mongodb://localhost/test" );
        });
}

export function emptyDb() {
    return mockgoose.helper.reset();
}

export function addTestDoc(model: any) {
    const createdDoc = model.create(fakeDoc);

    return createdDoc;
}

export function closeDb() {
    return mongoose.connection.close();
}