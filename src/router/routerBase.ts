import { Router, Response, Request, NextFunction } from "express";
import { ControllerBase } from "../controller/controllerBase";

export class RouterBase {
  protected controller: ControllerBase;
  protected context: string;
  public router: Router = Router();

  constructor(controller: ControllerBase, context = "document") {
    this.controller = controller;
    this.context = context;
    this.router.use(function(req: Request, res: Response, next: NextFunction) {
      res.locals.context = context;
      next();
    });

    this.router.post("/", (req: Request, res: Response) => {
      this.controller.create(res, req.body.data);
    });

    this.router.get("/", (req: Request, res: Response) => {
      this.controller.getAll(res);
    });

    this.router.get("/:id", (req: Request, res: Response) => {
      this.controller.getById(res, req.params.id);
    });

    this.router.put("/:id", (req: Request, res: Response) => {
      this.controller.updateById(res, req.params.id, req.body.data);
    });

    this.router.delete("/:id", (req: Request, res: Response) => {
      this.controller.deleteById(res, req.params.id);
    });
  }
}
