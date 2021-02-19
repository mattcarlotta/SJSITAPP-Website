import { css } from "@emotion/react";
import { FaUserCircle } from "react-icons/fa";
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
      id="display-avatar"
      css={css`
        width: ${avatarWidth};
        display: inline-block;
        color: #025f6d;
      `}
    >
      {avatar ? (
        <img
          css={`
            width: ${avatarWidth};
            border-radius: 50%;
          `}
          src={`${process.env.NEXT_PUBLIC_IMAGEAPI}/uploads/${avatar}`}
          alt="avatar"
          style={style}
        />
      ) : (
        <FaUserCircle
          style={{ verticalAlign: "middle", fontSize: avatarWidth }}
        />
      )}
    </div>
  );
};

export default Avatar;
