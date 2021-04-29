import { mount, ReactWrapper } from "enzyme";
import waitFor from "~utils/waitFor";
import { QueryHandler } from "../index";

const mockBack = jest.fn();
const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(() => ({
    route: "/",
    pathname: "",
    query: { page: 1 },
    asPath: "/",
    push: mockPush,
    replace: mockReplace,
    back: mockBack
  }))
}));

const wrapper = mount(
  <QueryHandler>
    {props => (
      <>
        <div data-testid="querystring">{props.queryString}</div>
        <div data-testid="query">
          {Object.values(props.queries).map(item => (
            <div data-testid="queryprop" key={item}>
              {item}
            </div>
          ))}
        </div>
        <button
          data-testid="update"
          type="button"
          onClick={() => props.updateQuery({ page: "2" })}
        >
          Update
        </button>
        <button data-testid="clear" type="button" onClick={props.clearFilters}>
          Clear
        </button>
      </>
    )}
  </QueryHandler>
);

const findById = (id: string): ReactWrapper =>
  wrapper.find(`[data-testid='${id}']`);

describe("Query Handler", () => {
  it("initally sets queries and queryString state", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("querystring").text()).toEqual("page=1");
      expect(findById("queryprop")).toHaveLength(1);
    });
  });

  it("it handles 'updateQuery' calls", () => {
    findById("update").simulate("click");
    expect(mockPush).toHaveBeenCalledWith(`?page=2`);
  });

  it("it handles 'clearFilters' calls", () => {
    findById("clear").simulate("click");
    expect(mockPush).toHaveBeenCalledWith(`?page=1`);
  });
});
