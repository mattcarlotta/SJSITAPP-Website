import { mount, ReactWrapper } from "enzyme";
import { useRouter } from "next/router";
import waitFor from "~utils/waitFor";
import { QueryHandler } from "../index";

const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn()
}));

(useRouter as jest.Mock).mockImplementation(() => ({
  route: "/",
  pathname: "/",
  query: { id: "88", page: 1 },
  asPath: "/",
  push: mockPush,
  replace: mockReplace
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
      expect(findById("querystring").text()).toEqual("id=88&page=1");
      expect(findById("queryprop")).toHaveLength(2);
    });
  });

  it("it handles 'updateQuery' calls", () => {
    findById("update").simulate("click");
    expect(mockPush).toHaveBeenCalledWith(`/?id=88&page=2`);
  });

  it("it handles 'clearFilters' calls", () => {
    findById("clear").simulate("click");
    expect(mockPush).toHaveBeenCalledWith(`/?page=1`);
  });
});
