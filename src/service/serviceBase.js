"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceBase {
    constructor(repository) {
        this.repository = repository;
    }
    create(docs, options) {
        return this.repository.create(docs, options);
    }
    getAll(projection, options) {
        return this.repository.getAll(projection, options);
    }
    getById(id, projection) {
        return this.repository.getById(id, projection);
    }
    updateById(id, update, options) {
        return this.repository.updateById(id, update, options);
    }
    deleteById(id, options) {
        return this.repository.deleteById(id, options);
    }
}
exports.ServiceBase = ServiceBase;
