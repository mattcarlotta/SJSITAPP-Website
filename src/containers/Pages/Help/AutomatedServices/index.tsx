import * as React from "react";
import Accordion from "~components/Layout/Accordion";
import Center from "~components/Layout/Center";
import Line from "~components/Layout/Line";
import List from "~components/Layout/List";
import ListItem from "~components/Layout/ListItem";
import Paragraph from "~components/Layout/Paragraph";
import Title from "~components/Layout/Title";
import WarningText from "~components/Layout/WarningText";
import OutsideLink from "~components/Navigation/OutsideLink";

const AutomatedServices = ({ id }: { id: string }): JSX.Element => (
  <>
    <Center>
      <Title style={{ marginTop: 50 }}>Automated Services</Title>
      <Paragraph>
        Overview about how the automated services work for you.
      </Paragraph>
      <Line />
    </Center>
    <Accordion expanded={id} title="How do the automatic services work?">
      The three services that have been automated are:&nbsp;
      <strong>creating Sharks home games</strong>,&nbsp;
      <strong>creating monthly A/P forms</strong>, and&nbsp;
      <strong>sending monthly schedules</strong>. Unfortunately, Barracuda home
      games do not have a consumable API (access program interface) available to
      the public, so they&#39;ll need to be manually created before the A/P form
      is sent out.
      <br />
      <br />
      These services are configurable by going to the
      <OutsideLink data-testid="services-link" href="/employee/services">
        Services
      </OutsideLink>
      page.
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
          - On October <strong>5th</strong>, an A/P form reminder for November
          1st - November 29th will be emailed to all active members.
        </ListItem>
        <ListItem padding="20px 0 0 5px">
          - On October <strong>7th</strong>, the November A/P form will expire
          and availability responses will no longer be accepted.
        </ListItem>
        <ListItem padding="20px 0 0 5px">
          - On October <strong>15th @ 6:00pm</strong>, schedules for the month
          of November will be sent out to all active members.
        </ListItem>
        <ListItem padding="20px 0 0 5px">
          - On October <strong>15th @ 7:00pm</strong>, a master schedule for the
          month of November will be sent out to all active staff members.
        </ListItem>
        <ListItem padding="20px 0 0 5px">
          - On October <strong>16th</strong>, Sharks home games for the month of
          December will be created; as well as, an A/P form for December 1st -
          December 31st.
        </ListItem>
        <WarningText>
          Be advised that these services are automated and expect the schedule
          to completed by the 15th of each month -- missing this deadline may
          result in missing/incomplete schedules being emailed. And, currently
          this service only supports creating Sharks home games -- Barracuda
          home games will need to be manually created before the 15th deadline
          of each month.
        </WarningText>
      </List>
    </Accordion>
  </>
);

export default AutomatedServices;
