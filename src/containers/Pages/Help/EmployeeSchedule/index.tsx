import * as React from "react";
import Accordion from "~components/Layout/Accordion";
import Center from "~components/Layout/Center";
import Line from "~components/Layout/Line";
import Paragraph from "~components/Layout/Paragraph";
import Title from "~components/Layout/Title";
import OutsideLink from "~components/Navigation/OutsideLink";
import { FaCalendarCheck, FaClock } from "~icons";

const EmployeeSchedule = ({ id }: { id: string }): JSX.Element => (
  <>
    <Center>
      <Title margin="50px 0 0px 0">Scheduling Questions</Title>
      <Paragraph>
        Find answers to questions about all things involving scheduling.
      </Paragraph>
      <Line />
    </Center>
    <Accordion expanded={id} title="How do I view my monthly schedule?">
      To view your month to month schedule, go to the
      <OutsideLink dataTestId="schedule-link" href="/employee/schedule">
        Schedule
      </OutsideLink>
      and change the selected <strong>All Events</strong> option to the
      <strong>&nbsp;My Events</strong> option -- you can also select a&nbsp;
      <strong>Month</strong> and a <strong>Year</strong> to filter the calendar.
      If you&#39;ve been scheduled to work a game within the selected month and
      year, then you&#39;ll see a button with a scheduled (
      <FaCalendarCheck style={{ position: "relative", top: 2 }} />) icon. Click
      on the button to view its details. Underneath one of the
      <strong>Scheduled:</strong> call times(
      <FaClock style={{ position: "relative", top: 2 }} />
      ), you&#39;ll see your name highlighted
      <strong
        style={{
          backgroundColor: "#006d75",
          color: "#fff",
          padding: "5px",
          marginRight: "5px"
        }}
      >
        <FaCalendarCheck
          style={{ position: "relative", top: 2, marginRight: 5 }}
        />
        <span>Jane Doe</span>
      </strong>
      to delineate which call time you&#39;ve been assigned to.
      <br />
      <br />
      You can also view your next scheduled game (within 7 days of the current
      date) that you have been assigned to by going to the
      <OutsideLink dataTestId="dashboard-link" href="/employee/dashboard">
        Dashboard
      </OutsideLink>
      page and, underneath the <strong>Events</strong> panel, change the
      <strong>Today</strong> tab to the <strong>Upcoming</strong> tab.
    </Accordion>
    <Accordion expanded={id} title="How is scheduling determined?">
      Scheduling is determined by your month to month availability. Ideally,
      when you submit your A/P form, your monthly availability should be 75% or
      higher. To view your monthly availability, see
      <OutsideLink
        dataTestId="dashboard-link"
        href="/employee/help#how-do-i-view-my-monthly-availability"
      >
        How do I view my monthly availability?
      </OutsideLink>
    </Accordion>
  </>
);

export default EmployeeSchedule;
