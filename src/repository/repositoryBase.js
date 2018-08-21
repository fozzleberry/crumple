"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RepositoryBase {
    constructor(model) {
        this._model = model;
    }
    create(docs, options) {
        return this._model.create(docs, options);
    }
    getAll(projection, options) {
        return this._model.find({}, projection, options);
    }
    getById(id, projection, options) {
        return this._model.findById(id, projection, options);
    }
    updateById(id, update, options) {
        return this._model.findByIdAndUpdate(id, update, options);
    }
    deleteById(id, options) {
        return this._model.findByIdAndRemove(id, options);
    }
}
exports.RepositoryBase = RepositoryBase;
