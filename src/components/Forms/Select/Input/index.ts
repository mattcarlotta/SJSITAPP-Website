/* istanbul ignore file */
import styled from "@emotion/styled";

const Input = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  color: #282c34;

  &::placeholder {
    color: #d3dce6;
  }

  &:focus {
    outline: 0;
  }
`;

export default Input;
