import * as React from "react";
import Accordion from "~components/Layout/Accordion";
import Center from "~components/Layout/Center";
import Line from "~components/Layout/Line";
import Paragraph from "~components/Layout/Paragraph";
import Title from "~components/Layout/Title";
import WarningText from "~components/Layout/WarningText";
import OutsideLink from "~components/Navigation/OutsideLink";
import { ReactElement } from "~types";

const EmployeeScheduling = ({ id }: { id: string }): ReactElement => (
  <>
    <Center>
      <Title margin="50px 0 0px 0">Employee Scheduling</Title>
      <Paragraph>
        Find answers to questions about all things involving scheduling
        employees for events.
      </Paragraph>
      <Line />
    </Center>
    <Accordion expanded={id} title="How do I create monthly schedules?">
      If there are scheduled events for a particular month, then monthly
      schedules will automatically be generated and sent out on the&nbsp;
      <strong>15th of each prior month</strong>. For example, events that have
      been scheduled for the month of December, will be sent out on November
      15th. Any events that do not have at least one member assigned to them,
      will not be included in the schedule.
      <WarningText>
        Be advised that this service is automated and expects the schedule to
        completed by the 15th of each month. Missing this deadline may result in
        missing/incomplete schedules being emailed.
      </WarningText>
      See
      <OutsideLink
        dataTestId="automated-services-link"
        href="/employee/help#how-do-the-automatic-services-work"
      >
        Automated Services
      </OutsideLink>
      for additional information about how the services work and how to change
      their settings.
    </Accordion>
    <Accordion expanded={id} title="How do I view the monthly schedule?">
      To view the schedule, go to the
      <OutsideLink dataTestId="schedule-link" href="/employee/schedule">
        Schedule
      </OutsideLink>
      page. By default, this will display the current month and years schedule;
      however, you can change the calendar dates to update the schedule
      according to the <strong>Month</strong> and <strong>Year</strong> that has
      been selected.
    </Accordion>
    <Accordion expanded={id} title="How do I view a member's monthly schedule?">
      See
      <OutsideLink
        dataTestId="dashboard-link"
        href="/employee/help#how-do-i-view-a-members-profile-availability-responses-or-schedule"
      >
        How do I view a member&#39;s profile, availability, responses or
        schedule?
      </OutsideLink>
    </Accordion>
  </>
);

export default EmployeeScheduling;
