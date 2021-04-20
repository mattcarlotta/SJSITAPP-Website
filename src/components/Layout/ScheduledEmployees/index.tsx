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
      <>
        <div style={{ borderBottom: "1px solid #eee", marginBottom: 3 }}>
          Scheduled Employees:
        </div>
        {!isEmpty(employees) ? (
          employees.map(({ _id, firstName, lastName }) => (
            <div key={_id}>
              &#183; {firstName} {lastName}
            </div>
          ))
        ) : (
          <span>(none)</span>
        )}
      </>
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
