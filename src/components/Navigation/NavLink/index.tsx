import styled from "@emotion/styled";
import Link from "next/link";
import { ReactNode, CSSProperties } from "~types";

export interface INavLinkProps {
  children: ReactNode;
  dataTestId: string;
  className?: string;
  href: string;
  style?: CSSProperties;
  target?: string;
}

const NavLinkComponent = ({
  className,
  children,
  dataTestId,
  href,
  style,
  target
}: INavLinkProps): JSX.Element => (
  <Link href={href} prefetch={false} passHref>
    <a
      data-testid={dataTestId}
      style={style}
      className={className}
      target={target}
    >
      {children}
    </a>
  </Link>
);

const NavLink = styled(NavLinkComponent)<{
  blue?: boolean;
  green?: boolean;
  marginRight?: string;
  nounderline?: boolean;
  padding?: string;
  fontSize?: string;
  width?: string;
}>`
  color: ${({ blue, green }) => {
    if (blue) return "#0075e0";
    if (green) return "#025f6d";
    return "#fff";
  }};
  white-space: nowrap;
  text-decoration: none;
  display: block;
  margin-right: ${({ marginRight }) => marginRight || "20px"};
  padding: ${({ padding }) => padding || "8px 16px"};
  transition: all 0.2s ease-in-out;
  border-radius: 4px;
  font-size: ${({ fontSize }) => fontSize || "16px"};
  width: ${({ width }) => width || "auto"};

  &:hover {
    color: ${({ blue, green }) => {
      if (blue) return "#40a9ff";
      if (green) return "#025f6d";
      return "#62c0ce";
    }};
    text-decoration: ${({ nounderline }) =>
      nounderline ? "none" : "underline"};
  }

  &:focus {
    color: ${({ blue, green }) => {
      if (blue) return "#40a9ff";
      if (green) return "#025f6d";
      return "#62c0ce";
    }};
    outline: none;
    border: 0;
  }
`;

export default NavLink;
