import Bold from "~components/Layout/Bold";
import List from "~components/Layout/List";
import ListItem from "~components/Layout/ListItem";
import Status from "~components/Layout/Status";
import { ReactElement } from "~types";

export type TShowSettingsProps = {
  automatedOnline?: boolean;
  emailOnline?: boolean;
  eventOnline?: boolean;
  eventDay?: string;
  eventTime?: string;
  formReminderOnline?: boolean;
  formReminderDay?: string;
  formReminderTime?: string;
  scheduleOnline?: boolean;
  scheduleDay?: string;
  scheduleTime?: string;
};

const ShowSettings = ({
  automatedOnline,
  emailOnline,
  eventOnline,
  eventDay,
  eventTime,
  formReminderOnline,
  formReminderDay,
  formReminderTime,
  scheduleOnline,
  scheduleDay,
  scheduleTime
}: TShowSettingsProps): ReactElement => (
  <List
    margin="0 auto 20px auto"
    background="#ebebeb"
    borderRadius="5px"
    style={{ maxWidth: 500, border: "1px solid #888" }}
  >
    <ListItem padding="10px 20px">
      <Bold>Emailing Service - Status</Bold>
      <Status status={emailOnline} />
      <div>This service sends out emails the 30 seconds.</div>
    </ListItem>
    <ListItem padding="10px 20px">
      <Bold>Automated Service - Status</Bold>
      <Status status={automatedOnline} />
      <div>
        This service acts like a master switch override to either activate or
        deactivate all of the automated services below.
      </div>
    </ListItem>
    <ListItem padding="10px 20px">
      <Bold>A/P Form - Email Reminder Status (automated)</Bold>
      <Status status={formReminderOnline} />
      <div>
        This automated service generates email reminders for A/P forms that are
        about to expire.&nbsp;
        <strong>
          Runs the {formReminderDay} of every month @ {formReminderTime}
        </strong>
        .
      </div>
    </ListItem>
    <ListItem padding="10px 20px">
      <Bold>Event & A/P Form - Creation Status (automated)</Bold>
      <Status status={eventOnline} />
      <div>
        This automated service creates Sharks events and an A/P form for the
        upcoming month.&nbsp;
        <strong>
          Runs the {eventDay} of every month @ {eventTime}
        </strong>
        .
      </div>
    </ListItem>
    <ListItem padding="10px 20px">
      <Bold>Schedule - Creation Status (automated)</Bold>
      <Status status={scheduleOnline} />
      <div>
        This automated service generates a master schedule for staff and
        individual schedules for all active members.&nbsp;
        <strong>
          Runs the {scheduleDay} of every month @ {scheduleTime}
        </strong>
        .
      </div>
    </ListItem>
  </List>
);

export default ShowSettings;
