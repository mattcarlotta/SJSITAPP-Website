import styled from "@emotion/styled";
import CardBody from "./CardBody";
import CardHead from "./CardHead";
import CardHeadIcon from "./CardHeadIcon";
import CardHeadTitle from "./CardHeadTitle";
import { ReactNode } from "~types";

export type TCardProps = {
  className?: string;
  children: ReactNode;
  dataTestId: string;
  icon?: ReactNode;
  padding?: string;
  title: string | ReactNode;
};

const CardComponent = ({
  className,
  children,
  dataTestId,
  icon,
  padding,
  title
}: TCardProps): JSX.Element => (
  <div data-testid={dataTestId} className={className}>
    <CardHead>
      <CardHeadTitle data-testid="card-head-title">
        {icon && <CardHeadIcon>{icon}</CardHeadIcon>}
        {title}
      </CardHeadTitle>
    </CardHead>
    <CardBody data-testid="card-body" padding={padding}>
      {children}
    </CardBody>
  </div>
);

const Card = styled(CardComponent)<{ margin?: string }>`
  margin: ${({ margin }) => margin || "0px"};
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  position: relative;
  background: #fff;
  border-radius: 10px;
  transition: all 0.3s;
  box-shadow: 0px 2px 1px -1px rgb(0, 0, 0, 0.2),
    0px 1px 1px 0px rgb(0, 0, 0, 0.14), 0px 1px 3px 0px rgb(0, 0, 0, 0.12);
`;

export default Card;
