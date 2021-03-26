import * as React from "react";
import { css } from "@emotion/react";
import { Popover } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { signoutUserSession } from "~actions/Auth";
import Avatar from "~components/Layout/Avatar";
import Divider from "~components/Layout/Divider";
import Flex from "~components/Layout/Flex";
import MenuButton from "~components/Layout/MenuButton";
import MenuItem from "~components/Layout/MenuItem";
import UserDetails from "~components/Layout/UserDetails";
import Username from "~components/Layout/Username";
import MenuLink from "~components/Navigation/MenuLink";
import NavLink from "~components/Navigation/NavLink";
import {
  IconContext,
  BsChatQuote,
  FaCogs,
  FaReply,
  FaUserClock,
  MdHelpOutline,
  RiLogoutBoxLine
} from "~icons";
import { MouseEvent, TRootState } from "~types";

export type TUserAvatarProps = {
  avatar?: string;
  firstName: string;
  lastName: string;
  role: string;
  signoutUserSession: typeof signoutUserSession;
};

const useClasses = makeStyles(() => ({
  paper: {
    borderRadius: 5
  }
}));

export const UserAvatar = ({
  avatar,
  firstName,
  lastName,
  role,
  signoutUserSession
}: TUserAvatarProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = React.useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "user-settings" : undefined;
  const isEmployee = role === "employee";

  return (
    <>
      <MenuButton
        primary
        aria-describedby={id}
        data-testid="account-dropdown"
        hoverable
        padding="4px"
        onClick={handleClick}
      >
        <Avatar avatar={avatar} />
      </MenuButton>
      <Popover
        id={id}
        open={open}
        classes={useClasses()}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
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
            data-testid="user-menu"
            padding="16px"
            style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
          >
            <Avatar avatar={avatar} width="35px" />
            <UserDetails>
              <Username data-testid="users-name">
                {firstName}&nbsp;{lastName}
              </Username>
              <NavLink
                blue
                marginRight="0"
                padding="0"
                fontSize="13px"
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
                marginRight: 10,
                fontSize: 17
              }
            }}
          >
            <MenuItem>
              <MenuLink
                dataTestId="contact-us-link"
                href="/employee/contact-us"
              >
                <BsChatQuote />
                Contact Us
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink dataTestId="help-link" href="/employee/help">
                <MdHelpOutline />
                Help
              </MenuLink>
            </MenuItem>
            {isEmployee && (
              <>
                <MenuItem>
                  <MenuLink
                    dataTestId="settings-availability-link"
                    href="/employee/settings?tab=availability"
                  >
                    <FaUserClock />
                    My Availability
                  </MenuLink>
                </MenuItem>
                <MenuItem>
                  <MenuLink
                    dataTestId="settings-responses-link"
                    href="/employee/settings?tab=responses"
                  >
                    <FaReply />
                    My Responses
                  </MenuLink>
                </MenuItem>
              </>
            )}
            <MenuItem>
              <MenuLink
                dataTestId="settings-profile-link"
                href="/employee/settings?tab=profile"
              >
                <FaCogs />
                Settings
              </MenuLink>
            </MenuItem>
            <Divider />
            <MenuItem>
              <MenuButton
                type="button"
                data-testid="signout-user"
                style={{ width: "100%" }}
                margin="0 0 3px 0"
                onClick={signoutUserSession}
              >
                <RiLogoutBoxLine />
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
  lastName: auth.lastName,
  role: auth.role
});

/* istanbul ignore next */
const mapDispatchToProps = {
  signoutUserSession
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar);
