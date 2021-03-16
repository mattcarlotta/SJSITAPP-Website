import styled from "@emotion/styled";

const AppContainer = styled.div<{
  direction?: string;
  hideOverflowX?: boolean;
}>`
  flex-direction: ${({ direction }) => direction || "row"};
  min-height: 100vh;
  display: flex;
  background: #ebebeb;
`;

export default AppContainer;
