import NextLink from "next/link";
import styled from "@emotion/styled";
import { CSSProperties, ReactNode } from "~types";

export interface ILinkProps {
  children: ReactNode;
  className?: string;
  href: string;
  replace?: boolean;
  style?: CSSProperties;
}

const LinkComponent = ({ children, className, href, replace }: ILinkProps) => (
  <NextLink href={href} prefetch={false} replace={replace} passHref>
    <a data-testid="link" className={className}>
      {children}
    </a>
  </NextLink>
);

const Link = styled(LinkComponent)<{ padding?: string; primary?: boolean }>`
  cursor: pointer;
  color: ${props => (props.primary ? "#025f6d" : "#fff")};
  font-size: 18px;
  text-align: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  text-transform: uppercase;
  background-color: transparent;
  border: 2px solid #025f6d;
  box-shadow: 0 4px 14px 0 rgba(2, 95, 109, 0.39);
  padding: ${({ padding }) => padding || "13px 18px"};
  border-radius: 10px;
  margin: 0;
  letter-spacing: 1px;

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
