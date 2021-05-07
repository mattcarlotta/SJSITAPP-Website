import * as React from "react";
import get from "lodash.get";
import isEmpty from "lodash.isempty";
import { Dialog } from "@material-ui/core";
import Button from "~components/Layout/Button";
import Divider from "~components/Layout/Divider";
import SlideTransition from "~components/Layout/SlideTransition";
import Title from "~components/Layout/Title";
import Padding from "~components/Layout/Padding";
import Link from "~components/Navigation/Link";
import {
  IconContext,
  FaCheckSquare,
  FaClipboardCheck,
  FaEdit,
  FaSearchPlus,
  FaShareSquare,
  FaTools,
  FaTrash
} from "~icons";
import { GridRowId, GridValueGetterParams, ReactElement } from "~types";

export type TTableActionsProps = {
  disableCheckbox?: boolean;
  handleDeleteRecord: (id: string) => Promise<void>;
  handleDeleteManyClick: () => void;
  handleResendMail: (id: string) => Promise<void>;
  edit?: string;
  params: GridValueGetterParams;
  resend?: boolean;
  schedule?: boolean;
  selectedIds: Array<GridRowId>;
  view?: string;
};

const TableActions = ({
  disableCheckbox,
  handleDeleteRecord,
  handleDeleteManyClick,
  handleResendMail,
  edit,
  params,
  resend,
  schedule,
  selectedIds,
  view
}: TTableActionsProps): ReactElement => {
  const [open, setOpen] = React.useState(false);
  const id = get(params, ["id"]);

  const handleClick = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleDeleteClick = (): void => {
    handleClose();
    handleDeleteRecord(id as string);
  };

  const handleResendMailClick = (): void => {
    handleClose();
    handleResendMail(id as string);
  };

  return (
    <>
      <Button
        primary
        noGlow
        dataTestId="table-actions"
        type="button"
        padding="3px"
        margin="0 auto"
        maxWidth="50px"
        borderRadius="10px"
        onClick={handleClick}
      >
        <FaTools style={{ position: "relative", top: 2, fontSize: 16 }} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="actions-dialog"
        TransitionComponent={SlideTransition}
      >
        <Padding
          data-testid="actions-dialog-overlay"
          top="10px"
          left="20px"
          right="20px"
          bottom="20px"
          style={{ minWidth: 300 }}
        >
          <Title centered fontSize="18px">
            Available Actions
          </Title>
          <Divider />
          <IconContext.Provider
            value={{
              style: {
                position: "relative",
                top: 2,
                marginRight: 5
              }
            }}
          >
            <Padding top="5px" left="5px" right="5px" bottom="5px">
              {view && (
                <Link
                  alt
                  display="block"
                  dataTestId="view-record"
                  padding="8px"
                  fontSize="16px"
                  margin="5px 0"
                  width="100%"
                  href={`/employee/${view}/view/${id}`}
                >
                  <FaSearchPlus />
                  View
                </Link>
              )}
              {edit && (
                <Link
                  alt
                  display="block"
                  dataTestId="edit-record"
                  padding="8px"
                  fontSize="16px"
                  margin="5px 0"
                  width="100%"
                  href={`/employee/${edit}/edit/${id}`}
                >
                  <FaEdit />
                  Edit
                </Link>
              )}
              {schedule && (
                <Link
                  alt
                  display="block"
                  dataTestId="schedule-record"
                  padding="8px"
                  fontSize="16px"
                  margin="5px 0"
                  width="100%"
                  href={`/employee/events/scheduling/${id}`}
                >
                  <FaClipboardCheck />
                  Schedule
                </Link>
              )}
              {resend && (
                <Button
                  primary
                  uppercase
                  type="button"
                  dataTestId="resend-record"
                  padding="8px"
                  margin="5px 0"
                  fontSize="16px"
                  borderRadius="10px"
                  onClick={handleResendMailClick}
                >
                  <FaShareSquare style={{ fontSize: 18 }} />
                  Resend
                </Button>
              )}
              <Button
                danger
                uppercase
                type="button"
                dataTestId="delete-record"
                padding="8px"
                margin="5px 0"
                fontSize="16px"
                borderRadius="10px"
                onClick={handleDeleteClick}
              >
                <FaTrash />
                Delete
              </Button>
              {!disableCheckbox && !isEmpty(selectedIds) && (
                <Button
                  outline
                  uppercase
                  type="button"
                  dataTestId="delete-many-records"
                  padding="8px"
                  margin="5px 0"
                  fontSize="16px"
                  borderRadius="10px"
                  onClick={handleDeleteManyClick}
                >
                  <FaCheckSquare />
                  Delete ({selectedIds.length} Items)
                </Button>
              )}
              <Button
                tertiary
                uppercase
                type="button"
                dataTestId="cancel-actions"
                padding="8px"
                margin="5px 0"
                fontSize="16px"
                borderRadius="10px"
                style={{ background: "#010404", borderColor: "#010404" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Padding>
          </IconContext.Provider>
        </Padding>
      </Dialog>
    </>
  );
};

export default React.memo(TableActions);
