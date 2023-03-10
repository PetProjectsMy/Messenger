import { Block } from "./block";

let component: Block;
let updateComponentMock: jest.SpyInstance;
let renderMock: jest.SpyInstance;

describe("Test Component", () => {
  beforeEach(() => {
    renderMock = jest.spyOn(Block.prototype as any, "_render");
    component = new Block();
    updateComponentMock = jest.spyOn(component as any, "_updateComponent");
  });

  test("should render component after creation", () => {
    expect(renderMock).toBeCalledTimes(1);
  });

  test("should rerender on props change", () => {
    component.setPropByPath({ pathString: "myProp", value: 123 });
    expect(updateComponentMock).toBeCalledTimes(1);
    expect(renderMock).toBeCalledTimes(2);
  });

  test("should rerender on state change", () => {
    console.log(renderMock.mock.calls.length);
    component.setPropByPath({ pathString: "myState", value: 321 });
    expect(updateComponentMock).toBeCalledTimes(1);
    expect(renderMock).toBeCalledTimes(2);
  });
});
