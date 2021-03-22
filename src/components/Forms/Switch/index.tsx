import styled from "@emotion/styled";
import { Switch as MuiSwitch } from "@material-ui/core";
import Label from "~components/Forms/Label";
import { EventTarget, CSSProperties } from "~types";

export type TComponentProps = {
  className?: string;
  errors?: string;
  label?: string;
  name?: string;
  onChange: ({ target: { name, value: checked } }: EventTarget) => void;
  value?: boolean;
  style?: CSSProperties;
  tooltip?: string;
};

const SwitchComponent = ({
  className,
  errors,
  label,
  name,
  onChange,
  value,
  style,
  tooltip
}: TComponentProps) => (
  <div data-testid="switch-container" className={className} style={style}>
    <Label name={name} label={label} tooltip={tooltip} />
    <MuiSwitch
      id={name}
      aria-label={name}
      data-testid={name}
      checked={value}
      name={name}
      className={errors ? "has-error" : undefined}
      color="primary"
      inputProps={{ "aria-label": `${name} checkbox` }}
      onChange={({ target: { name, checked } }) =>
        onChange({ target: { name, value: checked } })
      }
    />
  </div>
);

const Switch = styled(SwitchComponent)`
  height: 65px;
  margin-bottom: 15px;
`;

export default Switch;
