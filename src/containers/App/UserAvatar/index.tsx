import * as React from "react";
import { css } from "@emotion/react";
import { makeStyles, Popover } from "@material-ui/core";
import { connect } from "react-redux";
import { signoutUserSession } from "~actions/Auth";
import Avatar from "~components/Layout/Avatar";
import Divider from "~components/Layout/Divider";
import Flex from "~components/Layout/Flex";
import MenuButton from "~components/Layout/MenuButton";
import Margin from "~components/Layout/Margin";
import MenuItem from "~components/Layout/MenuItem";
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
import {
  ConnectedProps,
  MouseEvent,
  PickReduxState,
  ReactElement
} from "~types";

/* istanbul ignore next */
const mapState = ({ auth }: PickReduxState<"auth">) => ({
  avatar: auth.avatar,
  firstName: auth.firstName,
  lastName: auth.lastName,
  role: auth.role
});

/* istanbul ignore next */
const mapDispatch = {
  signoutUserSession
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type TUserAvatarProps = PropsFromRedux & {
  avatar?: string;
  firstName: string;
  lastName: string;
  role: string;
};

const useClasses = makeStyles({
  paper: {
    borderRadius: 5
  }
});

export const UserAvatar = ({
  avatar,
  firstName,
  lastName,
  role,
  signoutUserSession
}: TUserAvatarProps): ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-settings" : undefined;
  const isMember = role === "member";

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
            <Margin as="div" left="16px">
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
            </Margin>
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
            {isMember && (
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

export default connector(UserAvatar);
