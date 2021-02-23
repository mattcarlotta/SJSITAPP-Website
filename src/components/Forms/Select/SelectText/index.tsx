import styled from "@emotion/styled";
import { ReactNode } from "~types";

export type TSelectTextComponentProps = {
  className?: string;
  children: ReactNode;
  dataTestId: string;
  handleSelectClick?: () => void;
};

const SelectTextComponent = ({
  className,
  children,
  dataTestId,
  handleSelectClick
}: TSelectTextComponentProps) => (
  <div
    data-testid={dataTestId}
    className={className}
    onClick={handleSelectClick}
  >
    {children}
  </div>
);

const SelectText = styled(SelectTextComponent)`
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  box-sizing: border-box;
  flex: 1 1 0%;
  overflow: hidden;
`;

export default SelectText;
