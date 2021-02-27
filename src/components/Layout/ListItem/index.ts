import styled from "@emotion/styled";

const ListItem = styled.li<{
  margin?: string;
  team?: string;
  textAlign?: string;
  padding?: string;
}>`
  color: ${({ color }) => color || "#010404"};
  background: ${({ team }) => {
    switch (team) {
      case "San Jose Sharks":
        return "#006d76";
      case "San Jose Barracuda":
        return "#ef512d";
      default:
        return "transparent";
    }
  }};
  margin: ${({ margin }) => margin || "5px 0"};
  text-align: ${({ textAlign }) => textAlign || undefined};
  padding: ${({ padding }) => padding || "0 10px"};
`;

export default ListItem;
