import isEmpty from "lodash.isempty";
import styled from "@emotion/styled";
import { makeStyles } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import Errors from "~components/Forms/Errors";
import Label from "~components/Forms/Label";
import Notes from "~components/Layout/Notes";
import Padding from "~components/Layout/Padding";
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
    maxWidth: 410,
    padding: "0 5px"
  }
});

const useButtonStyles = makeStyles(() => ({
  root: {
    color: "#010404",
    width: "100%",
    background: "#fff",
    margin: "10px 0",
    border: "1px solid #ccc !important",
    borderRadius: "50px !important"
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
    data-testid="radio-container"
    className={className}
    style={radioContainerStyle}
  >
    <Label
      name={name}
      label={label}
      tooltip={tooltip}
      style={radioLabelStyle}
    />
    {notes && <Notes notes={notes} />}
    <ToggleButtonGroup
      orientation="vertical"
      aria-label={`${name} group`}
      classes={useGroupStyles()}
      exclusive
      onChange={(_, value) => onChange({ target: { name, value } })}
      value={value}
    >
      {!isEmpty(selectOptions) &&
        selectOptions.map(value => (
          <ToggleButton
            key={value}
            data-testid={value}
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
      <Padding
        left="5px"
        right="5px"
        style={{ maxWidth: 410, margin: "0 auto" }}
      >
        <Errors
          data-testid="errors"
          style={{
            textAlign: "center",
            padding: "11px",
            border: "1px solid transparent",
            background: "#d14023",
            borderRadius: 50,
            color: "#fff",
            fontSize: 18,
            textTransform: "uppercase"
          }}
        >
          {errors}
        </Errors>
      </Padding>
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
