import Label from "~components/Forms/Label";
import Errors from "~components/Forms/Errors";
import Container from "./Container";
import ClickHandler from "./ClickHandler";
import Selection from "./Selection";
import SelectBox from "./SelectBox";
import SelectContainer from "./SelectContainer";
import Options from "./Options";
import { EventTarget } from "~types";

export type TSelectProps = {
  disabled?: boolean;
  errors?: string;
  name: string;
  label: string;
  placeholder?: string;
  onChange: (e: EventTarget) => void;
  selectOptions: Array<string>;
  value: string;
};

const Select = ({
  disabled,
  errors,
  name,
  label,
  selectOptions,
  value,
  ...props
}: TSelectProps) => (
  <Container>
    <Label name={name} label={label} />
    <ClickHandler disabled={disabled} onChange={props.onChange}>
      {handlers => (
        <SelectContainer>
          <SelectBox>
            <Selection
              {...handlers}
              {...props}
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
          </SelectBox>
        </SelectContainer>
      )}
    </ClickHandler>
    {errors && <Errors data-test="errors">{errors}</Errors>}
  </Container>
);

Select.defaultProps = {
  placeholder: "Select an option..."
};

export default Select;
