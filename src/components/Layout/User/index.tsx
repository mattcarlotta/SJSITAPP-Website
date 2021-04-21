import styled from "@emotion/styled";

const responseColor = (response: string): string => {
  switch (response) {
    case "I want to work.": {
      return "background-color: #247BA0;color: #fff;";
    }
    case "Available to work.": {
      return "background-color: #2A9D8F;color: #fff;";
    }
    case "Prefer not to work.": {
      return "background-color: #F4A261;color: #fff;"; // 2A9D8F
    }
    case "Not available to work.": {
      return "background-color: #FF8060;color: #fff;";
    }
    default: {
      return "background-color: #BFBFBF;color: #7c7c7c;"; // F4A261
    }
  }
};

const User = styled.div<{ isDragging?: boolean; response: string }>`
  font-size: 13px;
  box-shadow: ${({ isDragging }) =>
    isDragging
      ? "0px 10px 13px -7px #8433FF,5px 5px 5px -2px #8433FF"
      : "0 1px 0 rgba(9,30,66,.25)"};
  color: ${({ isDragging }) => (isDragging ? "#fff" : "#fff")};
  padding: 10px;
  cursor: pointer;
  border-radius: 3px;
  margin-bottom: 5px;
  text-align: center;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  ${({ isDragging, response }) =>
    isDragging
      ? "background-color: #03a9f3;color: #fff;"
      : responseColor(response)};
`;

export default User;
