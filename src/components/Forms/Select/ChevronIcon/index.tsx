import styled from "@emotion/styled";
import { MdChevronRight } from "~icons";

export type TChevronProps = {
  className?: string;
};

const ChevronComponent = ({ className }: TChevronProps) => (
  <div data-testid="chevron-icon" className={className}>
    <MdChevronRight />
  </div>
);

const Chevron = styled(ChevronComponent)<{ isVisible?: boolean }>`
  display: flex;
  box-sizing: border-box;
  padding: 10px;

  svg {
    vertical-align: middle;
    transform: ${({ isVisible }) =>
      isVisible ? "rotate(90deg)" : "rotate(270deg)"};
    transition: 0.2s ease-in-out;
    transition-property: transform;
  }
`;

export default Chevron;
