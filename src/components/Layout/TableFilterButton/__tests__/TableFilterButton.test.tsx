import { ReactWrapper } from "enzyme";
import waitFor from "~utils/waitFor";
import withProviders from "~utils/withProviders";
import TableFilterButton from "../index";
import { TFilters } from "~types";

const clearFilters = jest.fn();
const updateQuery = jest.fn();

const filters: TFilters = [
  {
    name: "emailStatus",
    title: "Email Status",
    selectType: "email",
    type: "select"
  },
  {
    name: "role",
    title: "Role",
    selectType: "role",
    type: "select"
  },
  {
    name: "registration",
    title: "Registration",
    selectType: "registration",
    type: "select"
  },
  {
    name: "status",
    title: "Account Status",
    selectType: "status",
    type: "select"
  },
  {
    name: "email",
    title: "Email",
    type: "text"
  },
  {
    name: "startDate",
    title: "Start Date",
    type: "date"
  },
  {
    name: "notValid",
    title: "Not Valid",
    type: "notvalid"
  }
];

const initProps = {
  clearFilters,
  filters,
  queries: {},
  updateQuery
};

describe("Table Filter Button", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  let openFilter: (field: string) => void;
  beforeEach(() => {
    wrapper = withProviders(<TableFilterButton {...initProps} />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
    openFilter = field => {
      findById("filter-button").simulate("click");

      expect(findById("filters-menu")).toExist();

      findById(`${field}-filter`).first().simulate("click");

      expect(findById("filters-form")).toExist();
    };
  });

  afterEach(() => {
    clearFilters.mockClear();
    updateQuery.mockClear();
  });

  it("initially just renders a filters and clear button ", () => {
    expect(findById("filter-button")).toExist();
    expect(findById("clear-filters-button")).toExist();
    expect(findById("filters-menu")).not.toExist();
  });

  it("clears filters when the 'Clear Filters' button is clicked", () => {
    findById("clear-filters-button").simulate("click");

    expect(clearFilters).toHaveBeenCalledTimes(1);
  });

  it("displays filters when the 'Filters' button is clicked", () => {
    findById("filter-button").simulate("click");

    expect(findById("filters-menu")).toExist();
  });

  it("doesn't add filters when the filters form is submitted without a value", () => {
    openFilter("Email Status");

    wrapper.find("form").simulate("submit");

    expect(updateQuery).toHaveBeenCalledWith({ emailStatus: null });
  });

  it("add filters for fields with type 'email'", () => {
    openFilter("Email Status");

    findById("emailStatus-selected-value").first().simulate("click");

    findById("sent").simulate("click");

    wrapper.find("form").simulate("submit");

    expect(updateQuery).toHaveBeenCalledWith({ emailStatus: "sent" });
  });

  it("add filters for fields with type 'role'", () => {
    openFilter("Role");

    findById("role-selected-value").first().simulate("click");

    findById("staff").simulate("click");

    wrapper.find("form").simulate("submit");

    expect(updateQuery).toHaveBeenCalledWith({ role: "staff" });
  });

  it("add filters for fields with type 'registration'", () => {
    openFilter("Registration");

    findById("registration-selected-value").first().simulate("click");

    findById("registered").simulate("click");

    wrapper.find("form").simulate("submit");

    expect(updateQuery).toHaveBeenCalledWith({ registration: "registered" });
  });

  it("add filters for fields with type 'status' or unknown", () => {
    openFilter("Account Status");

    findById("status-selected-value").first().simulate("click");

    findById("active").simulate("click");

    wrapper.find("form").simulate("submit");

    expect(updateQuery).toHaveBeenCalledWith({ status: "active" });
  });

  it("add filters for fields with type 'text'", () => {
    openFilter("Email");

    findById("email").simulate("change", { target: { value: "e@e.com" } });

    wrapper.find("form").simulate("submit");

    expect(updateQuery).toHaveBeenCalledWith({ email: "e@e.com" });
  });

  it("add filters for fields with type 'date'", () => {
    openFilter("Start Date");

    wrapper.find("input[name='startDate']").simulate("click");

    wrapper
      .find(".MuiDialogActions-spacing")
      .find("button")
      .at(1)
      .simulate("click");

    wrapper.find("form").simulate("submit");

    expect(updateQuery).toHaveBeenCalledWith({ startDate: expect.any(String) });
  });

  it("clears filters", () => {
    wrapper.setProps({ queries: { emailStatus: "sent" } });

    openFilter("Email Status");

    findById("emailStatus-selected-value").contains("sent");

    findById("modal-clear").simulate("click");

    expect(updateQuery).toHaveBeenCalledWith({ emailStatus: null });
  });

  it("cancels the modal overlay when the 'X' button is clicked", async () => {
    openFilter("Email Status");

    findById("close-modal").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("filters-form")).not.toExist();
    });
  });

  it("cancels the modal overlay when the 'Cancel' button is clicked", async () => {
    openFilter("Email Status");

    findById("modal-cancel").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("filters-form")).not.toExist();
    });
  });
});
