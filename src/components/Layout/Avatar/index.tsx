import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { BsPeopleCircle } from "~icons";
import { CSSProperties } from "~types";

export type TAvatarProps = {
  avatar?: string;
  className?: string;
  primary?: boolean;
  style?: CSSProperties;
  width?: string;
};

const AvatarComponent = ({
  avatar,
  className,
  style,
  width
}: TAvatarProps): JSX.Element => {
  const avatarWidth = width || "27px";

  return (
    <div data-testid="avatar" className={className}>
      {avatar ? (
        <img
          css={css`
            width: ${avatarWidth};
            border-radius: 50%;
          `}
          src={`${process.env.NEXT_PUBLIC_IMAGEAPI}/uploads/${avatar}`}
          alt="avatar"
          style={style}
        />
      ) : (
        <BsPeopleCircle
          style={{ verticalAlign: "middle", fontSize: avatarWidth }}
        />
      )}
    </div>
  );
};

const Avatar = styled(AvatarComponent)<{ primary?: boolean; width?: string }>`
  display: inline-block;
  color: ${({ primary }) => (primary ? "#efefef" : "#025f6d")};
  width: ${({ width }) => width || "27px"};
  transition: all 300ms;
`;

export default Avatar;
