import styled from "@emotion/styled";
import { TextareaAutosize } from "@material-ui/core";
import Errors from "~components/Forms/Errors";
import Label from "~components/Forms/Label";
import { ChangeEvent, CSSProperties } from "~types";

export type TComponentProps = {
  className?: string;
  errors?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<any>) => void;
  rows?: number;
  value?: string;
  style?: CSSProperties;
};

const TextAreaComponent = ({
  className,
  errors,
  label,
  name,
  placeholder,
  onChange,
  rows,
  value,
  style
}: TComponentProps) => (
  <div data-testid="textarea-container" className={className} style={style}>
    <Label name={name} label={label} />
    <TextareaAutosize
      id={name}
      aria-label={name}
      data-testid={name}
      className={errors ? "has-error" : undefined}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows || 10}
      tabIndex={0}
      value={value}
    />
    {errors && <Errors data-testid="errors">{errors}</Errors>}
  </div>
);

const TextArea = styled(TextAreaComponent)`
  min-height: 265px;
  margin-bottom: 15px;

  textarea {
    padding: 10px;
    height: 173px;
    font-size: 16px;
    padding-left: 16px;
    width: 100%;
    background: #fff;
    color: #3a3a3a;
    border: 1px solid ${({ errors }) => (errors ? "#d03916" : "#ccc")};
    border-radius: 4px;
    transition: 0.2s ease-in-out;
    transition-property: color, border;
    resize: none;

    ::placeholder {
      color: #ccc;
    }

    :focus {
      outline: 0;
      border: 1px solid #028ddf;
    }
  }
`;

export default TextArea;
