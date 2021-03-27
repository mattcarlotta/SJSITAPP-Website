import * as React from "react";
import Accordion from "~components/Layout/Accordion";
import Button from "~components/Layout/Button";
import Center from "~components/Layout/Center";
import Line from "~components/Layout/Line";
import List from "~components/Layout/List";
import ListItem from "~components/Layout/ListItem";
import Paragraph from "~components/Layout/Paragraph";
import Title from "~components/Layout/Title";
import OutsideLink from "~components/Navigation/OutsideLink";
import { FaClipboardCheck, FaTools } from "~icons";
import { CSSProperties } from "~types";

const iconStyle = {
  position: "relative",
  top: 2
} as CSSProperties;

const GettingStarted = ({ id }: { id: string }): JSX.Element => (
  <>
    <Center>
      <Title margin="50px 0 0 0">Getting Started</Title>
      <Paragraph>
        Quick and easy overview on how to get up and running.
      </Paragraph>
      <Line />
    </Center>
    <Accordion expanded={id} title="How do I get started?">
      To get started, please follow these steps in order:
      <List>
        <ListItem padding="20px 0 0 5px">
          <strong>1.)</strong> Go to the
          <OutsideLink
            dataTestId="season-create-link"
            href="/employee/seasons/create"
          >
            Create Seasons
          </OutsideLink>
          page and fill out the <strong>Season Duration</strong> fields and
          click the
          <Button
            tertiary
            display="inline-block"
            type="button"
            width="200px"
            padding="4px"
            margin="0 3px"
          >
            Create Season
          </Button>
          button to create a new season and <strong>Season ID</strong>. All
          subsequent forms and events should be attached to this&nbsp;
          <strong>Season ID</strong>.
        </ListItem>
        <ListItem padding="20px 0 0 5px">
          <strong>2.)</strong> Add members (staff or employees) by going to the
          <OutsideLink
            dataTestId="create-member-link"
            href="/employee/members/create"
          >
            Create Member
          </OutsideLink>
          page and filling out the <strong>Role</strong> and&nbsp;
          <strong>Authorized Email</strong> fields. Once completed, click the
          <Button
            tertiary
            display="inline-block"
            type="button"
            width="200px"
            padding="4px"
            margin="0 3px"
          >
            Create Member
          </Button>
          button to add members.
        </ListItem>
        <ListItem padding="20px 0 0 5px">
          <strong>3.)</strong> Create events (games, promotionals, or misc.) by
          going to the
          <OutsideLink
            dataTestId="create-event-link"
            href="/employee/events/create"
          >
            Create Event
          </OutsideLink>
          page and: Selecting the <strong>Season ID</strong> you&#39;ve created
          in step 1, selecting the appropriate&nbsp;
          <strong>Event Type</strong>, <strong>Team</strong>,&nbsp;
          <strong>Opponent (if applicable)</strong>,&nbsp;
          <strong>Event Location</strong>, <strong>Event Date</strong>,&nbsp;
          <strong>Event Attire</strong>, and creating&nbsp;
          <strong>Scheduling Call Times</strong>. Once completed, click the
          <Button
            tertiary
            display="inline-block"
            type="button"
            width="170px"
            padding="4px"
            margin="0 3px"
          >
            Create Event
          </Button>
          button to add events.
        </ListItem>
        <ListItem padding="20px 0 0 5px">
          <strong>4.)</strong> Create forms (A/P forms) by going to the
          <OutsideLink
            dataTestId="create-form-link"
            href="/employee/forms/create"
          >
            Create Form
          </OutsideLink>
          page and: Selecting the <strong>Season ID</strong> you&#39;ve created
          in step 1, selecting the appropriate&nbsp;
          <strong>Enrollment Month</strong>, <strong>Expiration Date</strong>,
          and the <strong>Send Email Notifications Date (optional)</strong>.
          Once completed, click the
          <Button
            tertiary
            display="inline-block"
            type="button"
            width="170px"
            padding="4px"
            margin="0 3px"
          >
            Create Form
          </Button>
          button to add an A/P form. According to the&nbsp;
          <strong>Send Email Notifications Date</strong>, email notifications
          will automatically be sent to all active members notifying them that a
          new A/P form has been created and will need to be filled out before
          the <strong>Expiration Date</strong>. Leaving the&nbsp;
          <strong>Send Email Notifications Date</strong> field blank, will send
          the email notifications immediately.
        </ListItem>
        <ListItem padding="20px 0 0 5px">
          <strong>5.)</strong> Schedule events by going to the
          <OutsideLink
            dataTestId="events-viewall-link"
            href="/employee/events/viewall?page=1"
          >
            View Events
          </OutsideLink>
          page, underneath the <strong>Table Actions</strong> column, clicking
          on one of the
          <Button
            primary
            display="inline-block"
            type="button"
            width="50px"
            padding="4px"
            margin="0 3px"
          >
            <FaTools style={iconStyle} />
          </Button>
          table actions buttons to open a menu, then clicking on the
          <Button
            primary
            display="inline-block"
            type="button"
            width="160px"
            padding="4px"
            margin="0 3px"
          >
            <FaClipboardCheck
              style={{ ...iconStyle, fontSize: 17, marginRight: 5 }}
            />
            <span>Schedule</span>
          </Button>
          (View & Assign Schedule) button. When the&nbsp;
          <strong>Event Scheduling</strong> form has loaded, scroll down the
          page until you see an <strong>Employees</strong> column followed by
          one or many call time columns. To assign an employee to a call time,
          left mouse click and hold the employee&#39;s name, drag it over to a
          call time column and release the left mouse click to assign them to
          that call time slot. Once the event has been scheduled, click the
          <Button
            tertiary
            display="inline-block"
            type="button"
            width="200px"
            padding="4px"
            margin="0 3px"
          >
            Submit Schedule
          </Button>
          button to save the event. According to the&nbsp;
          <strong>Event Date</strong>, email reminders will be automatically
          sent to all scheduled members, 1 day before the event date, notifying
          them that they&#39;re scheduled to work that particular event at their
          assigned call time slot.
        </ListItem>
      </List>
    </Accordion>
  </>
);

export default GettingStarted;
