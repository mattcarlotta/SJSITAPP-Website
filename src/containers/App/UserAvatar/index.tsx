import * as React from "react";
import Popover from "@material-ui/core/Popover";
import { connect } from "react-redux";
import { signoutUserSession } from "~actions/Auth";
import Avatar from "~components/Layout/Avatar";
import MenuButton from "~components/Layout/MenuButton";
import { FC, TRootState } from "~types";

export type TUserAvatarProps = {
  avatar?: string;
  firstName: string;
  lastName: string;
  signoutUserSession: typeof signoutUserSession;
};

const UserAvatar: FC<TUserAvatarProps> = ({
  avatar,
  firstName,
  lastName,
  signoutUserSession
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <MenuButton
        aria-describedby={id}
        data-testid="account-dropdown"
        hoverable
        onClick={handleClick}
      >
        <Avatar avatar={avatar} />
      </MenuButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <span className="firstname">{firstName}</span>
        <span className="lastname">&nbsp;{lastName}</span>
        <button type="button" onClick={signoutUserSession}>
          Signout
        </button>
      </Popover>
    </>
  );
};

/* istanbul ignore next */
const mapStateToProps = ({ auth }: Pick<TRootState, "auth">) => ({
  avatar: auth.avatar,
  firstName: auth.firstName,
  lastName: auth.lastName
});

/* istanbul ignore next */
const mapDispatchToProps = {
  signoutUserSession
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar);
