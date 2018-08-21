"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseFactory {
    static createResponse(status, data, statusCode) {
        const response = {
            status,
            data,
            statusCode
        };
        return response;
    }
    static fail(data, res, statusCode = 422) {
        const response = ResponseFactory.createResponse("fail", data, statusCode);
        res.Send(response);
    }
    static error(data, res, statusCode = 500) {
        const response = ResponseFactory.createResponse("error", data, statusCode);
        res.Send(response);
    }
    static success(data, res, statusCode = 200) {
        const response = ResponseFactory.createResponse("success", data, statusCode);
        res.Send(response);
    }
    static responseByStatusCode(data, res, statusCode) {
        if (!statusCode) {
            return null;
        }
        if (statusCode < 400) {
            ResponseFactory.success(data, res, statusCode);
        }
        else {
            ResponseFactory.error(data, res, statusCode);
        }
    }
}
exports.ResponseFactory = ResponseFactory;
