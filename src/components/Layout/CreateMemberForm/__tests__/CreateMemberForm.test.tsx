import { mount, ReactWrapper } from "enzyme";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
import mockApp from "~utils/mockAxios";
import waitFor from "~utils/waitFor";
import CreateMemberForm from "../index";

const { push } = useRouter();

jest.mock("~components/App/Toast");

const APIURL = "tokens/create";

mockApp
  .onPost(APIURL)
  .replyOnce(404) // throws error
  .onPost(APIURL)
  .reply(200, { message: "Successfully created member!" }); // successfully submits form

describe("CreateMemberForm", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<CreateMemberForm />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  afterEach(() => {
    (push as jest.Mock).mockClear();
    (toast as jest.Mock).mockClear();
  });

  it("renders without errors", async () => {
    expect(wrapper.find("form")).toExist();
  });

  it("displays errors when submitting empty fields", async () => {
    wrapper.find("form").simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(findById("errors")).toExist();
    });
  });

  it("handles failing to submit the Create Season form", async () => {
    findById("authorizedEmail").simulate("change", {
      target: {
        name: "authorizedEmail",
        value: "test@example.com"
      }
    });

    wrapper.find("form").simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "error",
        message: "Request failed with status code 404"
      });
    });
  });

  it("handles successfully submitting the Create Season form", async () => {
    findById("authorizedEmail").simulate("change", {
      target: {
        name: "authorizedEmail",
        value: "test@example.com"
      }
    });

    wrapper.find("form").simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "success",
        message: "Successfully created member!"
      });
      expect(push).toHaveBeenCalledWith(
        "/employee/members/authorizations/viewall?page=1"
      );
    });
  });
});
