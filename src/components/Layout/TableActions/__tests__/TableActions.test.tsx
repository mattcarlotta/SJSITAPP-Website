import { mount, ReactWrapper } from "enzyme";
import { GridValueGetterParams } from "~types";
import waitFor from "~utils/waitFor";
import TableFilterButton from "../index";

const handleDeleteRecord = jest.fn();
const handleDeleteManyClick = jest.fn();
const handleResendMail = jest.fn();

const initProps = {
  disableCheckbox: false,
  handleDeleteRecord,
  handleDeleteManyClick,
  handleResendMail,
  edit: "events",
  params: { id: "88" } as GridValueGetterParams,
  resend: true,
  schedule: true,
  selectedIds: [],
  view: "events"
};

describe("Table Actions Button", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<TableFilterButton {...initProps} />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  afterEach(() => {
    handleDeleteRecord.mockClear();
    handleDeleteManyClick.mockClear();
    handleResendMail.mockClear();
  });

  it("initially renders just a tables action button", () => {
    expect(findById("table-actions")).toExist();
    expect(findById("actions-dialog-overlay")).not.toExist();
  });

  it("opens a modal when a table action button is clicked", () => {
    findById("table-actions").simulate("click");

    expect(findById("actions-dialog-overlay")).toExist();
  });

  it("renders a 'View' link that will view the selected record when clicked", () => {
    findById("table-actions").simulate("click");

    expect(findById("actions-dialog-overlay")).toExist();

    const ViewLink = findById("view-record").first();

    expect(ViewLink).toExist();
    expect(ViewLink.prop("href")).toEqual("/employee/events/view/88");
  });

  it("renders an 'Edit' link that will edit the selected record when clicked", () => {
    findById("table-actions").simulate("click");

    expect(findById("actions-dialog-overlay")).toExist();

    const EditLink = findById("edit-record").first();

    expect(EditLink).toExist();
    expect(EditLink.prop("href")).toEqual("/employee/events/edit/88");
  });

  it("renders a 'Schedule' link that will schedule the selected record when clicked", () => {
    findById("table-actions").simulate("click");

    expect(findById("actions-dialog-overlay")).toExist();

    const ScheduleLink = findById("schedule-record").first();

    expect(ScheduleLink).toExist();
    expect(ScheduleLink.prop("href")).toEqual("/employee/events/scheduling/88");
  });

  it("renders a 'Resend' button that will resend an email for the selected record when clicked", () => {
    findById("table-actions").simulate("click");

    expect(findById("actions-dialog-overlay")).toExist();

    const ResendButton = findById("resend-record").first();
    expect(ResendButton).toExist();

    ResendButton.simulate("click");

    expect(handleResendMail).toHaveBeenCalledWith("88");
  });

  it("renders a 'Delete' button that will delete the selected record when clicked", () => {
    findById("table-actions").simulate("click");

    expect(findById("actions-dialog-overlay")).toExist();

    const DeleteButton = findById("delete-record").first();
    expect(DeleteButton).toExist();

    DeleteButton.simulate("click");

    expect(handleDeleteRecord).toHaveBeenCalledWith("88");
  });

  it("renders a 'Delete Many' button that will delete the selected records when clicked", () => {
    wrapper.setProps({ selectedIds: ["88"] });

    findById("table-actions").simulate("click");

    expect(findById("actions-dialog-overlay")).toExist();

    const DeleteManyButton = findById("delete-many-records").first();
    expect(DeleteManyButton).toExist();

    DeleteManyButton.simulate("click");

    expect(handleDeleteManyClick).toHaveBeenCalledTimes(1);
  });

  it("renders a 'Cancel' button that close the overlay menu", async () => {
    findById("table-actions").simulate("click");

    expect(findById("actions-dialog-overlay")).toExist();

    const CancelButton = findById("cancel-actions").first();
    expect(CancelButton).toExist();

    CancelButton.simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("actions-dialog-overlay")).not.toExist();
    });
  });
});
