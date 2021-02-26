import styled from "@emotion/styled";

const ListItem = styled.li<{
  margin?: string;
  team?: string;
  textAlign?: string;
  padding?: string;
}>`
  color: ${({ color }) => color || "#010404"};
  background: ${({ team }) =>
    !team
      ? "transparent"
      : team === "San Jose Sharks"
      ? "linear-gradient(90deg,#194048 0%,#0f7888 50%,#194048 100%)"
      : "linear-gradient(90deg,#8a4133 0%,#f56342 50%,#8a4133 100%)"};
  margin: ${({ margin }) => margin || "5px 0"};
  text-align: ${({ textAlign }) => textAlign || undefined};
  padding: ${({ padding }) => padding || "0px"};
`;

export default ListItem;
