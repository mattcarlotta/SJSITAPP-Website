// import moment from "~utils/momentWithTimezone";
import fieldValidator from "../index";

describe("FieldValidator", () => {
  it("throws an error if missing required parameters", () => {
    try {
      fieldValidator([]);
    } catch (error) {
      expect(error).toEqual("You must supply an array of fields!");
    }
  });

  it("passes validation when all requirements are satisfied", () => {
    const fields = [
      {
        name: "email",
        label: "Emai",
        type: "text",
        value: "test@example.com",
        errors: "",
        required: true
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        value: "12345",
        errors: "",
        required: true
      }
    ];

    const { errors } = fieldValidator(fields);
    expect(errors).toEqual(0);
  });

  it("validates required fields", () => {
    const fields = [
      {
        name: "email",
        label: "Email",
        type: "text",
        value: "",
        errors: "",
        required: true
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        value: "",
        errors: "",
        required: true
      }
      // {
      //   name: "season",
      //   label: "Season",
      //   type: "range",
      //   value: [],
      //   errors: "",
      //   required: true
      // }
    ];

    const { validatedFields, errors } = fieldValidator(fields);
    expect(validatedFields).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          errors: "Required."
        })
      ])
    );
    expect(errors).toEqual(2);
  });

  it("validates valid emails", () => {
    const fields = [
      {
        name: "email",
        label: "Email",
        type: "text",
        value: "bademail.com",
        errors: "",
        required: true
      }
    ];

    const { validatedFields, errors } = fieldValidator(fields);
    expect(validatedFields).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          errors: "Invalid email."
        })
      ])
    );
    expect(errors).toEqual(1);
  });

  it("validates short passwords", () => {
    const fields = [
      {
        name: "password",
        label: "Password",
        type: "password",
        value: "1234",
        errors: "",
        required: true
      }
    ];

    const { validatedFields, errors } = fieldValidator(fields);
    expect(validatedFields).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          errors: "Password too short."
        })
      ])
    );
    expect(errors).toEqual(1);
  });

  // it("validates date ranges", () => {
  //   const fields = [
  //     {
  //       name: "date",
  //       label: "Date",
  //       type: "range",
  //       value: [moment()],
  //       errors: "",
  //       required: true
  //     }
  //   ];

  //   const { validatedFields, errors } = fieldValidator(fields);
  //   expect(validatedFields).toEqual(
  //     expect.arrayContaining([
  //       expect.objectContaining({
  //         errors: "You must select a start and an end date."
  //       })
  //     ])
  //   );
  //   expect(errors).toEqual(1);
  // });

  // it("validates radiogroups", () => {
  //   const fields = [
  //     {
  //       name: "responses",
  //       label: "Responses",
  //       type: "radiogroup",
  //       value: "",
  //       errors: "",
  //       required: true
  //     }
  //   ];

  //   const { validatedFields, errors } = fieldValidator(fields);
  //   expect(validatedFields).toEqual(
  //     expect.arrayContaining([
  //       expect.objectContaining({
  //         errors: "Please select an option above."
  //       })
  //     ])
  //   );
  //   expect(errors).toEqual(1);
  // });
});
