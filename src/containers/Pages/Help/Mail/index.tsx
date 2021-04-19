import * as React from "react";
import Accordion from "~components/Layout/Accordion";
import Button from "~components/Layout/Button";
import Center from "~components/Layout/Center";
import Line from "~components/Layout/Line";
import Paragraph from "~components/Layout/Paragraph";
import Title from "~components/Layout/Title";
import OutsideLink from "~components/Navigation/OutsideLink";
import {
  FaEdit,
  FaRegTimesCircle,
  FaShareSquare,
  FaTools,
  FaTrash
} from "~icons";
import { CSSProperties } from "~types";

const iconStyle = {
  position: "relative",
  top: 2
} as CSSProperties;

const Mail = ({ id }: { id: string }): JSX.Element => (
  <>
    <Center>
      <Title margin="50px 0 0px 0">Mail</Title>
      <Paragraph>
        Find answers to all things regarding creating, editing, and deleting
        email.
      </Paragraph>
      <Line />
    </Center>
    <Accordion expanded={id} title="How do I create an email?">
      To create an email, go to the
      <OutsideLink dataTestId="create-mail-link" href="/employee/mail/create">
        Create Mail
      </OutsideLink>
      page and fill out the <strong>Send Mail</strong> form by: Selecting at
      least one member to <strong>Send To</strong>, including a&nbsp;
      <strong>Send From</strong> email address (default address has been
      provided), selecting an appropriate <strong>Send Date (optional)</strong>,
      and lastly filling in a <strong>Subject</strong> and a&nbsp;
      <strong>Message</strong>. Once completed, click the
      <Button
        tertiary
        display="inline-block"
        type="button"
        width="100px"
        padding="5px"
        margin="0 3px"
      >
        Preview
      </Button>
      button to preview what the email will look like before sending it out. To
      ensure consistency, the message will be automatically wrapped in a
      pre-defined email template. If you&#39;re statisified with the final look,
      then click the
      <Button
        tertiary
        display="inline-block"
        type="button"
        width="80px"
        padding="4px"
        margin="0 3px"
      >
        Send
      </Button>
      button to save the email. If a <strong>Send Date</strong> was not
      provided, then the email will be sent out immediately.
    </Accordion>
    <Accordion expanded={id} title="How do I delete an email?">
      To delete a mail, go to the
      <OutsideLink
        dataTestId="view-forms-link"
        href="/employee/forms/viewall?page=1"
      >
        View Mail
      </OutsideLink>
      page, underneath the <strong>Table Actions</strong> column, click on one
      of the
      <Button
        primary
        display="inline-block"
        type="button"
        width="50px"
        padding="4px"
        margin="0 3px"
        borderRadius="10px"
      >
        <FaTools style={iconStyle} />
      </Button>
      table actions buttons to open a menu, then click on the
      <Button
        danger
        display="inline-block"
        type="button"
        width="100px"
        padding="5px"
        margin="0 3px"
      >
        <FaTrash style={{ ...iconStyle, marginRight: 5 }} />
        <span>Delete</span>
      </Button>
      button. A pop up will confirm your selection and will remove the mail upon
      confirmation.
    </Accordion>
    <Accordion expanded={id} title="How do I edit an email?">
      To edit an email, go to the
      <OutsideLink
        dataTestId="edit-forms-link"
        href="/employee/forms/viewall?page=1"
      >
        View Events
      </OutsideLink>
      page, underneath the <strong>Table Actions</strong> column, click on one
      of the
      <Button
        primary
        display="inline-block"
        type="button"
        width="50px"
        padding="4px"
        margin="0 3px"
        borderRadius="10px"
      >
        <FaTools style={iconStyle} />
      </Button>
      table actions buttons to open a menu, then click on the
      <Button
        primary
        display="inline-block"
        type="button"
        width="100px"
        padding="5px"
        margin="0 3px"
      >
        <FaEdit style={{ ...iconStyle, marginRight: 5 }} />
        <span>Edit</span>
      </Button>
      button. Edit any of the fields and click the
      <Button
        tertiary
        display="inline-block"
        type="button"
        width="100px"
        padding="5px"
        margin="0 3px"
      >
        Preview
      </Button>
      button to preview what the email will look like before sending it out. To
      ensure consistency, the message will be automatically wrapped in a
      pre-defined email template. If you&#39;re statisified with the final look,
      then click the
      <Button
        tertiary
        display="inline-block"
        type="button"
        width="80px"
        padding="4px"
        margin="0 3px"
      >
        Send
      </Button>
      button to save the email. If a <strong>Send Date</strong> was provided and
      has already past, you can either remove the date by hovering over
      the&nbsp;
      <strong>Send Date</strong>&nbsp;field and clicking the&nbsp;
      <FaRegTimesCircle style={{ ...iconStyle, color: "red", fontSize: 20 }} />
      &nbsp;button or by selecting a later date. If the&nbsp;
      <strong>Send Date</strong> is left empty, the email will be sent out
      immediately.
    </Accordion>
    <Accordion expanded={id} title="How do I resend an email?">
      To resend mail, go to the
      <OutsideLink
        dataTestId="view-mail-link"
        href="/employee/mail/viewall?page=1"
      >
        View Mail
      </OutsideLink>
      page, underneath the <strong>Table Actions</strong> column, click on one
      of the
      <Button
        primary
        display="inline-block"
        type="button"
        width="50px"
        padding="4px"
        margin="0 3px"
        borderRadius="10px"
      >
        <FaTools style={iconStyle} />
      </Button>
      table actions buttons to open a menu, then click on the
      <Button
        primary
        display="inline-block"
        type="button"
        width="120px"
        padding="5px"
        margin="0 3px"
      >
        <FaShareSquare style={{ ...iconStyle, marginRight: 5 }} />
        <span>Resend</span>
      </Button>
      button. Please note that clicking this button will resend emails
      immediately by overriding the <strong>Send Date</strong>.
    </Accordion>
    <Accordion expanded={id} title="How do I view all emails?">
      To view all mail, go to the
      <OutsideLink
        dataTestId="view-mail-link"
        href="/employee/mail/viewall?page=1"
      >
        View Mail
      </OutsideLink>
      page.
    </Accordion>
  </>
);

export default Mail;
