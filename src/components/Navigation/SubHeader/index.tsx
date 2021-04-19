import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Link from "~components/Navigation/Link";
import { FaLink } from "~icons";
import stripSpaces from "~utils/stripSpaces";
import { ReactElement } from "~types";

export type TSubHeaderProps = {
  className?: string;
  children: string;
};

const SubHeaderComponent = ({
  className,
  children
}: TSubHeaderProps): ReactElement => {
  const router = useRouter();
  const basePath = router.asPath.split("#")[0];
  const id = stripSpaces(children);

  return (
    <Link
      dataTestId={id}
      border="0"
      padding="0"
      margin="0"
      href={`${basePath}#${id}`}
      shallow
    >
      <h3 className={className} id={id}>
        {children} <FaLink style={{ marginLeft: 5 }} />
      </h3>
    </Link>
  );
};
const SubHeader = styled(SubHeaderComponent)`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0px;
  font-size: 17px;
  color: #282c34;
  text-transform: none;
  font-weight: 500;

  svg {
    opacity: 0;
  }

  :hover {
    color: #0076ff;

    svg {
      opacity: 1;
    }
  }
`;

export default SubHeader;
