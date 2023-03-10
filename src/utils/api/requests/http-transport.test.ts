import { HTTPTransport } from "./http-transport";

jest.mock("./http-transport", () => {
  return {
    HTTPTransport: jest.fn().mockImplementation(() => {
      return {
        request: jest.fn(),
      };
    }),
  };
});

describe("Test Requests Module", () => {
  let request: HTTPTransport;

  beforeEach(() => {
    request = new HTTPTransport({ baseURL: "" });
  });

  test("throw error on timeout exceeded", () => {
    console.log(jest.isMockFunction(request.request));
  });
});
