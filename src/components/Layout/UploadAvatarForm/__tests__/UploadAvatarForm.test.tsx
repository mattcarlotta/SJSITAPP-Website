import { mount, ReactWrapper } from "enzyme";
import toast from "~components/App/Toast";
import waitFor from "~utils/waitFor";
import UploadAvatarForm from "../index";

jest.mock("~components/App/Toast");

const filePNG = new File(["(⌐□_□)"], "example.png", { type: "image/png" });
const fileBMP = new File(["(⌐□_□)"], "example.png", { type: "image/bmp" });
const URL = "http://localhost:3000/example.png";
global.URL.createObjectURL = () => URL;

const deleteUserAvatar = jest.fn();
const updateUserAvatar = jest.fn();

const initProps = {
  avatar: "",
  deleteUserAvatar,
  id: "88",
  serverError: "",
  serverMessage: "",
  updateUserAvatar
};

describe("Update Avatar Form", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<UploadAvatarForm {...initProps} />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  afterEach(() => {
    deleteUserAvatar.mockClear();
    updateUserAvatar.mockClear();
    (toast as jest.Mock).mockClear();
  });

  it("renders without errors", () => {
    expect(findById("upload-avatar-form-container")).toExist();
  });

  it("initially displays an avatar image", () => {
    expect(findById("avatar")).toExist();
  });

  it("toggles the upload form and shows a cancel button", () => {
    expect(findById("toggle-upload-form-button").text()).toContain("Upload");
    findById("toggle-upload-form-button").first().simulate("click");

    expect(findById("upload-avatar-form")).toExist();
    expect(findById("toggle-upload-form-button").text()).toContain("Cancel");
  });

  it("calls 'deleteUserAvatar' when an avatar is present", () => {
    wrapper.setProps({ avatar: URL });

    expect(findById("remove-avatar-button")).toExist();
    findById("remove-avatar-button").first().simulate("click");

    expect(deleteUserAvatar).toHaveBeenCalledWith("88");
  });

  describe("When the upload form is loaded", () => {
    beforeEach(() => {
      findById("toggle-upload-form-button").first().simulate("click");
    });

    it("handles invalid image selections", () => {
      findById("upload-avatar-input")
        .first()
        .simulate("change", {
          target: { files: [fileBMP] }
        });

      expect(toast).toHaveBeenCalledWith({
        type: "error",
        message: "Only 2mb or less .jpg/.jpeg/.png files are accepted!"
      });
    });

    it("handles valid image selections and uploads them to API", () => {
      findById("upload-avatar-input")
        .first()
        .simulate("change", {
          target: { files: [filePNG] }
        });

      expect(updateUserAvatar).toHaveBeenCalledWith({
        form: expect.any(FormData),
        id: "88"
      });
    });

    it("cancels the form submission upon avatar upload error", async () => {
      findById("upload-avatar-input")
        .first()
        .simulate("change", {
          target: { files: [filePNG] }
        });

      await waitFor(() => {
        wrapper.update();
        expect(findById("submitting")).toExist();
      });

      wrapper.setProps({ serverError: "Unable to upload avatar." });

      await waitFor(() => {
        wrapper.update();
        expect(findById("submitting")).not.toExist();
      });
    });

    it("closes the form upon successful avatar upload", async () => {
      findById("upload-avatar-input")
        .first()
        .simulate("change", {
          target: { files: [filePNG] }
        });

      await waitFor(() => {
        wrapper.update();
        expect(findById("submitting")).toExist();
      });

      wrapper.setProps({ serverMessage: "Successfully upload avatar." });

      await waitFor(() => {
        wrapper.update();
        expect(findById("upload-avatar-form")).not.toExist();
        expect(findById("avatar")).toExist();
      });
    });
  });
});
