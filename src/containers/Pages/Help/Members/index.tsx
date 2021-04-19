import * as React from "react";
import Accordion from "~components/Layout/Accordion";
import Button from "~components/Layout/Button";
import Center from "~components/Layout/Center";
import Line from "~components/Layout/Line";
import Paragraph from "~components/Layout/Paragraph";
import Title from "~components/Layout/Title";
import WarningText from "~components/Layout/WarningText";
import OutsideLink from "~components/Navigation/OutsideLink";
import { FaEdit, FaSearchPlus, FaTools, FaTrash } from "~icons";
import { CSSProperties, ReactElement } from "~types";

const iconStyle = {
  position: "relative",
  top: 2
} as CSSProperties;

const Members = ({ id }: { id: string }): ReactElement => (
  <>
    <Center>
      <Title margin="50px 0 0px 0">Members</Title>
      <Paragraph>
        Find answers to all things regarding creating, editing, and deleting
        member and membership authorizations.
      </Paragraph>
      <Line />
    </Center>
    <Accordion expanded={id} title="How do I create a member?">
      To authorize a membership (sign up), go to the
      <OutsideLink
        dataTestId="create-member-link"
        href="/employee/members/create"
      >
        Create Member
      </OutsideLink>
      page and fill out the <strong>Create Member</strong> form by: Selecting
      the appropriate <strong>Role</strong> and providing the member&#39;s email
      address that you wish to authorize. Once you&#39;ve filled out the form,
      click the
      <Button
        tertiary
        display="inline-block"
        type="button"
        width="180px"
        padding="5px"
        margin="0 3px"
      >
        Create Member
      </Button>
      button to authorize the member.
      <br />
      <br />
      The member will receive an email with a link that contains a special&nbsp;
      <strong>Authorization Key</strong> that gives them access to use the&nbsp;
      <OutsideLink dataTestId="employee-signup-link" href="/employee/signup">
        Sign Up
      </OutsideLink>
      form. Once they&#39;ve filled out the rest of the register fields:&nbsp;
      <strong>Authorized Email</strong>,&nbsp;
      <strong>First Name</strong>, <strong>Last Name</strong>, and a&nbsp;
      <strong>Password</strong> and clicked the
      <Button
        tertiary
        display="inline-block"
        type="button"
        width="120px"
        padding="5px"
        margin="0 3px"
      >
        Register
      </Button>
      button, the authorization key will be automatically applied to the form,
      otherwise they must manually include it. If successful, they will be
      redirected to the
      <OutsideLink dataTestId="employee-login-link" href="/employee/login">
        Log In
      </OutsideLink>
      page where they can input their <strong>Email</strong> and&nbsp;
      <strong>Password</strong>&nbsp;details to log into the application.
    </Accordion>
    <Accordion expanded={id} title="How I delete a member?">
      To delete a member, go to the
      <OutsideLink
        dataTestId="view-members-link"
        href="/employee/members/viewall?page=1"
      >
        View Members
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
      button. A pop up will confirm your selection and will remove the member
      upon confirmation.
      <WarningText>
        Be advised that this action is irreversible. Once deleted, the member is
        permanently removed.
      </WarningText>
    </Accordion>
    <Accordion expanded={id} title="How I edit, update, or suspend a member?">
      To edit a member, go to the
      <OutsideLink
        dataTestId="view-members-link"
        href="/employee/members/viewall?page=1"
      >
        View Members
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
        <FaSearchPlus style={{ ...iconStyle, marginRight: 5 }} />
        <span>View</span>
      </Button>
      button. Here you&#39;ll have access to their&nbsp;
      <strong>Profile</strong>, which will allow you to update their&nbsp;
      <strong>Authorized Email</strong>, <strong>First Name</strong>,&nbsp;
      <strong>Last Name</strong>, and <strong>Role</strong>. In addition,
      you&#39;ll be able to <strong>Suspend</strong> or&nbsp;
      <strong>Activate</strong> their accounts.
      <WarningText>
        Be advised that suspending a member&#39;s account will not allow them to
        sign in and use the application. In addition, if the member was already
        assigned to any events, they will be unassigned from ALL of their call
        time slots -- reactivating the account will NOT restore their previously
        scheduled call times.
      </WarningText>
    </Accordion>
    <Accordion expanded={id} title="How do I view all members?">
      To view all available members, go to the
      <OutsideLink
        dataTestId="view-members-link"
        href="/employee/members/viewall?page=1"
      >
        View Members
      </OutsideLink>
      page.
    </Accordion>
    <Accordion
      expanded={id}
      title="How do I edit or resend member authorization?"
    >
      To edit a member&#39;s authorization, go to the
      <OutsideLink
        dataTestId="view-authorization-link"
        href="/employee/members/authorizations/viewall?page=1"
      >
        View Authorizations
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
      button. If you wish to just resend an authorization, simply leave
      the&nbsp;
      <strong>Edit Authorization</strong> form fields as is and click the
      <Button
        tertiary
        display="inline-block"
        type="button"
        width="220px"
        padding="5px"
        margin="0 3px"
      >
        Update Authorization
      </Button>
      button. Otherwise, edit any of the fields and click the
      <Button
        tertiary
        display="inline-block"
        type="button"
        width="220px"
        padding="5px"
        margin="0 3px"
      >
        Update Authorization
      </Button>
      button to update the member&#39;s authorization.
      <br />
      For security reasons, updating the member&#39;s authorization will
      generate and send a new authorization key.
      <WarningText>
        Be advised that if the authorization key has already been used, then
        updating the member&#39;s authorization will not be possible.
      </WarningText>
    </Accordion>
    <Accordion
      expanded={id}
      title="How do I view a member's profile, availability, responses or schedule?"
    >
      To view a member&#39;s profile, go to the
      <OutsideLink
        dataTestId="view-members-link"
        href="/employee/members/viewall?page=1"
      >
        View Members
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
        <FaSearchPlus style={{ ...iconStyle, marginRight: 5 }} />
        <span>View</span>
      </Button>
      button. Here, you&#39;ll have access to their&nbsp;
      <strong>Profile</strong>, <strong>Availabilty</strong>,&nbsp;
      <strong>Responses</strong>, and <strong>Schedule</strong>. button.
    </Accordion>
    <Accordion
      expanded={id}
      title="How do I view all members' availability for the current month's A/P form?"
    >
      To view the current month&#39;s members&#39; availability percentage, go
      to the
      <OutsideLink dataTestId="dashboard-link" href="/employee/dashboard">
        Dashboard
      </OutsideLink>
      page and underneath the <strong>Availability</strong>
      &nbsp;tab you will see the members&#39; availability for that particular
      month&#39;s A/P form.
      <WarningText>
        Be advised that the availability will only show up if there is at least
        1 registered member and there is at least 1 event within that A/P
        form&#39;s start and end month dates.
      </WarningText>
    </Accordion>
    <Accordion expanded={id} title="How do I view all members' authorizations?">
      To view all member authorizations (as well as their registration status),
      go to the
      <OutsideLink
        dataTestId="view-authorizations-link"
        href="/employee/members/authorizations/viewall?page=1"
      >
        View Authorizations
      </OutsideLink>
      page.
    </Accordion>
  </>
);

export default Members;
