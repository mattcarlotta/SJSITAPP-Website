import * as React from "react";
import isEmpty from "lodash.isempty";
import FormatDate from "~components/Layout/FormatDate";
import Tooltip from "~components/Layout/Tooltip";
import { timestampFormat } from "~utils/dateFormats";
import { ReactElement } from "~types";

const DisplayCallTimes = ({
  times
}: {
  times: Array<string>;
}): ReactElement => (
  <Tooltip
    title={
      <>
        <div style={{ borderBottom: "1px solid #eee", marginBottom: 3 }}>
          Call Times:
        </div>
        {!isEmpty(times) ? (
          times.map(time => (
            <FormatDate key={time} date={time} format={timestampFormat} />
          ))
        ) : (
          <div>(none)</div>
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
    {times.length}
  </Tooltip>
);

export default React.memo(DisplayCallTimes);
