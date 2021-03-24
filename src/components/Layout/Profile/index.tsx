import * as React from "react";
import {
  deleteUserAvatar,
  updateUserAvatar,
  updateUserProfile
} from "~actions/Auth";
import Center from "~components/Layout/Center";
import EditMemberForm from "~components/Layout/EditMemberForm";
import FlexCenter from "~components/Layout/FlexCenter";
import Title from "~components/Layout/Title";
import UploadAvatarForm from "~components/Layout/UploadAvatarForm";
import OutsideLink from "~components/Navigation/OutsideLink";
import PanelDescription from "../PanelDescription";

export type TProfileProps = {
  id: string;
  avatar: string;
  email: string;
  emailReminders: boolean;
  firstName: string;
  lastName: string;
  registered: string;
  role: string;
  serverError?: string;
  serverMessage?: string;
  status: string;
  deleteUserAvatar: typeof deleteUserAvatar;
  updateUserAvatar: typeof updateUserAvatar;
  updateUserProfile: typeof updateUserProfile;
};

const Profile = (props: TProfileProps): JSX.Element => (
  <FlexCenter
    justify="center"
    direction="column"
    margin="20px auto"
    height="auto"
  >
    <UploadAvatarForm {...props} />
    <Title data-testid="user-name" centered fontSize="36px" margin="0">
      {props.firstName} {props.lastName}
    </Title>
    <Center>
      <PanelDescription margin="5px 0 10px 0">
        Having trouble uploading an avatar? Click
        <OutsideLink
          dataTestId="help-change-avatar-link"
          href="/employee/help#how-do-i-change-my-avatar"
        >
          here
        </OutsideLink>
        for help.
      </PanelDescription>
    </Center>
    <EditMemberForm {...props} />
  </FlexCenter>
);

export default Profile;
