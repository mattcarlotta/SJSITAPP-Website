import styled from "@emotion/styled";

const OptionsContainer = styled.div<{ hideScrollbar?: boolean }>`
  top: 100%;
  border-radius: 4px;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.39);
  position: absolute;
  width: 100%;
  z-index: 1;
  max-height: 200px;
  overflow-y: auto;
  ${({ hideScrollbar }) =>
    hideScrollbar &&
    `
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }`};
`;

export default OptionsContainer;
