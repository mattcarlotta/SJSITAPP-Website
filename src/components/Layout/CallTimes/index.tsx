import * as React from "react";
import isEmpty from "lodash.isempty";
import FormatDate from "~components/Layout/FormatDate";
import { timestampFormat } from "~utils/dateFormats";
import { ReactElement } from "~types";

const DisplayTime = ({ times }: { times: Array<string> }): ReactElement => (
  <>
    {!isEmpty(times) ? (
      times.map((time, index) => (
        <FormatDate
          key={time}
          date={time}
          format={timestampFormat}
          style={{ marginRight: index < times.length - 1 ? 10 : 0 }}
        />
      ))
    ) : (
      <span>-</span>
    )}
  </>
);

export default React.memo(DisplayTime);
