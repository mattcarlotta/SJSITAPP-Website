import NextLink from "next/link";
import styled from "@emotion/styled";
import { CSSProperties, ReactNode } from "~types";

export interface IMenuILinkProps {
  children: ReactNode;
  dataTestId: string;
  className?: string;
  href: string;
  style?: CSSProperties;
}

const MenuLinkComponent = ({
  children,
  className,
  dataTestId,
  href
}: IMenuILinkProps) => (
  <NextLink href={href} prefetch={false} passHref>
    <a data-testid={dataTestId} className={className}>
      {children}
    </a>
  </NextLink>
);

const MenuLink = styled(MenuLinkComponent)<{
  hoverable?: boolean;
  fontSize?: string;
  padding?: string;
  width?: string;
}>`
  cursor: pointer;
  color: #025f6d;
  background-color: transparent;
  transition: color 0.2s ease-in-out, background 0.2s ease-in-out,
    border 0.2s ease-in-out;
  border-radius: 50px;
  border: 2px solid transparent;
  padding: ${({ padding }) => padding || "8px"};
  font-size: ${({ fontSize }) => fontSize || "15px"};
  text-align: left;
  display: flex;
  align-items: center;
  text-decoration: none;
  width: ${({ width }) => width || "100%"};

  :hover {
    color: #025f6d;
    background-color: ${({ hoverable }) =>
      hoverable ? "#d8d8d8" : "transparent"};
    border: 2px solid transparent;
  }

  :focus {
    outline: 0;
  }
`;

export default MenuLink;
