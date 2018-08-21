import { ResponseFactory } from "./responseFactory";

let rf: ResponseFactory;

beforeAll(() => {
  rf = new ResponseFactory();
});

describe("ResponseFactory", () => {
  it("should return an ok response", () => {
    const response = rf.ok({ some: "data" }, "someLink");
    expect(response).toMatchSnapshot();
  });

  it("should return a created response", () => {
    const response = rf.created("someLink", { some: "data" });
    expect(response).toMatchSnapshot();
  });

  it("should return a formatted response", () => {
    const response = rf.response("success", 200, { some: "data" });
    expect(response).toMatchSnapshot();
  });

  it("should return an invalid response", () => {
    const response = rf.invalid({ some: "data" });
    expect(response).toMatchSnapshot();
  });

  it("should return a not found response", () => {
    const response = rf.notFound({ some: "data" });
    expect(response).toMatchSnapshot();
  });

  it("should return a bad request response", () => {
    const response = rf.badRequest({ some: "data" });
    expect(response).toMatchSnapshot();
  });

  it("should return a conflict response", () => {
    const response = rf.conflict({ some: "data" });
    expect(response).toMatchSnapshot();
  });

  it("should return an error response", () => {
    const response = rf.errorResponse("error", 413, "some message", {
      some: "data"
    });
    expect(response).toMatchSnapshot();
  });
});
