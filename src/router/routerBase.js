"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class RouterBase {
    constructor(controller, context = "document") {
        this.router = express_1.Router();
        this.controller = controller;
        this.context = context;
        this.router.use(function (req, res, next) {
            res.locals.context = context;
            next();
        });
        this.router.post("/", (req, res) => {
            this.controller.create(res, req.body.data);
        });
        this.router.get("/", (req, res) => {
            this.controller.getAll(res);
        });
        this.router.get("/:id", (req, res) => {
            this.controller.getById(res, req.params.id);
        });
        this.router.put("/:id", (req, res) => {
            this.controller.updateById(res, req.params.id, req.body.data);
        });
        this.router.delete("/:id", (req, res) => {
            this.controller.deleteById(res, req.params.id);
        });
    }
}
exports.RouterBase = RouterBase;
