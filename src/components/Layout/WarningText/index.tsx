import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FaExclamationTriangle } from "~icons";
import { CSSProperties, ReactNode } from "~types";

const iconStyle = {
  position: "relative",
  top: 2,
  marginRight: 10
} as CSSProperties;

export type TWaringTextProps = {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
};

const WarningTextComponent = ({
  className,
  children,
  style
}: TWaringTextProps): JSX.Element => (
  <div className={className} style={style}>
    <div>
      <FaExclamationTriangle style={iconStyle} />
    </div>
    <div
      css={css`
        padding: 3px;
      `}
    >
      {children}
    </div>
  </div>
);

const WarningText = styled(WarningTextComponent)<{
  background?: string;
  borderRadius?: string;
  color?: string;
  margin?: string;
  padding?: string;
}>`
  @media (max-width: 400px) {
    flex-direction: column;
  }

  margin: ${({ margin }) => margin || "10px 0"};
  padding: ${({ padding }) => padding || "10px"};
  display: flex;
  align-items: center;
  flex-direction: row;
  background: ${({ background }) => background || "#f56342"};
  border-radius: ${({ borderRadius }) => borderRadius || "10px"};
  font-size: 15px;
  line-height: normal;
  color: ${({ color }) => color || "#fff"};
  text-align: left;
`;

export default WarningText;
