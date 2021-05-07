import styled from "@emotion/styled";

const ListItem = styled.li<{
  background?: string;
  breakpoint?: boolean;
  color?: string;
  display?: string;
  margin?: string;
  team?: string;
  textAlign?: string;
  padding?: string;
}>`
  ${({ breakpoint }) =>
    breakpoint &&
    `@media (max-width: 500px) {
      padding: 0px;
      margin: 5px 0;
    }
  `};

  display: ${({ display }) => display || "block"};
  color: ${({ color }) => color || "#010404"};
  background: ${({ background, team }) => {
    switch (team) {
      case "San Jose Sharks":
        return "#006d76";
      case "San Jose Barracuda":
        return "#ef512d";
      default:
        return background || "transparent";
    }
  }};
  margin: ${({ margin }) => margin || "10px 0"};
  text-align: ${({ textAlign }) => textAlign || undefined};
  padding: ${({ padding }) => padding || "0 10px"};
`;

export default ListItem;
