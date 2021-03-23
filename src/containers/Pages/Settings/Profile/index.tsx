import { updateUserProfile } from "~actions/Auth";
import EditMemberForm from "~components/Layout/EditMemberForm";

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
  <EditMemberForm {...props} />
);

export default Profile;
