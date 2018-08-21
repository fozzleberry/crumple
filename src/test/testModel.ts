import { Schema, model, Document, Model } from "mongoose";

export interface ITestModel extends Document {
  firstName: string;
  lastName: string;
}

const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: {type: String, unique: true}
});

export const testModel: Model<ITestModel> = model("testModel", schema);
