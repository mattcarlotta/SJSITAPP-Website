import Bold from "~components/Layout/Bold";
import Button from "~components/Layout/Button";
import Highlight from "~components/Layout/Highlight";
import List from "~components/Layout/List";
import ListItem from "~components/Layout/ListItem";
import Status from "~components/Layout/Status";
import { AiFillAlert } from "~icons";
import { ReactElement } from "~types";

export type TCurrentSettingsProps = {
  automatedOnline?: boolean;
  emailOnline?: boolean;
  eventOnline?: boolean;
  eventDay?: string;
  eventMonth?: string;
  eventTime?: string;
  formReminderOnline?: boolean;
  formReminderDay?: string;
  formReminderMonth?: string;
  formReminderTime?: string;
  scheduleOnline?: boolean;
  scheduleDay?: string;
  scheduleMonth?: string;
  scheduleTime?: string;
  toggleForm: () => void;
};

const CurrentSettings = ({
  automatedOnline,
  emailOnline,
  eventOnline,
  eventDay,
  eventMonth,
  eventTime,
  formReminderOnline,
  formReminderDay,
  formReminderMonth,
  formReminderTime,
  scheduleOnline,
  scheduleDay,
  scheduleMonth,
  scheduleTime,
  toggleForm
}: TCurrentSettingsProps): ReactElement => (
  <List
    data-testid="current-settings"
    margin="0 auto 30px auto"
    background="#ebebeb"
    borderRadius="5px"
    style={{ maxWidth: 500, border: "1px solid #888" }}
  >
    {typeof automatedOnline === "undefined" && (
      <ListItem
        background="red"
        color="#fff"
        data-testid="no-services-message"
        padding="10px 20px"
      >
        <AiFillAlert
          style={{ fontSize: 20, position: "relative", top: 3, marginRight: 5 }}
        />
        It appears that services haven&#39;t been set up yet. Please edit and
        save the settings to initalize the services.
      </ListItem>
    )}
    <ListItem padding="10px 20px">
      <Bold>Emailing Service</Bold>
      <Status status={emailOnline} />
      <div>
        This service polls a database every 30 seconds for emails and sends them
        out.
      </div>
    </ListItem>
    <ListItem padding="10px 20px">
      <Bold>Automated Service</Bold>
      <Status status={automatedOnline} />
      <div>
        This is a master switch to override all of the automated services listed
        below. If the switch is turned off, then all of automated services are
        deactivated regardless of their current status.
      </div>
    </ListItem>
    <ListItem
      background="#d4d4d4"
      padding="10px 0"
      margin="0"
      textAlign="center"
      style={{
        borderTop: "1px solid #888",
        borderBottom: "1px solid #888"
      }}
    >
      All services below update their next run&nbsp;
      <Bold>
        <Highlight>month</Highlight>
      </Bold>
      automatically.
    </ListItem>
    <ListItem padding="10px 20px">
      <Bold>A/P Form - Email Reminder (automated)</Bold>
      <Status status={formReminderOnline} />
      <div>
        <strong>
          Service&#39;s next run will be in&nbsp;
          <Highlight>{formReminderMonth || "(not set)"}</Highlight>
        </strong>
      </div>
      <div>
        <strong>
          Runs the <Highlight>{formReminderDay || "(not set)"}</Highlight> of
          every month @&nbsp;
          <Highlight>{formReminderTime || "(not set)"}</Highlight>
        </strong>
      </div>
      <div>
        This automated service generates email reminders for A/P forms that are
        about to expire.
      </div>
    </ListItem>
    <ListItem padding="10px 20px">
      <Bold>Event & A/P Form - Creation (automated)</Bold>
      <Status status={eventOnline} />
      <div>
        <strong>
          Service&#39;s next run will be in&nbsp;
          <Highlight>{eventMonth || "(not set)"}</Highlight>
        </strong>
      </div>
      <div>
        <strong>
          Runs the <Highlight>{eventDay || "(not set)"}</Highlight> of every
          month @&nbsp;
          <Highlight>{eventTime || "(not set)"}</Highlight>
        </strong>
      </div>
      <div>
        This automated service creates Sharks events and an A/P form for the
        upcoming month.
      </div>
    </ListItem>
    <ListItem padding="10px 20px">
      <Bold>Schedule - Creation (automated)</Bold>
      <Status status={scheduleOnline} />
      <div>
        <strong>
          Service&#39;s next run will be in&nbsp;
          <Highlight>{scheduleMonth || "(not set)"}</Highlight>
        </strong>
      </div>
      <div>
        <strong>
          Runs the <Highlight>{scheduleDay || "(not set)"}</Highlight> of every
          month @&nbsp;
          <Highlight>{scheduleTime || "(not set)"}</Highlight>
        </strong>
      </div>
      <div>
        This automated service generates a master schedule for staff and
        individual schedules for all active members.
      </div>
    </ListItem>
    <ListItem padding="10px 20px">
      <Button
        dataTestId="edit-settings-button"
        primary
        padding="9px 18px"
        maxWidth="500px"
        type="button"
        onClick={toggleForm}
      >
        Edit Settings
      </Button>
    </ListItem>
  </List>
);

export default CurrentSettings;
