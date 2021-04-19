import Label from "~components/Forms/Label";
import Errors from "~components/Forms/Errors";
import Container from "./Container";
import ClickHandler from "./ClickHandler";
import Selection from "./Selection";
import SelectContainer from "./SelectContainer";
import Options from "./Options";
import { EventTarget, ReactElement, ReactNode } from "~types";

export type TSelectProps = {
  background?: string;
  disabled?: boolean;
  display?: string;
  errors?: string;
  height?: string;
  hoverable?: boolean;
  hideIcon?: boolean;
  isSearchable?: boolean;
  justifyContent?: string;
  label?: ReactNode;
  margin?: string;
  maxWidth?: string;
  name: string;
  padding?: string;
  onChange: (e: EventTarget) => void;
  placeholder?: string;
  selectOptions: Array<string>;
  textAlign?: string;
  value: string;
  width?: string;
};

const Select = ({
  background,
  disabled,
  display,
  errors,
  height,
  hoverable,
  label,
  margin,
  maxWidth,
  name,
  padding,
  selectOptions,
  textAlign,
  value,
  width,
  ...props
}: TSelectProps): ReactElement => (
  <Container
    display={display}
    height={height}
    margin={margin}
    maxWidth={maxWidth}
    width={width}
  >
    <Label name={name} label={label} />
    <ClickHandler disabled={disabled} onChange={props.onChange}>
      {handlers => (
        <SelectContainer
          isVisible={handlers.isVisible}
          errors={errors}
          background={background}
          disabled={disabled}
          hoverable={hoverable}
          value={value}
        >
          <Selection
            {...handlers}
            {...props}
            height={height}
            padding={padding}
            name={name}
            disabled={disabled}
            value={value}
          />
          <Options
            {...handlers}
            padding={padding}
            name={name}
            selectOptions={selectOptions}
            selected={value}
            textAlign={textAlign}
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
