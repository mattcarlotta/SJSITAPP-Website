import NextLink from "next/link";
import styled from "@emotion/styled";
import { CSSProperties, ReactNode } from "~types";

export interface ILinkProps {
  children: ReactNode;
  className?: string;
  dataTestId: string;
  href: string;
  replace?: boolean;
  style?: CSSProperties;
}

const LinkComponent = ({
  dataTestId,
  children,
  className,
  href,
  replace
}: ILinkProps) => (
  <NextLink href={href} prefetch={false} replace={replace} passHref>
    <a data-testid={dataTestId} className={className}>
      {children}
    </a>
  </NextLink>
);

const Link = styled(LinkComponent)<{
  borderRadius?: string;
  fontSize?: string;
  hideShadow?: boolean;
  margin?: string;
  padding?: string;
  primary?: boolean;
  width?: string;
}>`
  cursor: pointer;
  color: ${props => (props.primary ? "#025f6d" : "#fff")};
  font-size: ${({ fontSize }) => fontSize || "16px"};
  text-align: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  text-transform: uppercase;
  background-color: transparent;
  border: 2px solid #025f6d;
  box-shadow: ${({ hideShadow }) =>
    !hideShadow && "0 4px 14px 0 rgba(2, 95, 109, 0.39)"};
  padding: ${({ padding }) => padding || "13px 18px"};
  border-radius: ${({ borderRadius }) => borderRadius || "10px"};
  margin: ${({ margin }) => margin || "0px"};
  letter-spacing: 1px;
  width: ${({ width }) => width || "auto"};

  :hover {
    background: #025f6d;
    color: #fff;
    box-shadow: 0px 0px 14px -2px #14d3e2;
    border: 2px solid #3794a5;
  }

  :focus {
    outline: 0;
  }
`;

export default Link;
