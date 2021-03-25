import capitalize from "../index";

describe("Capitalize helper", () => {
  it("capitalizes the first letter of a string", () => {
    const result = capitalize("hello");

    expect(result).toEqual("Hello");
  });

  it("returns an empty string if undefined", () => {
    const result = capitalize("");

    expect(result).toEqual("");
  });
});
