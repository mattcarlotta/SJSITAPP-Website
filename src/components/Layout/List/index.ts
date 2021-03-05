import styled from "@emotion/styled";

const List = styled.ul<{
  background?: string;
  borderRadius?: string;
  boxShadow?: string;
  margin?: string;
  padding?: string;
  textAlign?: string;
}>`
  box-shadow: ${({ boxShadow }) => boxShadow || "none"};
  background: ${({ background }) => background || "transparent"};
  border-radius: ${({ borderRadius }) => borderRadius || "0px"};
  list-style: none;
  margin: ${({ margin }) => margin || "0px"};
  padding: ${({ padding }) => padding || "0px"};
  text-align: ${({ textAlign }) => textAlign || "left"};
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export default List;
