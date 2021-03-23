import * as React from "react";

export type TTabelPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

const TabPanel = ({
  children,
  value,
  index,
  ...rest
}: TTabelPanelProps): JSX.Element => (
  <>
    {value === index ? (
      <div
        role="tabpanel"
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...rest}
      >
        {value === index && children}
      </div>
    ) : null}
  </>
);

export default TabPanel;
