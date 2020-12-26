import { flat } from "./utils";

describe("flat", () => {
  it("should flat a double array of string", () => {
    const arr = [
      ["1", "2", "3"],
      ["4", "5"],
    ];
    expect(flat(arr)).toEqual(["1", "2", "3", "4", "5"]);
  });
});
