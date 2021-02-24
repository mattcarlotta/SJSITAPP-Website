import { expandedIds, selectedTab } from "../index";

describe("Tab Helper Functions", () => {
  it("returns the selected tab from router pathname", () => {
    const pathname = "/employee/events/viewall?page=1";
    const selected = selectedTab(pathname);

    expect(selected).toEqual(["events/viewall"]);
  });

  it("returns the expanded tab from router pathname", () => {
    const pathname = "/employee/events/viewall?page=1";
    const expanded = expandedIds(pathname);
    const unexpanded = expandedIds("");

    expect(expanded).toEqual(["events"]);
    expect(unexpanded).toEqual([]);
  });
});
