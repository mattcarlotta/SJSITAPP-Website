import * as React from "react";
import Accordion from "~components/Layout/Accordion";
import Bold from "~components/Layout/Bold";
import Center from "~components/Layout/Center";
import Line from "~components/Layout/Line";
import List from "~components/Layout/List";
import ListItem from "~components/Layout/ListItem";
import Paragraph from "~components/Layout/Paragraph";
import Title from "~components/Layout/Title";
import WarningText from "~components/Layout/WarningText";
import OutsideLink from "~components/Navigation/OutsideLink";
import { ReactElement } from "~types";

const AutomatedServices = ({ id }: { id: string }): ReactElement => (
  <>
    <Center>
      <Title margin="50px 0 0 0">Automated Services</Title>
      <Paragraph>
        Overview about how the automated services work for you.
      </Paragraph>
      <Line />
    </Center>
    <Accordion expanded={id} title="How do the automated services work?">
      The following services are configurable by going to the
      <OutsideLink data-testid="services-link" href="/employee/services">
        Services
      </OutsideLink>
      page:&nbsp;
      <List margin="0 0 20px 0">
        <ListItem padding="20px 0 0 5px">
          <Bold>Emailing Service</Bold>- This automated service, controlled via
          the&nbsp;
          <Bold>Emailing Service</Bold>field, polls an internal database for
          Mail documents every 30 seconds. If Mail documents are present and
          haven&#39;t been sent according to their&nbsp;
          <Bold>Send Date</Bold>and <Bold>Status</Bold>fields, then the service
          generates emails from these Mail documents and hands them off to
          <OutsideLink data-testid="services-link" href="https://sendgrid.com/">
            Send Grid
          </OutsideLink>
          , who then delivers them to the destined email address(es).
        </ListItem>
        <ListItem padding="20px 0 0 5px">
          <Bold>Automated Services</Bold>- This is a master switch for the
          automated services listed below, controlled via the&nbsp;
          <Bold>Automated Service</Bold>field. If this switch is active, then
          all the active automated services are run. If this switch is
          deactivated, then all of the automated services are not ran regardless
          of their status.
        </ListItem>
        <ListItem padding="20px 0 0 5px">
          <Bold>A/P Form Email Reminders</Bold>- This automated service,
          controlled via the&nbsp;
          <Bold>A/P Form - Email Reminder Status (automated)</Bold>field, polls
          an internal database for Form documents every month, via the
          determined&nbsp;
          <Bold>A/P Form - Email Reminder Day (automated)</Bold>and&nbsp;
          <Bold>A/P Form - Email Reminder Time (automated)</Bold>fields. It then
          determines if a Form&#39;s <Bold>Send Email Notifications Date</Bold>
          date has passed. If so, it generates Mail documents for individual
          members to remind them that an A/P form is about to expire.
        </ListItem>
        <ListItem padding="20px 0 0 5px">
          <Bold>Event & A/P Form Creation</Bold>- This automated service,
          controlled via the&nbsp;
          <Bold>Event & A/P Form - Creation Status (automated)</Bold>field,
          polls the
          <OutsideLink
            data-testid="services-link"
            href="https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md"
          >
            NHL API
          </OutsideLink>
          once a month, via the determined&nbsp;
          <Bold>Event & A/P Form - Creation Day (automated)</Bold>and&nbsp;
          <Bold>Event & A/P Form - Creation Time (automated)</Bold>fields, for
          Shark home games. If Shark home games are found, they are then saved
          as Event documents within an internal database; and, an A/P form is
          automatically created to encapsulate these new Events.
        </ListItem>
        <ListItem padding="20px 0 0 5px">
          <Bold>Schedule Creation</Bold>: This automated service, controlled via
          the&nbsp;
          <Bold>Schedule - Creation Status (automated)</Bold>field, polls an
          internal database for Form documents every month, via the
          determined&nbsp;
          <Bold>Schedule - Creation Day (automated)</Bold>and&nbsp;
          <Bold>Schedule - Creation Time (automated)</Bold>fields. If the
          creation day and time has passed, it gathers up all the Event
          documents within the Form and generates individual Mail documents
          containing individual schedules for staff and members.
        </ListItem>
      </List>
      Unfortunately, Barracuda home games do not have a consumable API (like the
      NHL API mentioned above) available to the public, so they&#39;ll need to
      be manually created before the A/P form is sent out (before the 1st of
      each month).
      <br />
      <br />
      Here&#39;s an example breakdown of how the automated services will
      function for the month of October:
      <List>
        <ListItem padding="20px 0 0 5px">
          - On October <strong>1st</strong>, an A/P form for November 1st -
          November 29th will be emailed to all active members.
        </ListItem>
        <ListItem padding="20px 0 0 5px">
          - On October <strong>5th @ 5:00 pm</strong>, an A/P form reminder for
          November 1st - November 29th will be emailed to all active members.
        </ListItem>
        <ListItem padding="20px 0 0 5px">
          - On October <strong>7th @ 11:59 pm</strong>, the November A/P form
          will expire and availability responses will no longer be accepted.
        </ListItem>
        <ListItem padding="20px 0 0 5px">
          - On October <strong>15th @ 6:00 pm</strong>, a master schedule will
          be sent to staff and individual schedules for the month of November
          will be sent out to all active members.
        </ListItem>
        <ListItem padding="20px 0 0 5px">
          - On October <strong>16th @ 7:59 am</strong>, Sharks home games for
          the month of December will be created; as well as, an A/P form for
          December 1st - December 31st.
        </ListItem>
        <WarningText>
          Be advised that these services are automated and expect the schedule
          to be completed by the Schedule&#39;s Creation Day and Creation Time
          of each month -- missing this deadline may result in
          missing/incomplete schedules being emailed. Also, this service only
          supports creating Sharks home games. Barracuda home games will need to
          be manually created before this monthly Schedule deadline.
        </WarningText>
      </List>
    </Accordion>
  </>
);

export default AutomatedServices;
