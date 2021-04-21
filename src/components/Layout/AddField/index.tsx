import styled from "@emotion/styled";
import Padding from "~components/Layout/Padding";
import { FaPlusCircle } from "~icons";

export type TAddFieldProps = {
  className?: string;
  onClick: () => void;
  text: string;
};

const AddFieldComponent = ({
  className,
  onClick,
  text
}: TAddFieldProps): JSX.Element => (
  <button type="button" className={className} onClick={onClick}>
    <FaPlusCircle
      style={{
        position: "relative",
        top: 3,
        fontSize: 16,
        marginRight: 3
      }}
    />
    <Padding as="span" left="5px">
      {text}
    </Padding>
  </button>
);

const AddField = styled(AddFieldComponent)`
  width: 100%;
  cursor: pointer;
  outline: none;
  border: 1px dashed #bfbebe;
  border-radius: 5px;
  text-align: center;
  background: #fff;
  transition: all 0.2s ease-in-out;
  margin-bottom: 20px;
  height: 42px;
  font-size: 16px;

  :hover {
    color: #0075e0;
    border-color: #0075e0;
  }
`;

export default AddField;
