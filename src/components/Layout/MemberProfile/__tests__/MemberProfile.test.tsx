import { mount, ReactWrapper } from "enzyme";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
import moment from "~utils/momentWithTimezone";
import waitFor from "~utils/waitFor";
import mockApp, { mockAPI } from "~utils/mockAxios";
import MemberProfile from "../index";

const mockPush = jest.fn();
const mockReplace = jest.fn();

const filePNG = new File(["(⌐□_□)"], "example.png", { type: "image/png" });
const URL = "http://localhost:3000/example.png";
global.URL.createObjectURL = () => URL;

const user = {
  _id: "88",
  avatar: "",
  email: "test@test.com",
  emailReminders: true,
  firstName: "First",
  lastName: "Last",
  registered: moment().format(),
  role: "member",
  status: "active"
};

jest.mock("~components/App/Toast");

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn()
}));

(useRouter as jest.Mock).mockImplementation(() => ({
  route: "/",
  pathname: "",
  query: { tab: "profile", id: "88" },
  asPath: "/",
  push: mockPush,
  replace: mockReplace
}));

const APIURL = "members/view/88";
mockApp
  .onGet(APIURL)
  .replyOnce(404)
  .onGet(APIURL)
  .replyOnce(404)
  .onGet(APIURL)
  .replyOnce(200, user)
  .onGet(APIURL)
  .replyOnce(200, { ...user, status: "suspended" }) // failed update avatar
  .onGet(APIURL)
  .replyOnce(200, user) // success update avatar
  .onGet(APIURL)
  .reply(200, { ...user, avatar: URL });

const UPDATESETTINGS = "members/update";
const successUpdateSettingsMessage = "Member has been suspended.";
mockApp
  .onPut(UPDATESETTINGS)
  .replyOnce(404)
  .onPut(UPDATESETTINGS)
  .reply(200, { message: successUpdateSettingsMessage });

const UPDATESTATUS = "members/update-status";
const successUpdateStatusMessage = "Member has been suspended.";
mockApp
  .onPut(UPDATESTATUS)
  .replyOnce(404)
  .onPut(UPDATESTATUS)
  .reply(200, { message: successUpdateStatusMessage });

const DELETEAVATAR = "delete/88";
const successRemoveAvatarMessage = "Removed user avatar.";
mockAPI
  .onDelete(DELETEAVATAR)
  .replyOnce(404)
  .onDelete(DELETEAVATAR)
  .reply(200, { message: successRemoveAvatarMessage });

const UPDATEAVATAR = "update/88";
const successUpdateAvatarMessage = "Updated user avatar.";
mockAPI
  .onPut(UPDATEAVATAR)
  .replyOnce(404)
  .onPut(UPDATEAVATAR)
  .reply(200, { message: successUpdateAvatarMessage });

describe("Member Page", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<MemberProfile id="88" />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  afterEach(() => {
    (toast as jest.Mock).mockClear();
    mockPush.mockClear();
    mockReplace.mockClear();
  });

  it("initially renders a loading screen", () => {
    expect(findById("loading-member")).toExist();
  });

  it("redirects bad fetchMember API requests back to members page", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(mockReplace).toHaveBeenCalledWith(
        "/employee/members/viewall?page=1"
      );
    });
  });

  it("loads profile on successful fetchMember API requests", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("member-profile")).toExist();
    });
  });

  it("handles failed requests to update a member's avatar", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("member-profile")).toExist();
    });

    findById("toggle-upload-form-button").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("upload-avatar-form")).toExist();
    });

    findById("upload-avatar-input")
      .first()
      .simulate("change", {
        target: { files: [filePNG] }
      });

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "error",
        message: "Request failed with status code 404"
      });
    });
  });

  it("handles successful requests to update a member's avatar", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("member-profile")).toExist();
    });

    findById("toggle-upload-form-button").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("upload-avatar-form")).toExist();
    });

    findById("upload-avatar-input")
      .first()
      .simulate("change", {
        target: { files: [filePNG] }
      });

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "info",
        message: successUpdateAvatarMessage
      });
    });
  });

  it("handles failed requests to update a members settings", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("member-profile")).toExist();
      expect(findById("edit-member-form")).toExist();
    });

    wrapper.find("form").first().simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "error",
        message: "Request failed with status code 404"
      });
    });
  });

  it("handles successful requests to update a members settings", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("member-profile")).toExist();
      expect(findById("edit-member-form")).toExist();
    });

    wrapper.find("form").first().simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "info",
        message: successUpdateSettingsMessage
      });
    });
  });

  it("handles failed requests to update a members status when 'update-user-status' is clicked", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("member-profile")).toExist();
    });

    findById("update-user-status").simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "error",
        message: "Request failed with status code 404"
      });
    });
  });

  it("handles successful requests to update a members status", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("member-profile")).toExist();
    });

    findById("update-user-status").simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "info",
        message: successUpdateStatusMessage
      });
    });
  });

  it("handles failed requests to remove a member's avatar", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("member-profile")).toExist();
    });

    findById("remove-avatar-button").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "error",
        message: "Request failed with status code 404"
      });
    });
  });

  it("handles successful requests to remove a member's avatar", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("member-profile")).toExist();
    });

    findById("remove-avatar-button").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "info",
        message: successRemoveAvatarMessage
      });
    });
  });
});
