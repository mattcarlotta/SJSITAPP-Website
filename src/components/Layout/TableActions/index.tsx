import * as React from "react";
import get from "lodash.get";
import { Dialog } from "@material-ui/core";
import Button from "~components/Layout/Button";
import Divider from "~components/Layout/Divider";
import Title from "~components/Layout/Title";
import Padding from "~components/Layout/Padding";
import Link from "~components/Navigation/Link";
import { IconContext, FaEdit, FaTools, FaTrash, MdCancel } from "~icons";
import { GridValueGetterParams } from "~types";

export type TTableActionsProps = {
  deleteRecord: (id: string) => Promise<void>;
  edit?: string;
  params: GridValueGetterParams;
};

const TableActions = ({
  deleteRecord,
  edit,
  params
}: TTableActionsProps): JSX.Element => {
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
    deleteRecord(id as string);
  };

  return (
    <>
      <Button
        primary
        noGlow
        type="button"
        padding="3px"
        margin="0"
        maxWidth="50px"
        onClick={handleClick}
      >
        <FaTools style={{ position: "relative", top: 2, fontSize: 16 }} />
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="actions-dialog"
        open={open}
      >
        <Padding
          top="10px"
          left="10px"
          right="10px"
          bottom="20px"
          style={{ minWidth: 200 }}
        >
          <Title centered fontSize="16px">
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
            {edit && (
              <Link
                alt
                display="block"
                dataTestId="edit-record"
                padding="5px"
                fontSize="16px"
                margin="5px 0"
                width="100%"
                href={`/employee/${edit}/edit/${id}`}
              >
                <FaEdit />
                Edit
              </Link>
            )}
            <Button
              danger
              uppercase
              type="button"
              dataTestId="delete-record"
              padding="5px"
              margin="5px 0"
              fontSize="16px"
              borderRadius="10px"
              onClick={handleDeleteClick}
            >
              <FaTrash />
              Delete
            </Button>
            <Button
              tertiary
              uppercase
              type="button"
              dataTestId="delete-record"
              padding="5px"
              margin="5px 0"
              fontSize="16px"
              borderRadius="10px"
              style={{ background: "#010404" }}
              onClick={handleClose}
            >
              <MdCancel />
              Cancel
            </Button>
          </IconContext.Provider>
        </Padding>
      </Dialog>
    </>
  );
};

export default TableActions;
