import { Block } from "./block";

let component: Block;
let updateComponentMock;

describe("Test Component", () => {
  beforeEach(() => {
    component = new Block();
  });

  test.only("should rerender on props change", () => {
    updateComponentMock = jest.spyOn(component as any, "_updateComponent");
    component.setPropByPath({ pathString: "myProp", value: 123 });
    expect(updateComponentMock).toBeCalledTimes(1);
  });
});
