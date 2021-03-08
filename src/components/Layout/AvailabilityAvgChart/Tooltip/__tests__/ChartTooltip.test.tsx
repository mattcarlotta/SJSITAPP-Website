import { mount } from "enzyme";
import Tooltip from "../index";

const initProps = {
  datum: {
    id: "Available",
    label: "Available",
    value: 3,
    formattedValue: "3",
    color: "#fff",
    data: {
      _id: "123456789",
      label: "Available",
      value: "3"
    },
    arc: {
      index: 1,
      startAngle: 360,
      endAngle: 280,
      angle: 45,
      angleDeg: 45,
      padAngle: 0.3
    }
  }
};

const wrapper = mount(<Tooltip {...initProps} />);

describe("Dashboard Availability Chart Tooltip", () => {
  it("renders without errors and displays a placeholder", () => {
    const findById = (id: string) => wrapper.find(`[data-testid='${id}']`);

    expect(findById("tooltip")).toExist();
    expect(findById("tooltip-block")).toHaveStyleRule("background", "#fff");
    expect(findById("tooltip-value").first().text()).toEqual(
      "Availability - 3%"
    );
  });
});
