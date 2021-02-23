import { mount, ReactWrapper } from "enzyme";
import { ToastContainer } from "react-toastify";
import {
  BsCheckBox,
  FaRegTimesCircle,
  GoRadioTower,
  FiPaperclip,
  BsQuestionSquareFill
} from "~icons";
import Toast, { displayIcon } from "../index";

describe("ShowMemberDetails", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <>
        <ToastContainer
          position="top-right"
          autoClose={7500}
          hideProgressBar={false}
          newestOnTop={false}
          draggable
          pauseOnHover
        />
        <Toast type="success" message="Hello" />
      </>
    );
  });

  it("renders without errors", () => {
    expect(wrapper.find("ToastMessage")).toHaveProp("message", "Hello");
    expect(wrapper.find("ToastMessage")).toHaveProp("type", "success");
  });

  it("renders an success icon", () => {
    expect(displayIcon("success")).toEqual(<BsCheckBox />);
  });

  it("renders an info icon", () => {
    expect(displayIcon("info")).toEqual(<FiPaperclip />);
  });

  it("renders an error icon", () => {
    expect(displayIcon("error")).toEqual(<FaRegTimesCircle />);
  });

  it("renders a warning icon", () => {
    expect(displayIcon("warning")).toEqual(<GoRadioTower />);
  });

  it("renders a bug icon if missing type", () => {
    expect(displayIcon("")).toEqual(<BsQuestionSquareFill />);
  });
});
