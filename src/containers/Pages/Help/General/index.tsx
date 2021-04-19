import * as React from "react";
import { css } from "@emotion/react";
import Accordion from "~components/Layout/Accordion";
import Avatar from "~components/Layout/Avatar";
import Button from "~components/Layout/Button";
import Center from "~components/Layout/Center";
import Line from "~components/Layout/Line";
import Paragraph from "~components/Layout/Paragraph";
import MenuButton from "~components/Layout/MenuButton";
import Title from "~components/Layout/Title";
import UploadAvatarInstructions from "~components/Layout/UploadAvatarInstructions";
import WarningText from "~components/Layout/WarningText";
import OutsideLink from "~components/Navigation/OutsideLink";
import { FaCloudUploadAlt, FaTrash, RiLogoutBoxLine } from "~icons";
import { ReactElement } from "~types";

const General = ({ id }: { id: string }): ReactElement => (
  <>
    <Center>
      <Title margin="50px 0 0px 0">General Questions</Title>
      <Paragraph>
        Find answers to general questions like how to change your account
        settings and/or navigate the website.
      </Paragraph>
      <Line />
    </Center>
    <Accordion expanded={id} title="How do I change my avatar?">
      To change your avatar, go to the
      <OutsideLink
        dataTestId="settings-link"
        href="/employee/settings?tab=profile"
      >
        Settings
      </OutsideLink>
      page and click on the
      <Button
        primary
        display="inline-block"
        type="button"
        width="190px"
        padding="5px"
        margin="0 3px"
      >
        <FaCloudUploadAlt
          style={{
            fontSize: 18,
            marginRight: 5,
            position: "relative",
            top: 3
          }}
        />
        &nbsp;Upload Avatar
      </Button>
      button to bring up an upload dialog box:
      <div
        css={css`
          height: 195px;
          width: 200px;
          margin-top: 10px;
          background: #efebeb;
          position: relative;
          border: 1px dashed #03a9f3;
          line-height: normal;
        `}
      >
        <UploadAvatarInstructions />
      </div>
      Click on or drag and drop an image on to the upload box. Once an image has
      been selected, the image will automatically be uploaded to your profile.
      If the upload is successful, then your account will be updated with your
      new avatar.
      <br />
      <br />
      To remove your current avatar, go to the
      <OutsideLink
        dataTestId="settings-link"
        href="/employee/settings?tab=profile"
      >
        Settings
      </OutsideLink>
      page. Located underneath your avatar, click on the
      <Button
        danger
        display="inline-block"
        type="button"
        width="190px"
        padding="5px"
        margin="0 3px"
      >
        <FaTrash
          style={{
            fontSize: 18,
            marginRight: 5,
            position: "relative",
            top: 3
          }}
        />
        &nbsp;Remove Avatar
      </Button>
      button.
      <br />
      <br />
      <WarningText>
        For the best results, pick an image where the subject is centered and is
        squared in dimension (for example: 256 pixels in height by 256 pixels in
        length). Images that are larger than 2mb and/or do not end with
        .jpg/.jpeg/.png will not be accepted.
      </WarningText>
    </Accordion>
    <Accordion expanded={id} title="How do I change my email?">
      To change your email, go to the
      <OutsideLink
        dataTestId="settings-link"
        href="/employee/settings?tab=profile"
      >
        Settings
      </OutsideLink>
      page and update the <strong>Email</strong> field with a new email address.
      Once finished, click the
      <Button
        tertiary
        display="inline-block"
        type="button"
        width="190px"
        padding="5px"
        margin="0 3px"
      >
        Save Settings
      </Button>
      button to save and update your email.
      <WarningText>
        Be advised that updating your email will log you out of the current
        session. To proceed, please log in with your new email address while
        using your current account password.
      </WarningText>
    </Accordion>
    <Accordion expanded={id} title="How do I change my email preferences?">
      To change your email preferences, go to the
      <OutsideLink
        dataTestId="settings-link"
        href="/employee/settings?tab=profile"
      >
        Settings
      </OutsideLink>
      page and toggle the <strong>Email Reminders</strong> field. Once finished,
      click the
      <Button
        tertiary
        display="inline-block"
        type="button"
        width="190px"
        padding="5px"
        margin="0 3px"
      >
        Save Settings
      </Button>
      button to update and save your changes.
      <strong>
        &nbsp;Please note that this will only affect event and A/P form
        reminders; this does NOT affect the monthly schedule emails.
      </strong>
    </Accordion>
    <Accordion expanded={id} title="How do I change my first or last name?">
      To change your first and/or last name, go to the
      <OutsideLink
        dataTestId="settings-link"
        href="/employee/settings?tab=profile"
      >
        Settings
      </OutsideLink>
      page and change the <strong>First Name</strong> and/or
      <strong>&nbsp;Last Name</strong> field(s). Once finished, click the
      <Button
        tertiary
        display="inline-block"
        type="button"
        width="190px"
        padding="5px"
        margin="0 3px"
      >
        Save Settings
      </Button>
      button to update and save your changes.
    </Accordion>
    <Accordion expanded={id} title="How do I change my password?">
      To change your password, go to the
      <OutsideLink
        dataTestId="reset-password-link"
        href="/employee/reset-password"
      >
        Reset Password
      </OutsideLink>
      page and fill out the <strong>Email</strong> field. Once finished, click
      the
      <Button
        tertiary
        display="inline-block"
        type="button"
        width="180px"
        padding="5px"
        margin="0 3px"
      >
        Reset
      </Button>
      button to initiate a password reset request. In a few minutes, a password
      reset request email will be sent to the account&#39;s email address. Open
      the email, and click the
      <Button
        primary
        display="inline-block"
        type="button"
        width="240px"
        padding="5px"
        margin="0 3px"
      >
        Create New Password
      </Button>
      link. This link will take you to an Update Password form. Fill out the
      <strong>&nbsp;New Password</strong> field. Once completed, click the
      <Button
        tertiary
        display="inline-block"
        type="button"
        width="190px"
        padding="5px"
        margin="0 3px"
      >
        Update
      </Button>
      button to update the account&#39;s password.
      <WarningText>
        Be advised that updating your email will log you out of the current
        session. To proceed, please log in with your new email address and your
        account password.
      </WarningText>
    </Accordion>
    <Accordion expanded={id} title="How do I log out of my current session?">
      By default, you&apos;ll stay logged into your current session for 30 days
      from the time you&apos;ve first logged in. If you wish to manually log
      out, simply click on your avatar <Avatar display="inline-block" />
      &nbsp; (located at the top right of this page). A drop down menu will
      open. Now click the
      <MenuButton
        primary
        hoverable
        type="button"
        style={{ display: "inline-block", color: "#025f6d", borderRadius: 10 }}
        data-testid="signout-user"
        margin="0 3px"
      >
        <RiLogoutBoxLine
          style={{ marginRight: 5, position: "relative", top: 2 }}
        />
        Signout
      </MenuButton>
      option.
    </Accordion>
  </>
);

export default General;
