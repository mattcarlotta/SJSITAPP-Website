import { css } from "@emotion/react";
import { BsPeopleCircle } from "~icons";
import { CSSProperties, FC } from "~types";

export type TAvatarProps = {
  avatar?: string;
  style?: CSSProperties;
  width?: string;
};

const Avatar: FC<TAvatarProps> = ({ avatar, style, width }) => {
  const avatarWidth = width || "27px";

  return (
    <div
      data-testid="avatar"
      css={css`
        width: ${avatarWidth};
        display: inline-block;
        color: #025f6d;
      `}
    >
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

export default Avatar;
