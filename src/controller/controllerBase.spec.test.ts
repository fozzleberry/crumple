import { ControllerBase, IControllerBase } from "./controllerBase";
import { RepositoryBase } from "../repository/repositoryBase";
import { ServiceBase, IServiceBase } from "../service/serviceBase";
import { testModel, ITestModel } from "../test/testModel";

let service: IServiceBase;
let controller: IControllerBase;

const mockResponse = { _id: "someId" };

export const mockRes = {
  req: {
    originalUrl: "url"
  },
  params: {
    id: "someObjectId"
  },
  location: jest.fn(),
  json: jest.fn()
};

interface methods {
  controllerMethod: string;
  serviceMethod: string;
  factoryMethod: string;
  params: any[];
  returnsNotFound?: boolean;
  addsLocationHeader?: boolean;
}

const methods: Array<methods> = [
  {
    controllerMethod: "create",
    serviceMethod: "create",
    factoryMethod: "created",
    params: [{ firstName: "bob" }],
    addsLocationHeader: true
  },
  {
    controllerMethod: "getAll",
    serviceMethod: "getAll",
    factoryMethod: "ok",
    params: []
  },
  {
    controllerMethod: "getById",
    serviceMethod: "getById",
    factoryMethod: "ok",
    params: [mockRes.params.id],
    returnsNotFound: true
  },
  {
    controllerMethod: "updateById",
    serviceMethod: "updateById",
    factoryMethod: "ok",
    params: [mockRes.params.id, { some: "update" }],
    returnsNotFound: true,
    addsLocationHeader: true
  },
  {
    controllerMethod: "deleteById",
    serviceMethod: "deleteById",
    factoryMethod: "ok",
    params: [mockRes.params.id],
    returnsNotFound: true
  }
];

beforeAll(() => {
  service = new ServiceBase(new RepositoryBase<ITestModel>(testModel));
  controller = new ControllerBase(service);
});

afterEach(() => {
  mockRes.location.mockClear();
  mockRes.json.mockClear();
});

// Automated Tests
describe("ControllerBase", () => {
  methods.forEach(
    ({
      controllerMethod,
      serviceMethod,
      factoryMethod,
      params,
      returnsNotFound,
      addsLocationHeader
    }) => {
      describe(`${controllerMethod}`, () => {
        it("should send a response", async () => {
          controller.responseFactory[
            factoryMethod
          ] = jest.fn().mockReturnValueOnce(mockResponse);

          controller.service[serviceMethod] = jest
            .fn()
            .mockReturnValueOnce(mockResponse);

          await controller[controllerMethod](mockRes, ...params);

          expect(mockRes.json).toHaveBeenCalledTimes(1);
          expect(mockRes.json).toHaveBeenCalledWith(mockResponse);
        });

        it("should send an error if one is thrown", async () => {
          const processErrorSpy = jest.spyOn(controller, "processError");

          controller.responseFactory[
            factoryMethod
          ] = jest.fn().mockReturnValueOnce(mockResponse);

          controller.service[serviceMethod] = jest
            .fn()
            .mockImplementation(() => {
              throw new Error("someError");
            });

          await controller[controllerMethod](mockRes, { firstName: "bob" });

          expect(processErrorSpy).toHaveBeenCalledTimes(1);
          processErrorSpy.mockRestore();
        });

        if (returnsNotFound) {
          it("should send a not found response", async () => {
            const responseFactoryMethod = (controller.responseFactory.notFound = jest.fn());

            controller.service[serviceMethod] = jest
              .fn()
              .mockReturnValueOnce(null);

            await controller[controllerMethod](mockRes, ...params);

            expect(responseFactoryMethod).toHaveBeenCalledTimes(1);
            expect(mockRes.json).toHaveBeenCalledTimes(1);
          });
        }
        if (addsLocationHeader) {
          it("should add a location header to the response", async () => {
            controller.responseFactory[
              factoryMethod
            ] = jest.fn().mockReturnValueOnce(mockResponse);

            controller.service[serviceMethod] = jest
              .fn()
              .mockReturnValueOnce(mockResponse);

            await controller[controllerMethod](mockRes, { firstName: "bob" });

            expect(mockRes.location).toHaveBeenCalledTimes(1);
          });
        }
      });
    }
  );
});

// Non Automated Tests

describe("ControllerBase", () => {
  describe("processError", () => {
    it("should send an invalid response if given a validation error", () => {
      const spy = (controller.responseFactory.invalid = jest.fn());
      const error = {
        name: "ValidationError"
      };

      controller.processError(error, mockRes);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(mockRes.json).toHaveBeenCalledTimes(1);
    });

    it("should send a bad request response when given a cast error", () => {
      const spy = (controller.responseFactory.badRequest = jest.fn());
      const error = {
        name: "CastError"
      };

      controller.processError(error, mockRes);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(mockRes.json).toHaveBeenCalledTimes(1);
    });

    it("should send a conflict response when given a duplicate key error", () => {
      const spy = (controller.responseFactory.conflict = jest.fn());
      const error = {
        name: "MongoError",
        code: 11000
      };

      controller.processError(error, mockRes);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(mockRes.json).toHaveBeenCalledTimes(1);
    });

    it("should send an internal server error response when given any other error", () => {
      const spy = (controller.responseFactory.internalServerError = jest.fn());
      const error = {
        name: "someOtherError"
      };

      controller.processError(error, mockRes);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(mockRes.json).toHaveBeenCalledTimes(1);
    });
  });
});
