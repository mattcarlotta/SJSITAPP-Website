import { mount, ReactWrapper } from "enzyme";
import { useRouter } from "next/router";
import moment from "~utils/momentWithTimezone";
import waitFor from "~utils/waitFor";
import { SettingsPage } from "../index";

const mockPush = jest.fn();

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn()
}));

(useRouter as jest.Mock)
  .mockImplementationOnce(() => ({
    route: "/",
    pathname: "",
    query: {},
    asPath: "/",
    push: mockPush
  }))
  .mockImplementation(() => ({
    route: "/",
    pathname: "",
    query: {},
    asPath: "/",
    push: mockPush
  }));

const deleteUserAvatar = jest.fn();
const updateUserAvatar = jest.fn();
const updateUserProfile = jest.fn();

const initProps = {
  id: "88",
  avatar: "",
  email: "test@test.com",
  emailReminders: true,
  firstName: "First",
  lastName: "Last",
  registered: moment().format(),
  role: "employee",
  serverError: "",
  serverMessage: "",
  status: "active",
  deleteUserAvatar,
  updateUserAvatar,
  updateUserProfile
};

describe("Settings Page", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<SettingsPage {...initProps} />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  afterEach(() => {
    mockPush.mockClear();
  });

  it("renders the profile tab without errors", () => {
    expect(findById("settings-page")).toExist();
  });

  it("toggles tab", async () => {
    findById("tab-availability").at(1).simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(mockPush).toHaveBeenCalledWith("?tab=availability", undefined, {
        shallow: true
      });
    });
  });
});
