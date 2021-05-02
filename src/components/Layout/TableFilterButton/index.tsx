import * as React from "react";
import isEmpty from "lodash.isempty";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Popover
} from "@material-ui/core";
import DatePicker from "~components/Forms/DatePicker";
import Input from "~components/Forms/Input";
import Select from "~components/Forms/Select";
import Button from "~components/Layout/Button";
import Center from "~components/Layout/Center";
import CloseModalButton from "~components/Layout/CloseModalButton";
import Flex from "~components/Layout/Flex";
import FlexStart from "~components/Layout/FlexStart";
import Form from "~components/Layout/Form";
import MenuButton from "~components/Layout/MenuButton";
import MenuItem from "~components/Layout/MenuItem";
import Padding from "~components/Layout/Padding";
import {
  ImCheckboxChecked,
  ImCheckboxUnchecked,
  FaTimes,
  IconContext,
  RiFilterFill,
  RiFilterLine
} from "~icons";
import {
  ChangeEvent,
  EventTarget,
  FormEvent,
  ReactElement,
  TFilters,
  TURLQuery
} from "~types";

const useClasses = makeStyles({
  paper: {
    borderRadius: 5
  }
});

export type TTableFilterButtonModalState = {
  name: string;
  selectType?: string;
  title: string;
  type: string;
  value: string;
  isOpen: boolean;
};

export type TTableFilterButtonProps = {
  clearFilters: () => void;
  filters: TFilters;
  queries: TURLQuery;
  queryString: string;
  updateQuery: (nextQuery: TURLQuery) => void;
};

const initalModalState = {
  isOpen: false,
  name: "",
  selectType: "",
  title: "",
  type: "",
  value: ""
};

const TableFilterButton = ({
  clearFilters,
  filters,
  queries,
  updateQuery
}: TTableFilterButtonProps): ReactElement => {
  const classes = useClasses();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [state, setState] = React.useState<TTableFilterButtonModalState>(
    initalModalState
  );
  const { isOpen, name, selectType, type, title, value } = state;

  const handlePopoverOpen = (event: ChangeEvent<any>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = (): void => {
    setAnchorEl(null);
  };

  const handleModalOpen = ({
    name,
    title,
    type,
    selectType
  }: {
    name: string;
    title: string;
    type: string;
    selectType?: string;
  }): void => {
    setState({
      name,
      title,
      type,
      selectType,
      value: queries[name] || "",
      isOpen: true
    });
    handlePopoverClose();
  };

  const handleModalClose = () => {
    setState(prevState => ({
      ...prevState,
      isOpen: false
    }));
  };

  const handleModalClear = (name: string): void => {
    updateQuery({ [name]: null });
    handleModalClose();
  };

  const handleModalChange = ({ target: { value } }: EventTarget): void => {
    setState(prevState => ({
      ...prevState,
      value: value as string
    }));
  };

  const handleModalSubmit = (e: FormEvent): void => {
    e.preventDefault();
    updateQuery({ [name]: value || null });
    handleModalClose();
  };

  const selectOptions = (type?: string): Array<string> => {
    switch (type) {
      case "email":
        return ["sent", "unsent"];
      case "role":
        return ["staff", "member"];
      case "registration":
        return ["registered", "unregistered"];
      default:
        return ["active", "suspended"];
    }
  };

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? "filter-menu" : undefined;

  return (
    <IconContext.Provider
      value={{
        style: {
          position: "relative",
          top: 3,
          marginRight: 5,
          fontSize: 17
        }
      }}
    >
      <FlexStart>
        <Button
          primary
          uppercase
          noGlow
          type="button"
          dataTestId="filter-button"
          padding="7px"
          fontSize="16px"
          margin="0 10px 0 0"
          maxWidth="120px"
          borderRadius="5px"
          onClick={handlePopoverOpen}
        >
          <RiFilterFill />
          Filters
        </Button>
        <Button
          danger
          uppercase
          noGlow
          type="button"
          dataTestId="clear-filters-button"
          fontSize="16px"
          padding="7px"
          margin="0"
          maxWidth="120px"
          borderRadius="5px"
          onClick={clearFilters}
        >
          <RiFilterLine />
          Clear
        </Button>
      </FlexStart>
      <Popover
        id={id}
        open={popoverOpen}
        classes={classes}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Flex
          data-testid="filters-menu"
          width="175px"
          direction="column"
          justify="center"
          style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
        >
          <Center
            style={{
              padding: 10,
              fontSize: 14,
              borderBottom: "1px solid #ddd"
            }}
          >
            Filter by:
          </Center>
          {!isEmpty(filters) &&
            filters.map(props => (
              <MenuItem justify="center" padding="0" key={props.title}>
                <MenuButton
                  display="block"
                  data-testid={`${props.title}-filter`}
                  width="100%"
                  padding="10px 12px"
                  onClick={() => handleModalOpen(props)}
                >
                  <Flex align="center">
                    <Flex justify="flex-start">{props.title}</Flex>
                    <Flex justify="flex-end">
                      {queries[props.name] ? (
                        <ImCheckboxChecked
                          style={{ top: 0, color: "#1890ff" }}
                        />
                      ) : (
                        <ImCheckboxUnchecked style={{ top: 0 }} />
                      )}
                    </Flex>
                  </Flex>
                </MenuButton>
              </MenuItem>
            ))}
        </Flex>
      </Popover>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={isOpen}
        aria-labelledby="filters-dialog-title"
      >
        <Form maxWidth="none" margin="0" onSubmit={handleModalSubmit}>
          <Padding right="10px" bottom="20px" left="10px">
            <DialogTitle id="filters-dialog-title">
              Filter by: {title}
              <CloseModalButton
                data-testid="close-modal"
                aria-label="close modal"
                type="button"
                style={{ top: "10px", right: "20px" }}
                onClick={handleModalClose}
              >
                <FaTimes style={{ margin: 0, fontSize: 20 }} />
              </CloseModalButton>
            </DialogTitle>
            <DialogContent>
              {(() => {
                switch (type) {
                  case "date":
                    return (
                      <DatePicker
                        name={name}
                        value={value || null}
                        onChange={handleModalChange}
                        style={{ width: "100%", marginBottom: 20 }}
                      />
                    );
                  case "select":
                    return (
                      <div style={{ height: 120 }}>
                        <Select
                          name={name}
                          textAlign="center"
                          justifyContent="center"
                          value={value}
                          selectOptions={selectOptions(selectType)}
                          onChange={handleModalChange}
                        />
                      </div>
                    );
                  case "text":
                    return (
                      <Input
                        name={name}
                        type="text"
                        value={value}
                        onChange={handleModalChange}
                        containerStyle={{ height: "auto" }}
                        placeholder="Type here to filter..."
                        inputStyle={{
                          padding: "8px 0 8px 17px",
                          marginBottom: 20
                        }}
                      />
                    );
                  default:
                    return (
                      <div data-testid="not-a-valid-component">
                        Not a valid component
                      </div>
                    );
                }
              })()}
            </DialogContent>
            <DialogActions>
              <Button
                dataTestId="modal-cancel"
                uppercase
                danger
                type="button"
                padding="6px 18px"
                borderRadius="5px"
                maxWidth="115px"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
              <Button
                dataTestId="modal-clear"
                uppercase
                outline
                type="button"
                padding="6px 18px"
                borderRadius="5px"
                maxWidth="110px"
                onClick={() => handleModalClear(name)}
              >
                Clear
              </Button>
              <Button
                dataTestId="modal-submit"
                uppercase
                tertiary
                type="submit"
                padding="6px 18px"
                borderRadius="5px"
                maxWidth="110px"
              >
                Filter
              </Button>
            </DialogActions>
          </Padding>
        </Form>
      </Dialog>
    </IconContext.Provider>
  );
};

export default TableFilterButton;
