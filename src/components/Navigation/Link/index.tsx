import NextLink from "next/link";
import styled from "@emotion/styled";
import { CSSProperties, ReactNode } from "~types";

export interface ILinkProps {
  children: ReactNode;
  className?: string;
  dataTestId: string;
  href: string;
  replace?: boolean;
  shallow?: boolean;
  style?: CSSProperties;
}

export const LinkComponent = ({
  dataTestId,
  children,
  className,
  href,
  replace,
  shallow,
  style
}: ILinkProps): JSX.Element => (
  <NextLink
    href={href}
    prefetch={false}
    replace={replace}
    shallow={shallow}
    passHref
  >
    <a data-testid={dataTestId} className={className} style={style}>
      {children}
    </a>
  </NextLink>
);

const Link = styled(LinkComponent)<{
  alt?: boolean;
  border?: string;
  borderRadius?: string;
  display?: string;
  fontSize?: string;
  hideShadow?: boolean;
  margin?: string;
  maxWidth?: string;
  padding?: string;
  primary?: boolean;
  secondary?: boolean;
  textTransform?: string;
  width?: string;
}>`
  cursor: pointer;
  display: ${({ display }) => display};
  color: ${({ alt, primary, secondary }) => {
    if (primary) return "#025f6d";
    if (secondary || alt) return "#fff";
    return "#fff";
  }};
  font-size: ${({ fontSize }) => fontSize || "16px"};
  text-align: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  text-transform: ${({ textTransform }) => textTransform || "uppercase"};
  background: ${({ alt, secondary }) => {
    if (alt || secondary) return "#025f6d";
    return "transparent";
  }};
  border: ${({ border, secondary }) => {
    if (border) return border;
    if (secondary) return "2px solid #3794a5";
    return "2px solid #025f6d";
  }};
  box-shadow: ${({ hideShadow }) =>
    !hideShadow ? "0 4px 14px 0 rgba(2, 95, 109, 0.39)" : "none"};
  padding: ${({ padding }) => padding || "13px 18px"};
  border-radius: ${({ borderRadius }) => borderRadius || "10px"};
  margin: ${({ margin }) => margin || "0px"};
  letter-spacing: 1px;
  width: ${({ width }) => width || "auto"};
  max-width: ${({ maxWidth }) => maxWidth};

  :hover {
    background: ${({ alt, secondary }) => {
      if (alt) return "#006d76";
      if (secondary) return "#006d76";
      return "#025f6d";
    }};
    color: #fff;
    box-shadow: ${({ alt, hideShadow }) => {
      if (hideShadow) return "none";
      if (alt) return "0px 0px 14px -2px #14d3e2";
      return "0px 0px 14px -2px #14d3e2";
    }};
    border: ${({ border, alt }) => {
      if (border) return border;
      if (alt) return "2px solid #006d76";
      return "2px solid #3794a5";
    }};
  }

  :focus {
    outline: 0;
  }
`;

export default Link;
