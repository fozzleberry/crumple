"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, unique: true }
});
exports.testModel = mongoose_1.model("testModel", schema);
