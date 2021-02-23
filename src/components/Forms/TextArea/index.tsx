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
    <Label name={name}>{label}</Label>
    <TextareaAutosize
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
  @media (max-width: 768px) {
    display: block !important;
    width: 100% !important;
  }

  min-height: 230px;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  textarea {
    box-sizing: border-box;
    padding: 10px;
    height: 173px;
    overflow-y: auto;
    width: 100%;
    background: #f5f5f5;
    color: #3a3a3a;
    border: 1px solid ${({ errors }) => (errors ? "#d03916" : "#d3d3d3")};
    border-radius: 4px;
    transition: 0.2s ease-in-out;
    transition-property: color, border;
    resize: none;

    ::placeholder {
      color: #919191;
    }

    :focus {
      outline: 0;
      border: 1px solid #028ddf;
      box-shadow: 0 4px 14px 0 rgba(130, 130, 130, 0.19);
    }
  }
`;

export default TextArea;
