import styled from "@emotion/styled";
import { ChangeEvent, KeyboardEvent } from "~types";

export type TOptionProps = {
  className?: string;
  onClick: (e: ChangeEvent<any>) => void;
  onKeyPress: (e: KeyboardEvent<any>) => void;
  name: string;
  value: string;
};

const OptionComponent = ({
  className,
  onClick,
  onKeyPress,
  name,
  value
}: TOptionProps) => (
  <div
    id={value}
    tabIndex={0}
    className={className}
    data-name={name}
    data-testid={value}
    data-value={value}
    onClick={onClick}
    onKeyPress={onKeyPress}
  >
    {value}
  </div>
);

const Option = styled(OptionComponent)<{ selected?: string; value?: string }>`
  cursor: pointer;
  color: ${({ selected, value }) =>
    selected === value ? "#0f7ae5" : "#282c34"};
  background: ${({ selected, value }) =>
    selected === value ? "#f3f3f3" : "#fff"};
  display: block;
  word-break: break-word;
  font-size: 16px;
  padding: 8px 22px;
  width: 100%;
  font-weight: normal;
  user-select: none;
  border: 1px solid transparent;
  text-align: left;
  transition: all 200ms ease-in-out;
  font-weight: ${({ selected, value }) =>
    selected === value ? 600 : "normal"};

  &:hover {
    color: ${({ selected, value }) =>
      selected !== value || !value ? "#282c34" : "#0f7ae5"};
    background: #e6f7ff;
    outline: 0;
    border: 1px solid transparent;
  }

  &:focus {
    color: ${({ selected, value }) =>
      selected !== value || !value ? "#282c34" : "#0f7ae5"};
    background: #e6f7ff;
    outline: 0;
  }
`;

export default Option;
