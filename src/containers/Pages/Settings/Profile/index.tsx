import * as React from "react";
import { updateUserProfile } from "~actions/Auth";
import EditMemberForm from "~components/Layout/EditMemberForm";
import Flex from "~components/Layout/Flex";
import Line from "~components/Layout/Line";
import MemberDetails from "~components/Layout/MemberDetails";

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
  updateUserProfile: typeof updateUserProfile;
};

const Profile = (props: TProfileProps): JSX.Element => (
  <>
    <Flex flexwrap margin="0 0 20px 0">
      <MemberDetails {...props} />
    </Flex>
    <Line width="550px" />
    <EditMemberForm {...props} />
  </>
);

export default Profile;
