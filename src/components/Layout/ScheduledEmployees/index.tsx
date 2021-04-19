import * as React from "react";
import isEmpty from "lodash.isempty";
import Tooltip from "~components/Layout/Tooltip";
import { ReactElement, TEmployeeIds } from "~types";

const ScheduledEmployees = ({
  employees
}: {
  employees: TEmployeeIds;
}): ReactElement => (
  <Tooltip
    title={
      !isEmpty(employees) ? (
        employees.map(({ _id, firstName, lastName }) => (
          <span key={_id} style={{ margin: 0, padding: 0 }}>
            &#183; {firstName} {lastName}
          </span>
        ))
      ) : (
        <span>(none)</span>
      )
    }
    placement="top"
    styles={{
      width: "100%",
      maxWidth: 400,
      textAlign: "center"
    }}
  >
    {employees.length}
  </Tooltip>
);

export default React.memo(ScheduledEmployees);
