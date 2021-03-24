import * as React from "react";
import {
  deleteUserAvatar,
  updateUserAvatar,
  updateUserProfile
} from "~actions/Auth";
import Center from "~components/Layout/Center";
import EditMemberForm from "~components/Layout/EditMemberForm";
import FlexCenter from "~components/Layout/FlexCenter";
import MemberDetails from "~components/Layout/MemberDetails";
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
    <Center>
      <PanelDescription>
        Having trouble uploading an avatar? See
        <OutsideLink
          dataTestId="help-change-avatar-link"
          href="/employee/help#how-do-i-change-my-avatar"
        >
          How do I change my avatar?
        </OutsideLink>
      </PanelDescription>
    </Center>
    <MemberDetails {...props} />
    <EditMemberForm {...props} />
  </FlexCenter>
);

export default Profile;
