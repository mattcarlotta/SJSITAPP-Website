import * as React from "react";
import Accordion from "~components/Layout/Accordion";
import Button from "~components/Layout/Button";
import Center from "~components/Layout/Center";
import Line from "~components/Layout/Line";
import List from "~components/Layout/List";
import ListItem from "~components/Layout/ListItem";
import Paragraph from "~components/Layout/Paragraph";
import Title from "~components/Layout/Title";
import WarningText from "~components/Layout/WarningText";
import OutsideLink from "~components/Navigation/OutsideLink";
import { FaEdit, FaShareSquare, FaTools, FaTrash } from "~icons";
import { CSSProperties, ReactElement } from "~types";

const iconStyle = {
  position: "relative",
  top: 2
} as CSSProperties;

const Forms = ({ id }: { id: string }): ReactElement => (
  <>
    <Center>
      <Title margin="50px 0 0px 0">Forms</Title>
      <Paragraph>
        Find answers to all things regarding creating, editing, and deleting A/P
        forms.
      </Paragraph>
      <Line />
    </Center>
    <Accordion expanded={id} title="How do I create an A/P form?">
      To manually create forms (A/P forms), go to the
      <OutsideLink dataTestId="create-form-link" href="/employee/forms/create">
        Create Form
      </OutsideLink>
      page and fill out the <strong>New AP Form</strong> by: Selecting the&nbsp;
      <strong>Season ID</strong> you&#39;ve previously created, as well as,
      selecting the appropriate <strong>Enrollment Month</strong>,&nbsp;
      <strong>Expiration Date</strong>, and the&nbsp;
      <strong>
        Send Email Notifications Date (optional -- read below for more details)
      </strong>
      . Once you&#39;ve filled out the form, click the
      <Button
        tertiary
        display="inline-block"
        type="button"
        width="140px"
        padding="5px"
        margin="0 3px"
      >
        Create Form
      </Button>
      button to create a new A/P form. By design, A/P forms will automatically
      aggregate events within the <strong>Enrollment Month</strong> dates,
      therefore, as long as an event&#39;s date is between this date range,
      they&#39;ll automatically be added to the A/P Form.
      <br />
      <br />
      According to the <strong>Send Email Notifications Date</strong>, email
      notifications will be automatically sent to all active members notifying
      them that a new A/P form has been created and will need to be filled out
      before the <strong>Expiration Date</strong>. Leaving this&nbsp;
      <strong>Send Email Notifications Date</strong> field blank, will send the
      email notifications immediately.
    </Accordion>
    <Accordion expanded={id} title="How do I delete an A/P form?">
      To delete a form (A/P form), go to the
      <OutsideLink
        dataTestId="view-forms-link"
        href="/employee/forms/viewall?page=1"
      >
        View Forms
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
      button. A pop up will confirm your selection and will remove the form upon
      confirmation. Please note that deleting A/P forms&nbsp;
      <strong>will not</strong> delete any events found within the enrollment
      month field.
      <WarningText>
        Be advised that this action is irreversible. Once deleted, the form is
        permanently removed.
      </WarningText>
    </Accordion>
    <Accordion expanded={id} title="How do I edit an A/P form?">
      To edit a form (A/P form), go to the
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
        width="160px"
        padding="4px"
        margin="0 3px"
      >
        Update Form
      </Button>
      button to save your changes. By design, A/P forms will automatically
      aggregate events within the <strong>Enrollment Month</strong> dates,
      therefore, as long as an event&#39;s date is between this date range,
      they&#39;ll be automatically added to the A/P Form.
    </Accordion>
    <Accordion expanded={id} title="How do I resend an A/P form reminders?">
      To resend a form (A/P form) email notifications, go to the
      <OutsideLink
        dataTestId="view-forms-link"
        href="/employee/forms/viewall?page=1"
      >
        View Forms
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
      notifications immediately by overriding the A/P form&#39;s&nbsp;
      <strong>Send Email Notifications Date</strong>.
    </Accordion>
    <Accordion expanded={id} title="How do I send out monthly A/P form emails?">
      In short, the automated emailing service handles this functionality. That
      said, on the&nbsp;
      <strong>16th</strong> of each month,&nbsp;
      <strong>2 months prior</strong> to month in question, an automated service
      will create events and an A/P form for you. The generated A/P form, by
      default, will automatically send email notifications on the&nbsp;
      <strong>1st of each prior month</strong>. By default, employees will have
      until the <strong>7th of each prior month</strong> to fill out their
      availabilty. This pattern will stay active for the duration of the season.
      <br />
      <br />
      Here&#39;s a breakdown example:
      <List>
        <ListItem padding="20px 0 0 5px">
          - On October <strong>16th</strong>, events for the month of December
          will be created; as well as, an A/P form for December 1st - December
          31st.
        </ListItem>
        <ListItem padding="20px 0 0 5px">
          - On November <strong>1st</strong>, the December A/P form will be
          emailed to all active members.
        </ListItem>
        <ListItem padding="20px 0 0 5px">
          - On November <strong>7th</strong>, the December A/P form will expire
          and availability responses will no longer be accepted.
        </ListItem>
        <ListItem padding="20px 0 0 5px">
          - On November <strong>15th</strong>, the December schedule will be
          emailed to all active users.
        </ListItem>
      </List>
      <br />
      If you need to include any additional events before the 15th deadline,
      then you can go to the
      <OutsideLink
        dataTestId="create-event-link"
        href="/employee/events/create"
      >
        Create Event
      </OutsideLink>
      page, create a new event, and that event will automatically be added to
      the A/P form.
      <WarningText>
        Be advised that this service is automated and only currently supports
        creating Sharks home games. The Barracuda home games will need to be
        manually created before the 1st of each prior month.
      </WarningText>
      See
      <OutsideLink
        dataTestId="automated-services-link"
        href="/employee/help#how-do-the-automated-services-work"
      >
        Automated Services
      </OutsideLink>
      for additional information about how the services work and how to change
      their settings.
    </Accordion>
    <Accordion expanded={id} title="How do I view all forms?">
      To view all forms (A/P forms), go to the
      <OutsideLink
        dataTestId="view-forms-link"
        href="/employee/forms/viewall?page=1"
      >
        View Forms
      </OutsideLink>
      page.
    </Accordion>
  </>
);

export default Forms;
