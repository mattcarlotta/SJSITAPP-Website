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

const NavLink = styled(NavLinkComponent)<{ blue?: boolean }>`
  color: ${({ blue }) => (blue ? "#0075e0" : "#fff")};
  white-space: nowrap;
  text-decoration: none;
  margin-right: 20px;
  padding: 8px 16px;
  transition: all 0.2s ease-in-out;
  border-radius: 4px;

  &:hover {
    color: ${({ blue }) => (blue ? "#40a9ff" : "#62c0ce")};
    text-decoration: underline;
  }

  &:focus {
    color: ${({ blue }) => (blue ? "#40a9ff" : "#62c0ce")};
    outline: none;
    border: 0;
  }
`;

export default NavLink;
