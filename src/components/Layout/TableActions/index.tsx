import * as React from "react";
// import { Popover } from "@material-ui/core";
import Button from "~components/Layout/Button";
import { FaTools } from "~icons";
// import { ChangeEvent,GridValueGetterParams } from "~types";

// params: GridValueGetterParams
const TableActions = (): JSX.Element => {
  return (
    <>
      <Button
        alt
        noGlow
        type="button"
        padding="3px"
        margin="0"
        onClick={() => null}
      >
        <FaTools style={{ position: "relative", top: 2 }} />
      </Button>
    </>
  );
};

export default TableActions;
