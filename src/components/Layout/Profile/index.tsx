import * as React from "react";
import Button from "~components/Layout/Button";
import Center from "~components/Layout/Center";
import EditMemberForm from "~components/Layout/EditMemberForm";
import FlexCenter from "~components/Layout/FlexCenter";
import PanelDescription from "~components/Layout/PanelDescription";
import Title from "~components/Layout/Title";
import UploadAvatarForm from "~components/Layout/UploadAvatarForm";
import OutsideLink from "~components/Navigation/OutsideLink";
import { FaBan, FaUserPlus } from "~icons";
import type {
  TDeleteUserAvatar,
  TUpdateUserAvatar,
  TUpdateUserProfile
} from "~actions/Auth";
import { ReactElement, TAuthData } from "~types";

export type TProfileProps = {
  id: string;
  avatar?: string;
  editRole?: boolean;
  email: string;
  emailReminders: boolean;
  firstName: string;
  lastName: string;
  registered: string;
  role: string;
  serverError?: string;
  serverMessage?: string;
  status: string;
  deleteUserAvatar: TDeleteUserAvatar | ((id: string) => Promise<void>);
  updateUserAvatar:
    | TUpdateUserAvatar
    | (({ form, id }: { form: FormData; id: string }) => Promise<void>);
  updateUserProfile:
    | TUpdateUserProfile
    | ((paylaod: TAuthData) => Promise<void>);
  updateUserStatus?: (payload: { id: string; status: string }) => void;
};

const Profile = ({
  updateUserStatus,
  ...props
}: TProfileProps): ReactElement => (
  <FlexCenter
    data-testid="member-profile"
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
      {updateUserStatus && (
        <Button
          danger
          dataTestId="update-user-status"
          type="button"
          padding="10px"
          margin="0 auto"
          maxWidth="230px"
          onClick={() =>
            updateUserStatus({ id: props.id, status: props.status })
          }
        >
          {props.status === "active" ? (
            <>
              <FaBan style={{ position: "relative", top: 3 }} /> Suspend
            </>
          ) : (
            <>
              <FaUserPlus style={{ position: "relative", top: 3 }} /> Activate
            </>
          )}
          &nbsp;Member
        </Button>
      )}
    </Center>
    <EditMemberForm {...props} />
  </FlexCenter>
);

export default Profile;
