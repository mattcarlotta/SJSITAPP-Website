import * as React from "react";
import Accordion from "~components/Layout/Accordion";
import Button from "~components/Layout/Button";
import Center from "~components/Layout/Center";
import Line from "~components/Layout/Line";
import Paragraph from "~components/Layout/Paragraph";
import Title from "~components/Layout/Title";
import WarningText from "~components/Layout/WarningText";
import OutsideLink from "~components/Navigation/OutsideLink";
import {
  FaClipboardCheck,
  FaEdit,
  FaFileAlt,
  FaShareSquare,
  FaTools,
  FaTrash
} from "~icons";
import { CSSProperties, ReactElement } from "~types";

const iconStyle = {
  position: "relative",
  top: 2
} as CSSProperties;

const Events = ({ id }: { id: string }): ReactElement => (
  <>
    <Center>
      <Title margin="50px 0 0 0">Events</Title>
      <Paragraph>
        Find answers to all things regarding creating, editing, deleting, and
        scheduling events.
      </Paragraph>
      <Line />
    </Center>
    <Accordion expanded={id} title="How do I create an event?">
      To create an event (games, promotionals, or misc.), go to the
      <OutsideLink dataTestId="create-event-link" href="/employee/event/create">
        Create Event
      </OutsideLink>
      page and fill out the <strong>New Event Form</strong> by: Selecting
      the&nbsp;
      <strong>Season ID</strong> you&#39;ve previously created, selecting the
      appropriate <strong>Event Type</strong>, <strong>Team</strong>,&nbsp;
      <strong>Opponent (if applicable)</strong>, <strong>Event Location</strong>
      , <strong>Event Date</strong>, <strong>Event Attire</strong>, and
      creating&nbsp;
      <strong>Scheduling Call Times</strong>. Once completed, click the
      <Button
        tertiary
        display="inline-block"
        type="button"
        width="140px"
        padding="5px"
        margin="0 3px"
      >
        Create Event
      </Button>
      button to save the event.
    </Accordion>
    <Accordion expanded={id} title="How do I delete an event?">
      To delete an event (games, promotionals, or misc.), go to the
      <OutsideLink
        dataTestId="view-events-link"
        href="/employee/events/viewall?page=1"
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
      button. A pop up will confirm your selection and will remove the event
      upon confirmation.
      <WarningText>
        Be advised that this action is irreversible. Once deleted, the event is
        permanently removed.
      </WarningText>
    </Accordion>
    <Accordion expanded={id} title="How do I edit an event?">
      To edit events (games, promotionals, or misc.), go to the
      <OutsideLink
        dataTestId="view-events-link"
        href="/employee/events/viewall?page=1"
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
        Update Event
      </Button>
      button to save your changes.
      <WarningText>
        Be advised that editing an event&#39;s call times will reset the
        event&#39;s schedule! Therefore, if an event&#39;s call times are
        changed after a schedule has been assigned, then the event will need to
        be re-scheduled. If an event is updated, but the event&#39;s call times
        remain unchanged, then the event will not need to be re-scheduled.
      </WarningText>
    </Accordion>
    <Accordion
      expanded={id}
      title="How do I resend an event's email reminders?"
    >
      To resend event (games, promotionals, or misc.) email reminders, go to the
      <OutsideLink
        dataTestId="view-events-link"
        href="/employee/events/viewall?page=1"
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
        width="120px"
        padding="5px"
        margin="0 3px"
      >
        <FaShareSquare style={{ ...iconStyle, marginRight: 5 }} />
        <span>Resend</span>
      </Button>
      button. If the event takes place within a day, the email reminders will be
      sent out immediately.
    </Accordion>
    <Accordion
      expanded={id}
      title="How do I schedule or assign employees to an event?"
    >
      To schedule an event (games, promotionals, or misc.), go to the
      <OutsideLink
        dataTestId="view-events-link"
        href="/employee/events/viewall?page=1"
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
        width="125px"
        padding="5px"
        margin="0 3px"
      >
        <FaClipboardCheck
          style={{ ...iconStyle, fontSize: 17, marginRight: 5 }}
        />
        <span>Schedule</span>
      </Button>
      button.
      <br />
      <br />
      Scroll down the page until you see an&nbsp;
      <strong>EMPLOYEES</strong> column -- each employee will have a colored
      badge that relates to one of the legend&#39;s response colors -- followed
      by one or many call time columns. Any employees that have a (
      <FaFileAlt
        style={{
          fontSize: 14,
          position: "relative",
          top: 2,
          margin: "0 3px"
        }}
      />
      ) icon next to their name have left a note regarding this particular
      event. To view the note, simply hover over the icon.
      <br />
      <br />
      To assign an employee to a call time, hover over an employee&#39;s name
      and click and hold the mouse left click button. Then drag them over to a
      call time column and release the left mouse click button to drop and
      assign them to that call time slot. Once the event has been completely
      scheduled, click the
      <Button
        tertiary
        display="inline-block"
        type="button"
        width="180px"
        padding="4px"
        margin="0 3px"
      >
        Save Schedule
      </Button>
      button to save your changes.
      <WarningText>
        According to the <strong>Event Date</strong>, individual email reminders
        will be automatically sent to all scheduled members&nbsp;
        <strong>one day</strong>
        &nbsp;before the event date. The emails will notify them that
        they&#39;re scheduled to work that particular event at their assigned
        call time slot.
      </WarningText>
    </Accordion>
    <Accordion expanded={id} title="How do I view all events?">
      To view all created events (games, promotionals, or misc.), go to the
      <OutsideLink
        dataTestId="view-events-link"
        href="/employee/events/viewall?page=1"
      >
        View Events
      </OutsideLink>
      page.
    </Accordion>
  </>
);

export default Events;
