import { ReactWrapper } from "enzyme";
import withRedux from "~utils/withRedux";
import HomePage from "~containers/Pages/Home";
import app from "~utils/mockAxios";
import Container from "../index";

app.onGet("signedin").reply(200, {
  data: {
    role: "guest"
  }
});

describe("App Container", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = withRedux(
      <Container Component={HomePage} router={{} as any} pageProps={{}} />
    );
  });

  it("renders without errors", () => {
    expect(wrapper.find("Home")).toExist();
  });
});
