import * as React from "react";
import { ReactElement, ReactNode } from "~types";

export type TTabelPanelProps = {
  children?: ReactNode;
  index: number;
  value: number;
};

const TabPanel = ({
  children,
  value,
  index,
  ...rest
}: TTabelPanelProps): ReactElement | null =>
  value === index ? (
    <div
      role="tabpanel"
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...rest}
    >
      {value === index && children}
    </div>
  ) : null;

export default TabPanel;
