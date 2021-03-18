import styled from "@emotion/styled";
import { CSSProperties, ReactNode } from "~types";

export type TOutsideLinkProps = {
  className?: string;
  children: string | ReactNode;
  dataTestId?: string;
  href: string;
  style?: CSSProperties;
};

const OutsideLinkComponent = ({
  className,
  children,
  dataTestId,
  href,
  style
}: TOutsideLinkProps): JSX.Element => (
  <a
    aria-label="link to outside source"
    data-testid={dataTestId}
    className={className}
    href={href}
    rel="noopener noreferrer"
    target="_blank"
    style={style}
  >
    {children}
  </a>
);

const OutsideLink = styled(OutsideLinkComponent)`
  padding: 0 3px;
  color: #0077cc;
  transition: all 0.5s;
  text-decoration: none;
  cursor: pointer;

  :hover {
    color: #0077cc;
    text-decoration: underline;
  }

  :focus {
    color: #0077cc;
    outline: none !important;
  }
`;

export default OutsideLink;
