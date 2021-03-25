import isEmpty from "lodash.isempty";
import styled from "@emotion/styled";
import { makeStyles } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import Errors from "~components/Forms/Errors";
import Label from "~components/Forms/Label";
import Notes from "~components/Layout/Notes";
import { CSSProperties, EventTarget, ReactNode } from "~types";

export type TRadioProps = {
  className?: string;
  errors?: string;
  disabled?: boolean;
  inputStyle?: CSSProperties;
  label?: ReactNode;
  name: string;
  notes?: string;
  onChange: ({ target: { name, value } }: EventTarget) => void;
  radioContainerStyle?: CSSProperties;
  radioLabelStyle?: CSSProperties;
  radioStyle?: CSSProperties;
  selectOptions: Array<string>;
  tooltip?: string;
  value: string;
};

const useGroupStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 400,
    background: "#fff"
  }
});

const useButtonStyles = makeStyles(() => ({
  root: {
    color: "#010404"
  },
  selected: {
    background: "#1890ff !important",
    color: "#fff !important"
  },
  disabled: {},
  label: {}
}));

const RadioComponent = ({
  className,
  errors,
  label,
  onChange,
  name,
  notes,
  tooltip,
  radioContainerStyle,
  radioLabelStyle,
  radioStyle,
  selectOptions,
  value
}: TRadioProps): JSX.Element => (
  <div
    data-testid="textarea-container"
    className={className}
    style={radioContainerStyle}
  >
    <Label
      name={name}
      label={label}
      tooltip={tooltip}
      style={radioLabelStyle}
    />
    {notes && <Notes className="ap-form-note" notes={notes} />}
    <ToggleButtonGroup
      orientation="vertical"
      aria-label="event group"
      className={useGroupStyles().root}
      exclusive
      onChange={(_, value) => onChange({ target: { name, value } })}
      value={value}
    >
      {!isEmpty(selectOptions) &&
        selectOptions.map(value => (
          <ToggleButton
            key={value}
            classes={useButtonStyles()}
            aria-label={value}
            style={radioStyle}
            value={value}
          >
            <span className="radio-value">{value}</span>
          </ToggleButton>
        ))}
    </ToggleButtonGroup>
    {errors && (
      <Errors
        data-testid="errors"
        style={{
          textAlign: "center",
          maxWidth: 400,
          margin: "0 auto",
          padding: "11px",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          background: "#d14023"
        }}
      >
        {errors}
      </Errors>
    )}
  </div>
);

const Radio = styled(RadioComponent)`
  background-color: #f5f5f5;
  margin-bottom: 0;
  padding-bottom: 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

export default Radio;
