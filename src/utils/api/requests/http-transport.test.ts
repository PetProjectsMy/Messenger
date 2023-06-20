import { HTTPTransport, METHODS } from "./http-transport";

const xhrMock: Partial<XMLHttpRequest> = {
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn(),
  readyState: 4,
  status: 200,
  response: "Hello World!",
};

describe("Test Requests Module", () => {
  let request: HTTPTransport;

  beforeAll(() => {
    jest
      .spyOn(window, "XMLHttpRequest")
      .mockImplementation(() => xhrMock as XMLHttpRequest);
  });

  beforeEach(() => {
    request = new HTTPTransport({ baseURL: "" });
  });

  test("xml request open", () => {
    request.request("https://example.com/", { method: METHODS.GET });
    expect(xhrMock.open).toBeCalledWith(METHODS.GET, "https://example.com/");
  });
});
