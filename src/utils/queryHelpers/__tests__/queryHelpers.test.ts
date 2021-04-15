import { stringifyQuery, parseQuery, setQuery } from "../index";

const selectedDate = "1-2-2020";
const page = 2;
describe("Query Helpers", () => {
  it("stringifyQuery should convert object of properties into a URL query", async () => {
    expect(stringifyQuery({ selectedDate, page })).toEqual(
      "selectedDate=1-2-2020&page=2"
    );
  });

  it("parseQuery should append queries with page", async () => {
    expect(parseQuery({ selectedDate, page })).toEqual({
      selectedDate,
      page
    });
  });

  it("parseQuery should return a page query if empty", async () => {
    const selectedDate = "1/2/2020";
    expect(parseQuery({ selectedDate })).toEqual({
      selectedDate,
      page: 1
    });
  });

  it("setQuery should convert object of properties into a URL query", async () => {
    expect(setQuery({ selectedDate })).toEqual({
      queries: {
        selectedDate,
        page: 1
      },
      queryString: "selectedDate=1-2-2020&page=1"
    });
  });
});
