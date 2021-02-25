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
  title: string | ReactNode;
};

const CardComponent = ({
  className,
  children,
  dataTestId,
  icon,
  title
}: TCardProps): JSX.Element => (
  <div data-testid={dataTestId} className={className}>
    <CardHead>
      <CardHeadTitle>
        {icon && <CardHeadIcon>{icon}</CardHeadIcon>}
        {title}
      </CardHeadTitle>
    </CardHead>
    <CardBody>{children}</CardBody>
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
  border-radius: 2px;
  transition: all 0.3s;
  box-shadow: 0px 0px 0px 3px rgba(35, 207, 234, 0.15);
`;

export default Card;
