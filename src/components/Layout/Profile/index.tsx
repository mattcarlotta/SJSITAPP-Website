import * as React from "react";
import { updateUserAvatar, updateUserProfile } from "~actions/Auth";
import EditMemberForm from "~components/Layout/EditMemberForm";
import FlexCenter from "~components/Layout/FlexCenter";
import MemberDetails from "~components/Layout/MemberDetails";
import UploadAvatarForm from "~components/Layout/UploadAvatarForm";

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
  updateUserAvatar: typeof updateUserAvatar;
  updateUserProfile: typeof updateUserProfile;
};

const Profile = (props: TProfileProps): JSX.Element => (
  <FlexCenter justify="center" direction="column" margin="20px auto">
    <UploadAvatarForm {...props} />
    <MemberDetails {...props} />
    <EditMemberForm {...props} />
  </FlexCenter>
);

export default Profile;
