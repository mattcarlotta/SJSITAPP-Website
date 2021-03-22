import { updateUserProfile } from "~actions/Auth";
import EditMemberForm from "~components/Layout/EditMemberForm";
import Padding from "~components/Layout/Padding";

export type TProfileProps = {
  id: string;
  avatar: string;
  email: string;
  emailReminders: boolean;
  firstName: string;
  lastName: string;
  role: string;
  serverError?: string;
  serverMessage?: string;
  updateUserProfile: typeof updateUserProfile;
};

const Profile = (props: TProfileProps): JSX.Element => (
  <Padding top="10px" left="10px" right="10px" bottom="40px">
    <EditMemberForm {...props} />
  </Padding>
);

export default Profile;
