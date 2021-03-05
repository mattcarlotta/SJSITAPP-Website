import styled from "@emotion/styled";
import { FaExclamationTriangle } from "~icons";
import { CSSProperties, ReactNode } from "~types";

const iconStyle = {
  position: "relative",
  top: 2,
  marginRight: 5
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
  <span className={className} style={style}>
    <FaExclamationTriangle style={iconStyle} /> {children}
  </span>
);

const WarningText = styled(WarningTextComponent)<{
  background?: string;
  borderRadius?: string;
  color?: string;
  margin?: string;
  padding?: string;
}>`
  margin: ${({ margin }) => margin || "20px 0"};
  padding: ${({ padding }) => padding || "10px"};
  display: block;
  background: ${({ background }) => background || "#f56342"};
  border-radius: ${({ borderRadius }) => borderRadius || "0px"};
  font-weight: bold;
  font-size: 15px;
  color: ${({ color }) => color || "#fff"};
  text-align: center;
`;

export default WarningText;
