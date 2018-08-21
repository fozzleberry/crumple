"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseFactory_1 = require("../responseFactory/responseFactory");
class ControllerBase {
    constructor(service, responseFactory = responseFactory_1.ResponseFactory) {
        this.service = service;
        this.responseFactory = responseFactory;
    }
    create(res, docs, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service
                .create(docs, options)
                .catch((err) => {
                return err;
            });
            this.processResult(result, res, 201);
        });
    }
    getAll(res, projection, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service
                .getAll(projection, options)
                .catch((err) => {
                return err;
            });
            this.processResult(result, res);
        });
    }
    getById(res, id, projection, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service
                .getById(id, projection, options)
                .catch((err) => {
                return err;
            });
            this.processResult(result, res);
        });
    }
    updateById(res, id, update, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service
                .updateById(id, update, options)
                .catch((err) => {
                return err;
            });
            this.processResult(result, res);
        });
    }
    deleteById(res, id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service
                .deleteById(id, options)
                .catch((err) => {
                return err;
            });
            this.processResult(result, res);
        });
    }
    processError(err, res) {
        if (err.name == "ValidationError") {
            this.responseFactory.fail({ errors: err.errors }, res);
        }
        else {
            if (process.env.NODE_ENV != "production") {
                this.responseFactory.error({ error: err }, res, err.code);
            }
            else {
                this.responseFactory.error({ error: err }, res);
            }
        }
    }
    processSuccess(result, res, statusCode = 200) {
        this.responseFactory.success(result, res, statusCode);
    }
    processResult(result, res, statusCode) {
        if (result.errors) {
            this.processError(result, res);
        }
        else {
            this.processSuccess(result, res, statusCode);
        }
    }
}
exports.ControllerBase = ControllerBase;
