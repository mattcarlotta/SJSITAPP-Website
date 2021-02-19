import * as React from "react";
import { css } from "@emotion/react";
import Popover from "@material-ui/core/Popover";
import Router from "next/router";
import { connect } from "react-redux";
import { IconContext } from "react-icons";
import { FaCogs, FaConciergeBell, FaSignOutAlt } from "react-icons/fa";
import { MdHelpOutline } from "react-icons/md";
import { signoutUserSession } from "~actions/Auth";
import Avatar from "~components/Layout/Avatar";
import Flex from "~components/Layout/Flex";
import MenuButton from "~components/Layout/MenuButton";
import MenuItem from "~components/Layout/MenuItem";
import UserDetails from "~components/Layout/UserDetails";
import Username from "~components/Layout/Username";
import NavLink from "~components/Navigation/NavLink";
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
        <div
          css={css`
            min-width: 220px;
            max-width: 300px;
          `}
        >
          <Flex
            padding="16px"
            style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
          >
            <Avatar avatar={avatar} width="35px" />
            <UserDetails>
              <Username>
                {firstName}&nbsp;{lastName}
              </Username>
              <NavLink
                blue
                marginRight="0"
                padding="0"
                fontSize="14px"
                dataTestId="change-avatar-link"
                href="/employee/settings"
              >
                Change Avatar
              </NavLink>
            </UserDetails>
          </Flex>
          <IconContext.Provider
            value={{
              style: {
                position: "relative",
                top: 2,
                marginRight: 10
              }
            }}
          >
            <MenuItem>
              <MenuButton
                type="button"
                data-testid="contact-us-link"
                style={{ width: "100%" }}
                onClick={() => Router.push("/employee/contact-us")}
              >
                <FaConciergeBell />
                Contact Us
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton
                type="button"
                ddata-testid="help-link"
                style={{ width: "100%" }}
                onClick={() => Router.push("/employee/help")}
              >
                <MdHelpOutline />
                Help
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton
                type="button"
                data-testid="settings-link"
                style={{ width: "100%" }}
                onClick={() => Router.push("/employee/settings")}
              >
                <FaCogs />
                Settings
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton
                type="button"
                data-testid="signout-user"
                style={{ width: "100%" }}
                onClick={signoutUserSession}
              >
                <FaSignOutAlt />
                Signout
              </MenuButton>
            </MenuItem>
          </IconContext.Provider>
        </div>
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
