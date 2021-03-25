import Label from "~components/Forms/Label";
import Errors from "~components/Forms/Errors";
import Container from "./Container";
import ClickHandler from "./ClickHandler";
import Selection from "./Selection";
import SelectContainer from "./SelectContainer";
import Options from "./Options";
import { EventTarget, ReactNode } from "~types";

export type TSelectProps = {
  disabled?: boolean;
  errors?: string;
  height?: string;
  isSearchable?: boolean;
  label?: ReactNode;
  name: string;
  onChange: (e: EventTarget) => void;
  placeholder?: string;
  selectOptions: Array<string>;
  value: string;
};

const Select = ({
  disabled,
  errors,
  height,
  name,
  label,
  selectOptions,
  value,
  ...props
}: TSelectProps): JSX.Element => (
  <Container height={height}>
    <Label name={name} label={label} />
    <ClickHandler disabled={disabled} onChange={props.onChange}>
      {handlers => (
        <SelectContainer>
          <Selection
            {...handlers}
            {...props}
            height={height}
            name={name}
            disabled={disabled}
            errors={errors}
            value={value}
          />
          <Options
            {...handlers}
            name={name}
            selectOptions={selectOptions}
            selected={value}
          />
        </SelectContainer>
      )}
    </ClickHandler>
    {errors && <Errors data-testid="errors">{errors}</Errors>}
  </Container>
);

Select.defaultProps = {
  placeholder: "Select an option..."
};

export default Select;
