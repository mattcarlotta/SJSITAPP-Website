import ParseFields from "../index";

const initialFields = [
  {
    name: "firstName",
    type: "text",
    label: "First Name",
    value: "Bob",
    errors: "",
    style: { width: "20%" },
    required: true
  },
  {
    name: "lastName",
    type: "text",
    label: "Last Name",
    value: "Smith",
    errors: "",
    style: { width: "20%" },
    required: true
  }
];

describe("ParseFields", () => {
  it("displays an error if fields are empty", () => {
    try {
      expect(ParseFields([]));
    } catch (e) {
      expect(e.toString()).toEqual(
        "Error: You must supply an array of fields!"
      );
    }
  });

  it("has a name of zipCode then it creates an address object", () => {
    const formValues = ParseFields(initialFields);
    expect(formValues).toEqual(
      expect.objectContaining({
        firstName: "Bob",
        lastName: "Smith"
      })
    );
  });
});
