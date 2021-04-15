import { mount, ReactWrapper } from "enzyme";
import Button from "../index";

const initProps = {
  children: "Test"
};

describe("Styled Button", () => {
  let wrapper: ReactWrapper;
  let buttonNode: () => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <Button type="button" dataTestId="test-button" {...initProps} />
    );
    buttonNode = () => wrapper.find("[data-testid='test-button']");
  });

  it("renders without errors", () => {
    expect(buttonNode()).toExist();
  });

  it("sets box-shadow when passed a 'noGlow' prop", () => {
    wrapper.setProps({ noGlow: true });
    expect(buttonNode()).toHaveStyleRule("box-shadow", "none", {
      target: ":hover"
    });
  });

  it("sets display when passed a 'display' prop", () => {
    wrapper.setProps({ display: "inline-block" });
    expect(buttonNode()).toHaveStyleRule("display", "inline-block");
  });

  it("sets cursor to not-allowed when passed a 'cursor' prop", () => {
    wrapper.setProps({ disabled: true });
    expect(buttonNode()).toHaveStyleRule("cursor", "not-allowed");
  });

  it("sets font-size when passed a 'fontSize' prop", () => {
    wrapper.setProps({ fontSize: "10px" });
    expect(buttonNode()).toHaveStyleRule("font-size", "10px");
  });

  it("sets padding when passed a 'padding' prop", () => {
    wrapper.setProps({ padding: "10px" });
    expect(buttonNode()).toHaveStyleRule("padding", "10px");
  });

  it("sets text-transform when passed a 'uppercase', 'lowercase' or 'capitalize' prop", () => {
    wrapper.setProps({ uppercase: true, lowercase: false, capitalize: false });
    expect(buttonNode()).toHaveStyleRule("text-transform", "uppercase");

    wrapper.setProps({ uppercase: false, lowercase: true, capitalize: false });
    expect(buttonNode()).toHaveStyleRule("text-transform", "lowercase");

    wrapper.setProps({ uppercase: false, lowercase: false, capitalize: true });
    expect(buttonNode()).toHaveStyleRule("text-transform", "capitalize");
  });

  it("sets width when passed a 'width' prop", () => {
    wrapper.setProps({ width: "10px" });
    expect(buttonNode()).toHaveStyleRule("width", "10px");
  });

  it("initially displays a default button", () => {
    const StyledButton = buttonNode();

    expect(StyledButton).toHaveStyleRule("cursor", "pointer");
    expect(StyledButton).toHaveStyleRule("color", "#fff");
    expect(StyledButton).toHaveStyleRule("background", "transparent");
    expect(StyledButton).toHaveStyleRule("text-transform", "none");
    expect(StyledButton).toHaveStyleRule("border", "2px solid transparent");
    expect(StyledButton).toHaveStyleRule("width", "100%");
    expect(StyledButton).toHaveStyleRule("padding", "13px 18px");
    expect(StyledButton).toHaveStyleRule("font-size", "18px");

    expect(StyledButton).toHaveStyleRule("color", "#04515d", {
      target: ":hover"
    });
    expect(StyledButton).toHaveStyleRule("border", "2px solid transparent", {
      target: ":hover"
    });
    expect(StyledButton).toHaveStyleRule("background", "transparent", {
      target: ":hover"
    });
    expect(StyledButton).toHaveStyleRule(
      "box-shadow",
      "0px 0px 14px -2px #14d3e2",
      {
        target: ":hover"
      }
    );
  });

  it("displays a primary button when passed a 'primary' prop", () => {
    wrapper.setProps({ primary: true });

    const StyledButton = buttonNode();

    expect(StyledButton).toHaveStyleRule("color", "#fff");
    expect(StyledButton).toHaveStyleRule("background", "#0d6472");
    expect(StyledButton).toHaveStyleRule("border", "2px solid #0d6472");

    expect(StyledButton).toHaveStyleRule("color", "#e4e3e3", {
      target: ":hover"
    });
    expect(StyledButton).toHaveStyleRule("border", "2px solid #006d76", {
      target: ":hover"
    });
    expect(StyledButton).toHaveStyleRule("background", "#006d76", {
      target: ":hover"
    });
    expect(StyledButton).toHaveStyleRule(
      "box-shadow",
      "0px 0px 14px -2px #14d3e2",
      {
        target: ":hover"
      }
    );
  });

  it("displays a danger button when passed a 'danger' prop", () => {
    wrapper.setProps({ danger: true });

    const StyledButton = buttonNode();

    expect(StyledButton).toHaveStyleRule("color", "#fff");
    expect(StyledButton).toHaveStyleRule("background", "#ef512d");
    expect(StyledButton).toHaveStyleRule("border", "2px solid #ef512d");

    expect(StyledButton).toHaveStyleRule("color", "#e4e3e3", {
      target: ":hover"
    });
    expect(StyledButton).toHaveStyleRule("border", "2px solid #e8502e", {
      target: ":hover"
    });
    expect(StyledButton).toHaveStyleRule("background", "#e8502e", {
      target: ":hover"
    });
    expect(StyledButton).toHaveStyleRule(
      "box-shadow",
      "0px 0px 14px -2px #e25d3f",
      {
        target: ":hover"
      }
    );
  });

  it("displays a tertiary button when passed a 'tertiary' prop", () => {
    wrapper.setProps({ tertiary: true, noGlow: false });

    const StyledButton = buttonNode();

    expect(StyledButton).toHaveStyleRule("color", "#e4e3e3");
    expect(StyledButton).toHaveStyleRule("background", "#010404");
    expect(StyledButton).toHaveStyleRule("border", "2px solid #2e7c8a");

    expect(StyledButton).toHaveStyleRule("color", "#fff", {
      target: ":hover"
    });
    expect(StyledButton).toHaveStyleRule("border", "2px solid #3794a5", {
      target: ":hover"
    });
    expect(StyledButton).toHaveStyleRule("background", "#025f6d", {
      target: ":hover"
    });
    expect(StyledButton).toHaveStyleRule(
      "box-shadow",
      "0px 0px 14px -2px #14d3e2",
      {
        target: ":hover"
      }
    );
  });

  it("displays an alt button when passed an 'alt' prop", () => {
    wrapper.setProps({ alt: true });

    const StyledButton = buttonNode();

    expect(StyledButton).toHaveStyleRule("color", "#2e7c8a");
    expect(StyledButton).toHaveStyleRule("background", "transparent");
    expect(StyledButton).toHaveStyleRule("border", "2px solid transparent");

    expect(StyledButton).toHaveStyleRule("color", "#fff", {
      target: ":hover"
    });
    expect(StyledButton).toHaveStyleRule("border", "2px solid transparent", {
      target: ":hover"
    });
    expect(StyledButton).toHaveStyleRule("background", "#2e7c8a", {
      target: ":hover"
    });
    expect(StyledButton).toHaveStyleRule(
      "box-shadow",
      "0px 0px 14px -2px #14d3e2",
      {
        target: ":hover"
      }
    );
  });

  it("displays an outline button when passed an 'outline' prop", () => {
    wrapper.setProps({ outline: true });

    const StyledButton = buttonNode();

    expect(StyledButton).toHaveStyleRule("color", "#0085ff");
    expect(StyledButton).toHaveStyleRule("background", "transparent");
    expect(StyledButton).toHaveStyleRule("border", "2px solid #0085ff");

    expect(StyledButton).toHaveStyleRule("color", "#006cd0", {
      target: ":hover"
    });
    expect(StyledButton).toHaveStyleRule("border", "2px solid #006cd0", {
      target: ":hover"
    });
    expect(StyledButton).toHaveStyleRule("background", "transparent", {
      target: ":hover"
    });
    expect(StyledButton).toHaveStyleRule(
      "box-shadow",
      "0px 0px 14px -2px #14d3e2",
      {
        target: ":hover"
      }
    );
  });
});
