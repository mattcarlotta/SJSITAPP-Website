import * as React from "react";
// import { css } from "@emotion/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Popover
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Input from "~components/Forms/Input";
import Button from "~components/Layout/Button";
// import Divider from "~components/Layout/Divider";
import Flex from "~components/Layout/Flex";
import FlexStart from "~components/Layout/FlexStart";
import MenuButton from "~components/Layout/MenuButton";
// import Margin from "~components/Layout/Margin";
import MenuItem from "~components/Layout/MenuItem";
import { IconContext, MdFilterList, MdRemoveCircle } from "~icons";
import { ChangeEvent, EventTarget, TURLQuery } from "~types";

const useClasses = makeStyles({
  paper: {
    borderRadius: 5
  }
});

export type TTableFilterButtonModalState = {
  title: string;
  value: string;
  isOpen: boolean;
};

export type TTableFilterButtonProps = {
  clearFilters: () => void;
  queries: TURLQuery;
  queryString: string;
  updateQuery: (nextQuery: TURLQuery) => void;
};

const initalModalState = {
  isOpen: false,
  title: "",
  value: ""
};

const TableFilterButton = ({
  clearFilters,
  queries,
  // queryString,
  updateQuery
}: TTableFilterButtonProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [state, setState] = React.useState<TTableFilterButtonModalState>(
    initalModalState
  );
  const { isOpen, title, value } = state;

  const handleModalOpen = (title: string): void => {
    setState({
      title,
      value: queries[title] || "",
      isOpen: true
    });
    setAnchorEl(null);
  };

  const handleModalClose = () => {
    setState(prevState => ({
      ...prevState,
      isOpen: false
    }));
  };

  const handleModalChange = ({ target: { value } }: EventTarget): void => {
    setState(prevState => ({
      ...prevState,
      value: value as string
    }));
  };

  const handleModalSubmit = ({
    title,
    value
  }: {
    title: string;
    value: string | null;
  }): void => {
    updateQuery({ [title]: value || null });
    setState(initalModalState);
    setAnchorEl(null);
  };

  const handlePopoverOpen = (event: ChangeEvent<any>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = (): void => {
    setAnchorEl(null);
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
          fontSize: 18
        }
      }}
    >
      <FlexStart>
        <Button
          primary
          uppercase
          type="button"
          dataTestId="filter-button"
          padding="7px"
          fontSize="16px"
          margin="0 10px 0 0"
          maxWidth="120px"
          borderRadius="5px"
          onClick={handlePopoverOpen}
        >
          <MdFilterList /> Filters
        </Button>
        <Button
          primary
          uppercase
          type="button"
          dataTestId="clear-filters-button"
          fontSize="16px"
          padding="7px"
          margin="0"
          maxWidth="200px"
          borderRadius="5px"
          onClick={clearFilters}
        >
          <MdRemoveCircle /> Clear Filters
        </Button>
      </FlexStart>
      <Popover
        id={id}
        open={popoverOpen}
        classes={useClasses()}
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
          width="120px"
          direction="column"
          justify="start"
          style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
        >
          <MenuItem>
            <MenuButton
              data-test-id="season-id-filter"
              width="100%"
              onClick={() => handleModalOpen("seasonId")}
            >
              Season Id
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton
              data-test-id="start-date-filter"
              width="100%"
              onClick={() => handleModalOpen("startDate")}
            >
              Start Date
            </MenuButton>
          </MenuItem>
        </Flex>
      </Popover>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={isOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Filter by: {title}</DialogTitle>
        <DialogContent>
          <Input
            name={title}
            type="text"
            value={value}
            onChange={handleModalChange}
            containerStyle={{ height: "auto" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            dataTestId="modal-cancel"
            danger
            type="button"
            borderRadius="5px"
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button
            dataTestId="modal-submit"
            tertiary
            type="button"
            borderRadius="5px"
            onClick={() => handleModalSubmit({ title, value })}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </IconContext.Provider>
  );
};

export default TableFilterButton;
