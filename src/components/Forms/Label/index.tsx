import styled from "@emotion/styled";
import Tooltip from "~components/Layout/Tooltip";
import { GoQuestion } from "~icons";
import { CSSProperties } from "~types";

export type TLabelProps = {
  className?: string;
  name?: string;
  label?: any;
  style?: CSSProperties;
  tooltip?: string;
};

const LabelComponent = ({
  className,
  name,
  label,
  style,
  tooltip
}: TLabelProps): JSX.Element => (
  <label className={className} style={style} htmlFor={name}>
    {label}
    {tooltip && (
      <Tooltip title={tooltip}>
        <GoQuestion />
      </Tooltip>
    )}
  </label>
);

const Label = styled(LabelComponent)`
  color: #010404;
  display: block;
  margin-bottom: 10px;
  line-height: 16px;
  font-size: 16px;

  & .tooltip {
    margin-left: 5px;

    svg {
      font-size: 16px;
      color: #bbb !important;
      position: relative;
      top: 0;
      left: 0;

      &:hover {
        color: #282c34 !important;
      }
    }
  }
`;

export default Label;
